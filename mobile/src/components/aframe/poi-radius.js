AFRAME.registerComponent('poi-radius', {
  schema: {
    radius: {type: 'number', default: 3},
    throttle: {type: 'number', default: 500},
    shape: {type: 'string', default: 'circle'},
    fill: {type: 'boolean', default: true},
    color: {type: 'color', default: '#FFA790'},
    segments: {type: 'number', default: 64},
    visible: {type: 'boolean', default: true},
    groundElevation: {type: 'number', default: 0},
    // stroke ??
    // elevation
    // bruit
  },

  init: function () {
    const allowedShape = ['circle', 'sphere'];
    if (!allowedShape.includes(this.data.shape)) this.data.shape = allowedShape[0];

    this.targetWorldPos = new THREE.Vector3();
    this.myWorldPos = new THREE.Vector3();

    this.genMesh();
  },

  genMesh: function () {
    this.color = new THREE.Color(this.data.color);
    if (this.data.shape === 'circle' && this.data.fill) this.genCircle();
    if (this.data.shape === 'circle' && !this.data.fill) this.genRing();
    if (this.data.shape === 'sphere') this.genSphere();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    this.mesh.position.set(0, this.data.groundElevation, 0);
    this.mesh.visible = this.data.visible;

    this.el.setObject3D('poi-radius', this.mesh);
  },

  genSphere: function () {
    this.geometry = new THREE.SphereGeometry(this.data.radius, this.data.segments, this.data.segments, 0, Math.PI);
    this.material = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: this.data.fill ? 1 : 0.5,
    });
  },

  genCircle: function () {
    this.geometry = new THREE.CircleGeometry(this.data.radius, this.data.segments);
    this.material = new THREE.MeshBasicMaterial({color:  this.color});
  },

  genRing: function () {
    this.geometry = new THREE.RingGeometry(this.data.radius - 0.1, this.data.radius, this.data.segments);
    this.material = new THREE.MeshBasicMaterial({color:  this.color});
  },

});