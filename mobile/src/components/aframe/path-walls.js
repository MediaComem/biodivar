AFRAME.registerComponent('path-walls', {
  schema: {
    elevation: {type: 'number', default: 0},
    color: {type: 'string', default: '#ff0000'},
    opacity: {type: 'number', default: 100},
    width: {type: 'number', default: 0.1},
    extrude: {type: 'number', default: 0.1},
    throttle: {type: 'number', default: 500},
    pathId: {type: 'string', default: ''},
    event: {type: 'string', default: 'path-enter'},
    eventFar: {type: 'string', default: 'path-exit'},
  },

  init: function () {
    this.allNodes = null;
    this.group = new THREE.Group();
    this.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(this.data.color),
      transparent: true,
      opacity: this.data.opacity / 100,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.isWallsVisibles = false;
    this.tick = AFRAME.utils.throttleTick(this.updateWalls, this.data.throttle, this);
  },

  getAllPositions: function () {
    const positions = [];
    for (const node of this.allNodes) {
      positions.push(node.getAttribute('position'));
    }
    return positions;
  },

  isInvisible: function () {
    // If all childs are invisible, the walls ar invisible too
    for (const node of this.allNodes) {
      if (node.getAttribute('visible')) return false;
    }
    return true;
  },

  updateWalls: function () {
    if (!this.allNodes) {
      this.allNodes = this.el.querySelectorAll('a-entity');
    }

    // Recreate the walls
    this.disposeWalls();
    this.group = new THREE.Group();

    // Emit a event when the walls change from invisible to visible and vice versa (cf: emit-when-near.js)
    if (this.isInvisible()) {
      if (this.isWallsVisibles) {
        this.isWallsVisibles = false;
        window.dispatchEvent(new CustomEvent(this.data.eventFar, {detail: {pathId: this.data.pathId}}));
      }
      return;
    }
    if (!this.isWallsVisibles) {
      this.isWallsVisibles = true;
      window.dispatchEvent(new CustomEvent(this.data.event, {detail: {pathId: this.data.pathId}}));
    }

    const positions = this.getAllPositions();
    if (positions.length < 2) throw new Exception('Path must have at least 2 GPS coordinates');

    // Create a wall between each point
    let previous = positions[0];
    for (let i = 1; i < positions.length; i++) {
      const current = positions[i];
      const distance = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.z - previous.z, 2)) + this.data.width / 2;
      const geometry = new THREE.BoxGeometry(this.data.width, this.data.extrude, distance);
      const box = new THREE.Mesh(geometry, this.material);
      box.position.set((current.x + previous.x) / 2, this.data.elevation, (current.z + previous.z) / 2);
      box.lookAt(current.x, this.data.elevation, current.z);
      this.group.add(box);
      previous = current;
    }

    this.el.setObject3D('path-walls', this.group);
  },

  disposeWalls() {
    if (this.el.getObject3D('path-walls')) {
      this.group.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
      });
      this.el.removeObject3D('path-walls');
    }
  },

  remove: function () {
    this.disposeWalls();
    this.material.dispose();
  },

});