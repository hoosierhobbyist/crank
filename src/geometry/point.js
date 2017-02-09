//point.js

class Point {

  constructor(_x, _y, _ref = {x: 0, y: 0}){
    if(typeof _ref.x !== 'number'){
      throw TypeError("invalid x-value for reference object");
    }//end if
    if(typeof _ref.y !== 'number'){
      throw TypeError("invalid y-value for reference object");
    }//end if

    Object.defineProperties(this, {
      x: {
        enumerable: true,
        get: function(){
          return _ref.x + _x;
        },//end get
        set: function(value){
          value = parseFloat(value);
          _x = value - _ref.x;
        }//end set
      },//end x
      y: {
        enumerable: true,
        get: function(){
          return _ref.y + _y;
        },//end get
        set: function(value){
          value = parseFloat(value);
          _y = value - _ref.y;
        }//end set
      },//end y
      angle: {
        get: function(){
          return Math.atan2(_y, _x);
        },//end get
        set: function(value){
          let radius = this.radius;
          _x = radius * Math.cos(value);
          _y = radius * Math.sin(value);
        }//end set
      },//end angle
      radius: {
        get: function(){
          return Math.sqrt(sq(_x) + sq(_y));
        },//end get
        set: function(value){
          let angle = this.angle;
          _x = value * Math.cos(angle);
          _y = value * Math.sin(angle);
        }
      }//end radius
    });//end defineProperties

  }//end constructor

  draw(ctx){
    ctx.save();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, -this.y, 3 , 0, 2*Math.PI);
    ctx.fill();
    ctx.restore();
  }//end draw

}//end class Point
