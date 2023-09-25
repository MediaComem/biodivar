AFRAME.registerComponent('distance-to-volume', {
  schema: {
    target: {type: 'selector', default: '[camera]'},
    volume: {type: 'number', default: 1},
    distance: {type: 'number', default: 1},
  },

  init: function () {
    this.myPos = new THREE.Vector3(0, 0, 0);
    this.targetPos = new THREE.Vector3(0, 0, 0);
    this.distanceTo = 0;
    this.distVolume = 0;
  },

  tick: function () {
    this.el.object3D.getWorldPosition(this.myPos);
    this.data.target.object3D.getWorldPosition(this.targetPos);
    this.distanceTo = this.myPos.distanceTo(this.targetPos);
    this.distVolume = Math.max(0, this.data.volume * (1 - this.distanceTo / this.data.distance));
    this.el.setAttribute('sound', 'volume', this.distVolume);
  }

});