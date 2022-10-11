AFRAME.registerComponent('poi-animator', {
    schema: {
      amplitude: {type: 'number', default: 1},
      scale: {type: 'boolean', default: false},
      scaleAll: {type: 'boolean', default: false},
    },
  
    init: function () {
      this.initialPosition = this.el.object3D.position.y;
      this.initialScale = {...this.el.object3D.scale};
    },
  
    update: function () {
      if (this.data.amplitude == 0) {
        if (this.data.scale) {
          this.el.object3D.scale.x = this.initialScale.x;
          this.el.object3D.scale.y = this.initialScale.y;
          this.el.object3D.scale.z = this.initialScale.z;
        } else {
          this.el.object3D.position.y = this.initialPosition;
        }
      }
    },
  
    tick(t, dt) {
      if (this.data.amplitude == 0) return;
      if (this.data.scale) {
        const offest = Math.sin(t / 1000) * this.data.amplitude;
        this.el.object3D.scale.x = this.initialScale.x + offest;
        this.el.object3D.scale.z = this.initialScale.z + offest;
        if (this.data.scaleAll) {
          this.el.object3D.scale.y = this.initialScale.y + offest;
        }
      } else {
        const offest = Math.abs(Math.sin(t / 1000)) * 5 * this.data.amplitude;
        this.el.object3D.position.y = this.initialPosition + offest;
      }
    },
  
  });