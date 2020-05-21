export default class Point {
    
    constructor(_x, _y, ref = {x: 0, y: 0}) {
        
        Object.defineProperties(this, {
            _x: {
                value: _x,
                writable: true
            },//end rel_x
            _y: {
                value: _y,
                writable: true
            },//end rel_y
            x: {
                enumerable: true,
                get: function() {
                    return ref.x + this._x;
                }//end get
            },//end x
            y: {
                enumerable: true,
                get: function() {
                    return ref.y + this._y;
                }//end get
            },//end y
            angle: {
                get: function() {
                    return Math.atan2(this._y, this._x);
                },//end get
                set: function(value) {
                    let r = this.radius;
                    this._x = r * Math.cos(value);
                    this._y = r * Math.sin(value);
                }//end set
            },//end angle
            radius: {
                get: function() {
                    return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
                },//end get
                set: function(value) {
                    let a = this.angle;
                    this._x = value * Math.cos(a);
                    this._y = value * Math.sin(a);
                }//end set
            }//end radius
        });//end defineProperties
        
    }//end constructor
    
    draw(ctx, radius = 3, color = 'white') {
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, -this.y, radius , 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }//end draw
    
}//end class Point