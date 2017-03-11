//vector.js

class Vector {

  constructor(_mag, _angle){
    if(typeof _mag !== 'number'){
      throw TypeError("magnitude must be a number");
    }//end if
    if(typeof _angle !== 'number'){
      throw TypeError("angle must be a number");
    }//end if

    Object.defineProperties(this, {
      xComp: {
        enumerable: true,
        get: function(){
          return _mag * Math.cos(_angle);
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            let yComp = this.yComp;
            _mag = Math.sqrt(sq(value) + sq(yComp));
            _angle = Math.atan2(yComp, value);
          }//end if
        }//end set
      },//end xComp
      yComp: {
        enumerable: true,
        get: function(){
          return _mag * Math.sin(_angle);
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            let xComp = this.xComp;
            _mag = Math.sqrt(sq(xComp) + sq(value));
            _angle = Math.atan2(value, xComp);
          }//end if
        }//end set
      },//end yComp
      mag: {
        enumerable: true,
        get: function(){
          return _mag;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            _mag = value;
          }//end if
        }//end set
      },//end mag
      angle: {
        enumerable: true,
        get: function(){
          return _angle;
        },//end get
        set: function(value){
          if(value = parseFloat(value)){
            _angle = value;
          }//end if
        }//end set
      }//end angle
    });//end defineProperties
  }//end constructor

  plus(other){
    if(!(other instanceof Vector)){
      throw TypeError("argument 'other' must be an instance of Vector class");
    }//end if

    let xComp = this.xComp + other.xComp;
    let yComp = this.yComp + other.yComp;
    let mag = Math.sqrt(sq(xComp) + sq(yComp));
    let angle = Math.atan2(yComp, xComp);

    return new Vector(mag, angle);
  }//end plus

  minus(other){
    if(!(other instanceof Vector)){
      throw TypeError("argument 'other' must be an instance of Vector class");
    }//end if

    let xComp = this.xComp - other.xComp;
    let yComp = this.yComp - other.yComp;
    let mag = Math.sqrt(sq(xComp) + sq(yComp));
    let angle = Math.atan2(yComp, xComp);

    return new Vector(mag, angle);
  }//end minus

  scale(value){
    if(typeof value !== 'number'){
      throw TypeError("argument 'value' must be a number");
    }//end if

    this.mag *= value;
    if(value < 0){
      this.angle += Math.PI;
    }//end if
  }//end scale

  dot(other){
    if(!(other instanceof Vector)){
      throw TypeError("argument 'other' must be an instance of the Vector class");
    }//end if

    return this.mag * other.mag * Math.cos(this.angle - other.angle);
  }//end dot

}//end class Vector
