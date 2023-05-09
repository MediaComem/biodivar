AFRAME.registerComponent('visible-from', {
  schema: {
    target: {type: 'selector', default: '[camera]'},
    distance: {type: 'number', default: 10},
    throttle: {type: 'number', default: 500},
  },
  init: function () {
    this.targetWorldPos = new THREE.Vector3();
    this.myWorldPos = new THREE.Vector3();    
    this.el.setAttribute('visible', false);
    this.tick = AFRAME.utils.throttleTick(this.checkDist, this.data.throttle, this);
  },
  checkDist: function () {
    if (!this.data.target) return;
    this.data.target.object3D.getWorldPosition(this.targetWorldPos);
    this.el.object3D.getWorldPosition(this.myWorldPos);
    const distance = this.myWorldPos.distanceTo(this.targetWorldPos);    
    this.el.setAttribute('visible', distance <= this.data.distance);        
  }
});
