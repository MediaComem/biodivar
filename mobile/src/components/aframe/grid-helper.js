AFRAME.registerComponent('grid-helper', {
  schema: {
    color: {type: 'color', default: '#FFA790'},
    size: {type: 'number', default: 128},
    division: {type: 'number', default: 128},
  },

  init: function () {
    this.color = new THREE.Color(this.data.color);
    this.mesh = new THREE.GridHelper(this.data.size, this.data.division, this.color, this.color);
    this.el.setObject3D('mesh', this.mesh);
  }

});