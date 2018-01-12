import Phaser from 'phaser'

class ScrollView extends Phaser.Group {
  constructor(game, x = 0, y = 0, width = 0, height = 0, direction = 'both') {
    super(game)
    this.lastX = 0
    this.lastY = 0
    this.config = {
      x: x,
      y: y,
      width: width,
      height: height,
      direction: direction
    }
    

    this.x = x
    this.y = y


    this.viewMask = game.add.graphics()
    this.viewMask.beginFill(0xffffff)
    this.viewMask.drawRect(this.config.x, this.config.y, this.config.width, this.config.height)
    this.viewMask.inputEnabled = true
    this.mask = this.viewMask

    game.input.onDown.add(function(pointer) {
      if (this.viewMask.getBounds().contains(pointer.x, pointer.y)) {
        game.input.maxPointers = 1
        this.lastX = pointer.x
        this.lastY = pointer.y
        game.input.addMoveCallback(this._move, this)
      }
    }, this)

    game.input.onUp.add(function() {
      game.input.maxPointers = -1
      game.input.deleteMoveCallback(this._move, this)
    }, this)

  }

  _move(pointer, x, y) {
    var canMoveHori = this.config.direction === 'horizontal' || this.config.direction === 'both'
    if (this.width < this.config.width) {
      canMoveHori = false
    }
    if (this.x >= this.config.x && this.lastX < x) {
      canMoveHori = false
    }
    if (
      this.x + this.width <=
        this.config.x + this.config.width &&
      this.lastX > x
    ) {
      canMoveHori = false
    }

    var canMoveVert = this.config.direction === 'vertical' || this.config.direction === 'both'
    if (this.height < this.config.height) {
      canMoveVert = false
    }
    if (this.y >= this.config.y && this.lastY < y) {
      canMoveVert = false
    }
    if (
      this.y + this.height <=
        this.config.y + this.config.height &&
      this.lastY > y
    ) {
      canMoveVert = false
    }

    if (canMoveHori) {
      this.x += x - this.lastX
    }
    if (canMoveVert) {
      this.y += y - this.lastY
    }

    this.lastX = x
    this.lastY = y
  }
}

export default ScrollView