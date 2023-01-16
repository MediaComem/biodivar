AFRAME.registerComponent('camera-reset', {
  schema: {
    delay: {type: 'int', default: 250,},
    position: {type: "vec3", default: {x: 0, y: 1.7, z: 5}},
  },

  init: function () {
    setTimeout(() => {
      this.el.sceneEl.camera.position.set(this.data.position.x, this.data.position.y, this.data.position.z);
      this.el.sceneEl.camera.lookAt(0, 1.7, 0);
      this.el.sceneEl.camera.updateProjectionMatrix();
    }, this.data.delay);
  },

});
