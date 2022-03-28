AFRAME.registerComponent('look-at-roll-yaw', {
  schema: {
    target: {type: 'selector', default: '[camera]'},
  },
  init: function () {
    this.targetWorldPos = new THREE.Vector3();
    this.myWorldPos = new THREE.Vector3();
  },
  tick: function () {
    if (!this.data.target) return;
    this.data.target.object3D.getWorldPosition(this.targetWorldPos);
    this.el.object3D.getWorldPosition(this.myWorldPos);
    this.targetWorldPos.y = this.myWorldPos.y;
    this.el.object3D.lookAt(this.targetWorldPos);
  }
});
