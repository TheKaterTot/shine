const Tree = require('../tree');

class TreeManager {
  constructor() {
    this.trees = [];
  }

  generateTree(x, y, image) {
    let tree = new Tree(x, y, image);
    this.trees.push(tree);
  }

  generateTrees(data) {
    data.forEach((attributes) => {
      this.generateTree(attributes.x, attributes.y, attributes.image_path)
    })
  }
}

module.exports = TreeManager;
