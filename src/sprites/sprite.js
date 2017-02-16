//sprite.js

class Sprite extends Emitter {

  constructor(config = {}){
    super(config.maxListeners);

    let pts = null;
    let edge = null;
    let img = new Image();

    for(let key in Sprite.defaults){
      if(config[key] == null){
        config[key] = Sprite.defaults[key];
      }//end if
    }//end for

    Object.defineProperties(this, {
      x: {
        enumerable: true,
        get: function(){
          return config.x;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            config.x = value;
          }//end if
        }//end set
      },//end x
      dx: {
        enumerable: true,
        get: function(){
          return config.dx;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            config.dx = value;
          }//end if
        }//end set
      },//end dx
      y: {
        enumerable: true,
        get: function(){
          return config.y;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            config.y = value;
          }//end if
        }//end set
      },//end y
      dy: {
        enumerable: true,
        get: function(){
          return config.dy;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            config.dy = value;
          }//end if
        }//end set
      },//end dy
      z: {
        enumerable: true,
        get: function(){
          return config.z;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            if(config.z !== value){
              Sprite.zLevels.get(config.z).delete(this);

              if(!Sprite.zLevels.has(value)){
                Sprite.zLevels.set(value, new Set());
              }//end if

              Sprite.zLevels.get(value).add(this);
              config.z = value;
            }//end if
          }//end if
        }//end set
      },//end z
      angle: {
        enumerable: true,
        get: function(){
          return config.angle;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            if(edge instanceof Polygon){
              for(let pt of pts){
                pt.a += value - config.angle;
              }//end for
            }//end if

            config.angle = value;
          }//end if
        }//end set
      },//end angle
      left: {
        enumerable: true,
        get: function(){
          if(edge instanceof Circle){
            return edge.a - edge.r;
          } else if(edge instanceof Polygon){
            return edge.domain[0];
          }//end if/else if
        },//end get
        set: function(value){
          this.x += value - this.left
        }//end set
      },//end left
      right: {
        enumerable: true,
        get: function(){
          if(edge instanceof Circle){
            return edge.a + edge.r;
          } else if(edge instanceof Polygon){
            return edge.domain[1];
          }//end if/else if
        },//end get
        set: function(value){
          this.x += value - this.right;
        }//end set
      },//end right
      top: {
        enumerable: true,
        get: function(){
          if(edge instanceof Circle){
            return edge.b + edge.r;
          } else if(edge instanceof Polygon){
            return edge.range[1];
          }//end if/else if
        },//end get
        set: function(value){
          this.y += value - this.top;
        }//end set
      },//end top
      bottom: {
        enumerable: true,
        get: function(){
          if(edge instanceof Circle){
            return edge.b - edge.r;
          } else if(edge instanceof Polygon){
            return edge.range[0];
          }//end if/else if
        },//end get
        set: function(value){
          this.y += value - this.bottom;
        }//end set
      },//end bottom
      scale: {
        enumerable: true,
        get: function(){
          return config.scale;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            if(value > 0){
              if(edge instanceof Circle){
                edge.r *= value / config.scale;
              } else if(edge instanceof Polygon){
                for(let pt of pts){
                  pt.r *= value / config.scale;
                }//end for
              }//end if/else if
            }//end if

            config.scale = value;
          }//end if
        }//end set
      },//end scale
      edge: {
        enumerable: true,
        get: function(){
          return edge;
        }//end get
      },//end edge
      img: {
        enumerable: true,
        get: function(){
          return img;
        }//end get
      },//end img
      visible: {
        enumerable: true,
        get: function(){
          return config.visible;
        },//end get
        set: function(value){
          config.visible = !!value;
        }//end set
      }//end visible
    });//end defineProperties

    img.src = config.imgSrc;
    img.width = config.imgWidth;
    img.height = config.imgHeight;

    if(config.r != null){
      edge = new Circle(config.r, this);
    } else if(config.pts != null){
      pts = config.pts.map((pt) => new Point(pt.x, pt.y, this));
      edge = new Polygon(...pts);
    } else {
      let a = Math.atan2(config.imgHeight / 2, config.imgWidth / 2);
      let m = Math.sqrt(sq(config.imgHeight / 2, config.imgWidth / 2));

      pts = [
        new Point(m * Math.cos(config.angle + a), m * Math.sin(config.angle + a), this),
        new Point(m * Math.cos(config.angle - a), m * Math.sin(config.angle - a), this),
        new Point(m * Math.cos(config.angle + Math.PI + a), m * Math.sin(config.angle + Math.PI + a), this),
        new Point(m * Math.cos(config.angle + Math.PI - a), m * Math.sin(config.angle + Math.IP - a), this)
      ];//end pts
      edge = new Polygon(...pts);
    }//end if/else if/else

    if(config.group != null){
      if(!Sprite.groups.has(config.group)){
        Sprite.groups.set(config.group, new Set());
      }//end if
      Sprite.groups.get(config.group).set(this);
    }//end if
    if(config.groups != null){
      for(let group in config.groups){
        if(!Sprite.groups.has(group)){
          Sprite.groups.set(group, new Set());
        }//end if
        Sprtie.groups.get(group).set(this);
      }//end for
    }//end if

    if(!Sprite.zLevels.has(config.z)){
      Sprite.zLevels.set(config.z, new Set());
    }//end if
    Sprite.zLevels.get(config.z).add(this);

    Object.seal(config);
    Sprite.all.add(this);
  }//end constructor

  distanceTo(other){
    if(other instanceof Sprite){
      return dist(this.edge.center, other.edge.center);
    } else if(other instanceof Point){
      return dist(this.edge.center, other);
    }//end if/else if

    return NaN;
  }//end distanceTo

  angleTo(other){
    if(other instanceof Sprite){
      let tCenter = this.edge.center;
      let oCenter = other.edge.center;
      return Math.atan2(oCenter.y - tCenter.y, oCenter.x - tCenter.x)
    } else if(other instanceof Point){
      let tCenter = this.edge.center;
      return Math.atan2(other.y - tCenter.y, other.x - tCenter.x);
    }//end if/else if

    return NaN;
  }//end angleTo

  collidesWith(other){
    if(this.visible){
      if(other instanceof Sprite){
        if(other.visible){
          return this.edge.collidesWith(other.edge);
        }//end if
      } else if(other instanceof Point){
        return this.edge.has(other);
      } else {
        return this.edge.collidesWith(other);
      }//end if/else if/else
    }//end if

    return false;
  }//end collidesWith

  draw(){
    if(this.visible){
      let ctx = Crank.ctx;

      this.emit('draw-under', ctx);

      ctx.save();
      ctx.translate(this.x, -this.y);
      ctx.rotate(-this.angle);
      ctx.scale(this.scale, this.scale);
      ctx.drawImage(
        this.img,
        -this.img.width / 2,
        -this.img.height / 2,
        this.img.width,
        this.img.height
      );//end drawImage
      ctx.restore();

      this.emit('draw-over', ctx);
    }//end if
  }//end draw

  update(){
    this.emit('update');
    this.x += this.dx / Crank.frameRate;
    this.y += this.dy / Crank.frameRate;

    if(this.right < Crank.left){
      this.emit('off-screen', 'left');
    } else if(this.left <= Crank.left){
      this.emit('hit-boundary', 'left');
    }//end if/else if

    if(this.left > Crank.right){
      this.emit('off-screen', 'right');
    } else if(this.right >= Crank.right){
      this.emit('hit-boundary', 'right');
    }//end if/else if

    if(this.bottom > Crank.top){
      this.emit('off-screen', 'top');
    } else if(this.top >= Crank.top){
      this.emit('hit-boundary', 'top');
    }//end if/else if

    if(this.top < Crank.bottom){
      this.emit('off-screen', 'bottom');
    } else if(this.bottom <= Crank.bottom){
      this.emit('hit-boundary', 'bottom');
    }//end if/else if
  }//end update

}//end class Sprite

Object.defineProperties(Sprite, {
  defaults: {
    enumerable: true,
    value: {
      x: 0,
      dx: 0,
      y: 0,
      dy: 0,
      z: 0,
      angle: 0,
      scale: 1,
      imgSrc: '',
      imgWidth: 64,
      imgHeight: 64,
      visible: true,
      maxListeners: 10
    }//end value
  },//end defaults
  all: {
    enumerable: true,
    value: new Set()
  },//end all
  groups: {
    enumerable: true,
    value: new Map()
  },//end groups
  zLevels: {
    enumerable: true,
    value: new Map()
  },//end zLevels
  delete: {
    enumerable: true,
    value: function(sprite){
      Sprite.all.delete(sprite);
      Sprite.zLevels.get(sprite.z).delete(sprite);
      Sprite.groups.forEach(group => {
        if(group.has(sprite)){
          group.delete(sprite);
        }//end if
      });//end forEach
    }//end value
  },//end delete
  clear: {
    enumerable: true,
    value: function(){
      Sprite.all.clear();
      Sprite.groups.clear();
      Sprite.zLevels.clear();
    }//end value
  },//end clear
  DIE: {
    enumerable: true,
    value: function(){
      this.visible = false;
    }//end value
  },//end DIE
  WRAP: {
    enumerable: true,
    value: function(side){
      if(side === 'left'){
        this.left = Crank.right;
      } else if(side === 'right'){
        this.right = Crank.left;
      } else if(side === 'top'){
        this.top = Crank.bottom;
      } else if(side === 'bottom'){
        this.bottom = Crank.top;
      } //end if/else if
    }//end value
  },//end WRAP
  STOP: {
    enumerable: true,
    value: function(side){
      if(side === 'left'){
        this.left = Crank.left + 1;
      } else if(side === 'right'){
        this.right = Crank.right - 1;
      } else if(side === 'top'){
        this.top = Crank.top - 1;
      } else if(side === 'bottom'){
        this.bottom = Crank.bottom + 1;
      }//end if/else if
    }//end value
  },//end STOP
  BOUNCE: {
    enumerable: true,
    value: function(side){
      if(side === 'left'){
        this.left = Crank.left + 1;
        this.dx *= -1;
      } else if(side === 'right'){
        this.right = Crank.right - 1;
        this.dx *= -1;
      } else if(side === 'top'){
        this.top = Crank.top - 1;
        this.dy *= -1;
      } else if(side === 'bottom'){
        this.bottom = Crank.bottom + 1;
        this.dy *= -1;
      }//end if/else if
    }//end value
  }//end BOUNCE
});//end defineProperties

Crank.on('update', function(){
  for(let key of Array.from(Sprite.zLevels.keys()).sort()){
    Sprite.zLevels.get(key).forEach(sprite => sprite.draw());
  }//end for
  Sprite.all.forEach(sprite => sprite.update());
});//end on('update')
