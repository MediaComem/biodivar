AFRAME.registerComponent('ring', {
    schema: {
      radius: {type: 'number', default: 50},
      color: {type: 'color', default: '#FFA790'},
      segments: {type: 'number', default: 128},
      visible: {type: 'boolean', default: true},
      widthFactor: {type: 'number', default: 30},
      opacity: {type: 'number', default: 0.4},
    },
  
    init: function () {
      this.color = new THREE.Color(this.data.color);
      this.geometry = new THREE.RingGeometry(this.data.radius - 1, this.data.radius, this.data.segments);
      this.material = new THREE.MeshBasicMaterial({
        color: this.color,
        transparent: true,
        opacity: this.data.opacity,
      });
  
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
      this.mesh.visible = this.data.visible;
  
      this.el.setObject3D('mesh', this.mesh);
    },
  
    update: function () {
      this.geometry = new THREE.RingGeometry(this.data.radius - this.data.radius/this.data.widthFactor, this.data.radius, this.data.segments);
      this.mesh.visible = this.data.visible;
      this.mesh.geometry = this.geometry;
    },
  
  });