AFRAME.registerComponent('emit-when-near', {
  schema: {
    target: {type: 'selector', default: '[camera]'},
    distance: {type: 'number', default: 1},
    event: {type: 'string', default: 'click'},
    eventFar: {type: 'string', default: 'unclick'},
    poiId: {type: 'string', default: ''},
    throttle: {type: 'number', default: 64},
    atSameHeight: {type: 'boolean', default: true},
  },

  init: function () {
    this.tick = AFRAME.utils.throttleTick(this.checkDist, this.data.throttle, this);
    this.emiting = false;
  },

  checkDist: function () {
    let myPos = new THREE.Vector3(0, 0, 0);
    let targetPos = new THREE.Vector3(0, 0, 0);
    this.el.object3D.getWorldPosition(myPos);
    this.data.target.object3D.getWorldPosition(targetPos);
    if (this.data.atSameHeight) myPos.y = targetPos.y;

    const distanceTo = myPos.distanceTo(targetPos);
    if (distanceTo <= this.data.distance) {
      if (this.emiting) return;
      this.emiting = true;
      this.el.emit(this.data.event, {collidingEntity: this.data.target}, false);
      this.data.target.emit(this.data.event, {collidingEntity: this.el}, false);
      // emit to window for global events
      window.dispatchEvent(new CustomEvent(this.data.event, {detail: {poiId: this.data.poiId}}));
    } else {
      if (!this.emiting) return;
      this.el.emit(this.data.eventFar, {collidingEntity: this.data.target}, false);
      this.data.target.emit(this.data.eventFar, {collidingEntity: this.el}, false);
      window.dispatchEvent(new CustomEvent(this.data.eventFar, {detail: {poiId: this.data.poiId}}));
      this.emiting = false;
    }
  }
});