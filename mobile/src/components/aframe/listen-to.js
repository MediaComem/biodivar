AFRAME.registerComponent('listen-to', {
  multiple: true,
  schema: {
    target: {type: 'selector'},
    event: {type: 'string', default: 'click'},
    emit: {type: 'string', default: 'click'}
  },
  init: function () {
    this.addEvent();
  },
  addEvent: function () {
    const event = this.data.event;
    const target = this.data.target;
    this.handler = evt => this.onEvent(evt);
    target.addEventListener(event, this.handler);
  },
  onEvent: function () {
    this.el.emit(this.data.emit);
  },
  update: function (oldData) {
    // We doesn't need the update phase during the initialisation phase
    if (Object.entries(oldData).length === 0) return;
    if (oldData.target != this.data.target || oldData.event != this.data.event) {
      this.remove(oldData.target, oldData.event);
      this.addEvent();
    }
  },
  remove: function (target, event) {
    const currEvent = event || this.data.event;
    const currTarget = target || this.data.target;
    currTarget.removeEventListener(currEvent, this.handler);
  }
});