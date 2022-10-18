AFRAME.registerComponent('sound-play-stop', {
  schema: {
    eventPlay: {type: 'string', default: 'click'},
    eventStop: {type: 'string', default: 'unclick'},
  },

  init: function () {
    this.eventPlay = this.data.eventPlay;
    this.eventStop = this.data.eventStop;
    this.playSound = this.playSound.bind(this);
    this.el.addEventListener(this.eventPlay, this.playSound);
    this.stopSound = this.stopSound.bind(this);
    this.el.addEventListener(this.eventStop, this.stopSound);
  },

  playSound: function () {
    this.el.components.sound.playSound();
  },

  stopSound: function () {
    this.el.components.sound.stopSound();
  },

  remove: function () {
    this.el.removeEventListener(this.eventPlay, this.playSound);
    this.el.removeEventListener(this.eventStop, this.stopSound);
  },

});
