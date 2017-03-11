//heavySprite.js

class HeavySprite extends Sprite {

  constructor(config = {}){
    for(let key in HeavySprite.defaults){
      if(config[key] == null){
        config[key] = HeavySprite.defaults[key];
      }//end if
    }//end for
    super(config);

    Object.defineProperties(this, {
      ddx: {
        enumerable: true,
        get: function(){
          return config.ddx;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            config.ddx = value;
          }//end if
        }//end set
      },//end ddx
      ddy: {
        enumerable: true,
        get: function(){
          return config.ddy;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            config.ddy = value;
          }//end if
        }//end set
      },//end ddy
      mass: {
        enumerable: true,
        get: function(){
          return config.mass;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            if(value > 0){
              config.mass = value;
            }//end if
          }//end if
        }//end set
      },
      acc: {
        enumerable: true,
        get: function(){
          let mag = Math.sqrt(sq(this.ddx) + sq(this.ddy));
          let angle = Math.atan2(this.ddy, this.ddx);
          return new Vector(mag, angle);
        },//end get
        set: function(value){
          if(value instanceof Vector){
            this.ddx = value.xComp;
            this.ddy = value.yComp;
          }//end if
        }//end set
      },//end acc
      p: {
        enumerable: true,
        get: function(){
          let vel = this.vel;
          return new Vector(this.mass * vel.mag, vel.angle);
        },//end get
        set: function(value){
          if(value instanceof Vector){
            this.vel = new Vector(value.mag / this.mass, value.angle);
          }//end if
        }//end set
      }//end p
    });//end defineProperties
  }//end constructor

  applyForce(frc){
    if(!(frc instanceof Vector)){
      throw TypeError("argument 'frc' must be an instance of the Vector class");
    }//end if
    this.acc = new Vector(frc.mag / this.mass, frc.angle);
  }//end applyForce

  update(){
    super.update();
    this.dx += this.ddx / Crank.frameRate;
    this.dy += this.ddy / Crank.frameRate;
  }//end update

}//end class HeavySprite

Object.defineProperties(HeavySprite, {
  defaults: {
    enumerable: true,
    value: {
      ddx: 0,
      ddy: 0,
      mass: 1
    }//end value
  }//end defaults
});//end defineProperties
