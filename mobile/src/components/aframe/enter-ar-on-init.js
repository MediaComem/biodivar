AFRAME.registerComponent('enter-ar-on-init', {
  schema: {
    delay: {
      type: 'int',
      default: 0,
    },
  },

  init: function () {
    setTimeout(() => {
      try {
        this.el.enterAR();
      } catch {
        console.error('Your browser does not support AR');
      }
    }, this.data.delay);
  }

});
