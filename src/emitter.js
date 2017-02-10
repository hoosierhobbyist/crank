//emitter.js

class Emitter {

  constructor(_maxListeners = 10){
    if(!Number.isInteger(_maxListeners)){
      throw TypeError("maxListeners must be an integer");
    }//end if
    if(_maxListeners < 1){
      throw RangeError("maxListeners must be at least 1");
    }//end if

    Object.defineProperties(this, {
      events: {
        enumerable: true,
        value: new Map()
      },//end events
      maxListeners: {
        enumerable: true,
        get: function(){
          return _maxListeners;
        },//end get
        set: function(value){
          if(Number.isInteger(value)){
            if(value > 0){
              for(let [event, listeners] of this.events){
                if(value < listeners.size){
                  return void 0;
                }//end if
              }//end for

              _maxListeners = value;
            }//end if
          }//end if
        }//end set
      }//end maxListeners
    });//end defineProperties
  }//end constructor

  on(event, listener){
    if(!(typeof listener === 'function')){
      throw TypeError("listener must be a function");
    }//end if

    if(!this.events.has(event)){
      this.events.set(event, new Set());
    }//end if

    if(this.events.get(event).size < this.maxListeners){
      this.events.get(event).add(listener);
    } else {
      throw RangeError(`event ${event} cannot exceed ${this.maxListeners} listeners`);
    }//end if/else

    return this;
  }//end on

  once(event, listener){
    if(!(typeof listener === 'function')){
      throw TypeError("listener must be a function");
    }//end if

    if(!this.events.has(event)){
      this.events.set(event, new Set());
    }//end if

    if(this.events.get(event).size < this.maxListeners){
      let wrapper = function(self, args){
        listener.apply(this, args);
        this.remove(event, wrapper);
      }//end wrapper
      this.events.get(event).add(wrapper, this);
    } else {
      throw RangeError(`event ${event} cannot exceed ${this.maxListeners} listeners`);
    }//end if/else

    return this;
  }//end once

  emit(event, ...args){
    if(this.events.has(event)){
      this.events.get(event).forEach(function(listener) {
        listener.apply(this, args);
      }, this);//end forEach
      return true;
    }//end if

    return false;
  }//end emit

  remove(event, listener){
    if(this.events.has(event)){
      if(this.events.get(event).has(listener)){
        this.events.get(event).delete(listener);
        return true;
      }//end if
    }//end if

    return false;
  }//end remove

}//end class Emitter
