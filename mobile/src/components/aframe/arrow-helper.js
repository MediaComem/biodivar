AFRAME.registerComponent("arrow-helper", {
  multiple: true,
  schema: {
    direction: {type: "vec3", default: {x: 1, y: 0, z: 0}},
    length: {type: "number", default: 1},
    color: {type: "color", default: "#FF0000"},
    headLength: {type: "number", default: 0.2},
    headWidth: {type: "number", default: 0.2},
  },
  init: function () {
    const direction = new THREE.Vector3(this.data.direction.x, this.data.direction.y, this.data.direction.z);
    this.arrow = new THREE.ArrowHelper(
      direction.normalize(),
      new THREE.Vector3(),
      this.data.length,
      new THREE.Color(this.data.color),
      this.data.headLength,
      this.data.headWidth
    );
    this.el.setObject3D(`arrow-${this.id}`, this.arrow);
  },
  update: function (oldData) {
    // We doesn't need the update phase during the initialisation phase
    if (Object.entries(oldData).length === 0) return;
    const diff = AFRAME.utils.diff(this.data, oldData);
    if ("color" in diff) {
      this.arrow.setColor(new THREE.Color(this.data.color));
    }
    if ("direction" in diff) {
      const direction = new THREE.Vector3(this.data.direction.x, this.data.direction.y, this.data.direction.z);
      this.arrow.setDirection(direction.normalize());
    }
    if ("length" in diff || "headLength" in diff || "headWidth" in diff) {
      this.arrow.setLength(this.data.length, this.data.headLength, this.data.headWidth);
    }
  }
});