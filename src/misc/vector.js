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

}//end class Vector
