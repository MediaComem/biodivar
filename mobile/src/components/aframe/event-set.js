AFRAME.registerComponent('event-set', {
  multiple: true,

  schema: {
    event: {type: 'string', default: 'click'},
    attribute: {type: 'string'},
    value: {type: 'string'}
  },

  init: function() {
    this.eventName = this.data.event;
    this._onEvent = this._onEvent.bind(this);
    this.el.addEventListener(this.eventName, this._onEvent);
  },

  remove: function() {
    this.el.removeEventListener(this.eventName, this._onEvent);
  },

  _onEvent: function(evt) {
    AFRAME.utils.entity.setComponentProperty(this.el, this.data.attribute, this.data.value);
  }

});