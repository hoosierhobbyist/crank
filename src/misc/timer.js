//timer.js

class Timer {

  constructor(startNow = true){
    startNow = !!startNow;

    Object.defineProperties(this, {
      cache: {
        writable: true,
        value: 0
      },//end cache
      startTime: {
        writable: true,
        value: startNow ? Date.now() : null
      },//end startTime
      isRunning: {
        enumerable: true,
        get: function(){
          return this.startTime != null;
        }//end get
      },//end isRunning
      time: {
        enumerable: true,
        get: function(){
          if(!this.isRunning){
            return this.cache;
          } else {
            return this.cache + Date.now() - this.startTime;
          }//end if/else
        }//end time
      }//end time
    });//end defineProperties
  }//end constructor

  start(){
    if(!this.isRunning){
      this.startTime = Date.now();
    }//end if
  }//end start

  stop(){
    this.cache = 0;
    this.startTime = null;
  }//end stop

  pause(){
    if(this.isRunning){
      this.cache += Date.now() - this.startTime;
      this.startTime = null;
    }//end if
  }//end pause

  restart(){
    this.cache = 0;
    this.startTime = Date.now();
  }//end restart

}//end class Timer
