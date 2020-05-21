export default class MinMax {

    constructor(n, m) {
        let min, max;

        if(n <= m) {
            min = n;
            max = m;
        } else {
            min = m;
            max = n;
        }//end if else

        Object.defineProperties(this, {
            min: {
                enumerable: true,
                get: function() {
                    return min;
                },//end get
                set: function(value) {
                    if(value < max) {
                        min = value;
                    }//end if
                }//end set
            },//end min
            max: {
                enumerable: true,
                get: function() {
                    return max;
                },//end get
                set: function(value) {
                    if(value > min) {
                        max = value;
                    }//end if
                }//end set
            }//end max
        });//end defineProperties
    }//end constructor

    includes(value) {
        if(this.min <= value) {
            if(value <= this.max) {
                return true;
            }//end if
        }//end if
        return false;
    }//end includes

}//end class MinMax