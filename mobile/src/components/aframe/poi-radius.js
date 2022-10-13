const allowedShape = ['circle', 'sphere', 'hemisphere'];

AFRAME.registerComponent('poi-radius', {
  schema: {
    radius: {type: 'number', default: 3},
    shape: {type: 'string', default: 'circle'},
    segments: {type: 'number', default: 64},
    visible: {type: 'boolean', default: true},
    groundElevation: {type: 'number', default: 0},
    color: {type: 'string', default: '#ffffff'},
    opacity: {type: 'number', default: 100},
    strokeColor: {type: 'string', default: '#ffffff'},
    strokeWidth: {type: 'number', default: 1},
    strokeOpacity: {type: 'number', default: 100},
    wireframe: {type: 'boolean', default: false},
    extrude: {type: 'number', default: 0},
    // throttle: {type: 'number', default: 500},
  },

  init: function () {
    if (!allowedShape.includes(this.data.shape)) this.data.shape = allowedShape[0];
    // this.targetWorldPos = new THREE.Vector3();
    // this.myWorldPos = new THREE.Vector3();
    this.genMesh();
  },

  update: function () {
    this.el.removeObject3D('poi-radius', this.mesh);
    this.genMesh();
  },

  genMesh: function () {
    this.innerRadius = Math.max(this.data.radius - this.data.strokeWidth, 0);
    this.ringWidth = Math.min(this.data.strokeWidth, this.data.radius);
    this.color = new THREE.Color(this.data.color);
    this.strokeColor = new THREE.Color(this.data.strokeColor);
    this.group = new THREE.Group();

    if (this.data.shape === 'circle') {
      this.genCircle();
      this.genRing();
    } else if (this.data.shape === 'sphere') {
      this.genSphere();
    } else if (this.data.shape === 'hemisphere') {
      this.genHemisphere();
    }

    this.group.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    this.group.position.set(0, this.data.groundElevation, 0);
    this.group.visible = this.data.visible;

    this.el.setObject3D('poi-radius', this.group);
  },

  genSphere: function () {
    if (this.data.opacity == 0) return;
    const geometry = new THREE.SphereGeometry(this.data.radius, this.data.segments, this.data.segments, 0, 2 * Math.PI);
    const material = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: this.data.opacity / 100,
      side: THREE.DoubleSide,
      wireframe: this.data.wireframe,
    });
    this.sphere = new THREE.Mesh(geometry, material);
    this.group.add(this.sphere);
  },

  genHemisphere: function () {
    if (this.data.opacity == 0) return;
    const geometry = new THREE.SphereGeometry(this.data.radius, this.data.segments, this.data.segments, 0, Math.PI);
    const material = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: this.data.opacity / 100,
      side: THREE.DoubleSide,
      wireframe: this.data.wireframe,
    });
    this.hemisphere = new THREE.Mesh(geometry, material);
    this.group.add(this.hemisphere);
  },

  genCircle: function () {
    if (this.data.opacity == 0) return;
    const geometry = this.data.extrude ?
      new THREE.CylinderGeometry(this.innerRadius, this.innerRadius, this.data.extrude, this.data.segments, 1) :
      new THREE.CircleGeometry(this.innerRadius, this.data.segments)
    ;
    const material = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: this.data.opacity / 100,
      side: THREE.DoubleSide,
      wireframe: this.data.wireframe,
    });
    this.circle = new THREE.Mesh(geometry, material);
    if (this.data.extrude) {
      this.circle.position.z = this.data.extrude / 2;
      this.circle.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    }
    this.group.add(this.circle);
  },

  genRing: function () {
    if (this.data.strokeOpacity == 0) return;
    const geometry = this.data.extrude ?
      this.genTubeGeometry() :
      new THREE.RingGeometry(this.data.radius - this.ringWidth, this.data.radius, this.data.segments)
    ;
    const material = new THREE.MeshBasicMaterial({
      color: this.strokeColor,
      transparent: true,
      opacity: this.data.strokeOpacity / 100,
      side: THREE.DoubleSide,
      wireframe: this.data.wireframe,
    });
    this.ring = new THREE.Mesh(geometry, material);
    this.group.add(this.ring);
  },

  genTubeGeometry: function () {
    const extrudeSettings = {
      depth : this.data.extrude,
      steps : 1,
      bevelEnabled: false,
      curveSegments: this.data.segments
    };

    const outterShape = new THREE.Shape();
    outterShape.absarc(0, 0, this.data.radius, 0, Math.PI * 2, 0, false);
    const holeShape = new THREE.Path();
    holeShape.absarc(0, 0, this.innerRadius, 0, Math.PI * 2, true);
    outterShape.holes.push(holeShape);

    return  new THREE.ExtrudeGeometry(outterShape, extrudeSettings);
  },

});