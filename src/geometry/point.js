class Point {
    
    constructor(x, y, ref = {x: 0, y: 0}) {
        
        Object.defineProperties(this, {
            x: {
                enumerable: true,
                get: function() {
                    return ref.x + x;
                },//end get
                set: function(value) {
                    x = value - ref.x;
                }//end set
            },//end x
            y: {
                enumerable: true,
                get: function() {
                    return ref.y + y;
                },//end get
                set: function(value) {
                    y = value - ref.y;
                }//end set
            },//end y
            angle: {
                get: function() {
                    return Math.atan2(y, x);
                },//end get
                set: function(value) {
                    let r = this.radius;
                    x = r * Math.cos(value);
                    y = r * Math.sin(value);
                }//end set
            },//end angle
            radius: {
                get: function() {
                    return Math.sqrt(sq(x) + sq(y));
                },//end get
                set: function(value) {
                    let a = this.angle;
                    x = value * Math.cos(a);
                    y = value * Math.sin(a);
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