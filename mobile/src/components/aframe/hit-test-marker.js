AFRAME.registerSystem('hit-test-marker', {
  dependencies: ['gps-position'],
  schema: {

  },

  init: function () {
    this.facesNorthEntity = document.querySelector('[faces-north]');

    const success = this.checkDependencies();
    if (!success) return;

    this._onHitTestSelect = this._onHitTestSelect.bind(this);
    this.el.addEventListener('ar-hit-test-select', this._onHitTestSelect);
  },

  remove: function () {
    this.el.removeEventListener('ar-hit-test-select', this._onHitTestSelect);
  },

  checkDependencies: function () {
    let success = true;
    if (!this.facesNorthEntity) {
      console.error('You must set a "faces-north" component on an child <a-entity> of <a-scene> to add a new location based marker');
      success = false;
    }
    if (!this.el.systems['gps-position']) {
      console.error('You must have the "gps-position" system on <a-scene> to add a new location based marker');
      success = false;
    }
    return success;
  },

  _onHitTestSelect: function(evt) {
    // Ask the faces-north entities to get the current bearing (azimuth compass heading)
    const heading = this.facesNorthEntity.components['faces-north'].heading;

    // Ask the gps-position system the actual lat,lng position of the device
    const position = this.el.systems['gps-position'].updatedPosition;

    // Calculate the distance between the camera and the hit-test position
    const hitTestPos = evt.detail.position;
    const cameraPos = this.el.camera.el.object3D.position;
    // Set the same height for both (the altitude is currently not handled by this system and the gps-position one)
    hitTestPos.y = cameraPos.y;
    const distance = hitTestPos.distanceTo(cameraPos);

    // Calculate the lat/lng of the hit test
    const {latitude, longitude} = this._reverseHaversineDist(position, distance, heading);

    // Add a new marker with this lat/lng to the faces-north plane
    const marker = `<a-entity mixin="marker" gps-position="latitude: ${latitude}; longitude: ${longitude}"></a-entity>`;
    this.facesNorthEntity.insertAdjacentHTML('beforeend', marker);

    this.el.exitVR();
  },


  _reverseHaversineDist: function (position, distance, heading) {
    const lon1 = THREE.Math.degToRad(position.longitude);
    const lat1 = THREE.Math.degToRad(position.latitude);
    const angdist = distance / 6371000; // ~ radius of Earth in [m]
    const theta = THREE.Math.degToRad(heading);
    const latitude = THREE.Math.radToDeg(Math.asin( Math.sin(lat1) * Math.cos(angdist) + Math.cos(lat1) * Math.sin(angdist) *  Math.cos(theta)));
    const longitude = THREE.Math.radToDeg(lon1 + Math.atan2(Math.sin(theta) * Math.sin(angdist) * Math.cos(lat1), Math.cos(angdist) - Math.sin(lat1) * Math.sin(latitude)));
    return {latitude, longitude};
  }

});
