//engine.js

let Crank = new Emitter();

(function(){
  let ctx = null;
  let canvas = null;
  let timestamp = 0;
  let frameRate = 30;
  let isRunning = false;
  let isDown = new Int8Array(new ArrayBuffer(128));
  let KEYS = {
      SHIFT: 16, CTRL: 17, ALT: 18,
      ESC: 27, SPACE: 32, PGUP: 33,
      PGDOWN: 34, END: 35, HOME: 36,
      LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,
      '0': 48, '1': 49, '2': 50, '3': 51, '4': 52,
      '5': 53, '6': 54, '7': 55, '8': 56, '9': 57,
      A: 65, B: 66, C: 67, D: 68, E: 69, F: 70,
      G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77,
      N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83,
      T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90
  };//end KEYS
  let masterUpdate = function(_timestamp){
    if(isRunning){
      if((_timestamp - timestamp) > (1000 / frameRate)){
        Crank.clear();
        Crank.emit('draw-background');
        Crank.emit('update');
        timestamp = _timestamp;
      }//end if
      requestAnimationFrame(masterUpdate);
    }//end if
  }//end masterUpdate

  document.onkeyup = function(e){
    e.preventDefault();
    isDown[e.keyCode] = 0;
  }//end onkeyup
  document.onkeydown = function(e){
    e.preventDefault();
    isDown[e.keyCode] = 1;
  }//end onkeydown
  document.onreadystatechange = function(){
    if(this.readyState === 'interactive'){
      Crank.emit('init');
    }//end if
  }//end onreadystatechange

  Crank.once('init', function(){
    canvas = document.getElementById('crank');

    if(canvas != null){
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      canvas.onmousemove = function(e){
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
      }//end onmousemove

      ctx = canvas.getContext('2d');
      ctx.translate(canvas.width / 2, canvas.height / 2);

      this.emit('draw-title-screen', ctx);
    } else {
      throw Error("cannot find canvas element #crank");
    }//end if/else
  });//end init

  Object.defineProperties(Crank, {
    left: {
      enumerable: true,
      get: function(){
        return -canvas.width / 2;
      }//end get
    },//end left
    right: {
      enumerable: true,
      get: function(){
        return canvas.width / 2;
      }//end get
    },//end right
    top: {
      enumerable: true,
      get: function(){
        return canvas.height / 2;
      }//end get
    },//end top
    bottom: {
      enumerable: true,
      get: function(){
        return -canvas.height / 2;
      }//end get
    },//end bottom
    mouse: {
      enumerable: true,
      get: function(){
        let x = canvas.mouseX - canvas.offsetLeft - canvas.width / 2;
        let y = -canvas.mouseY + canvas.offsetTop + canvas.height / 2;

        return new Point(x, y);
      }//end get
    },//end mouse
    isDown: {
      enumerable: true,
      value: function(key){
        return !!isDown[KEYS[key.toUpperCase()]];
      }//end value
    },//end isDown
    canvas: {
      enumerable: true,
      get: function(){
        return canvas;
      }//end get
    },//end canvas
    ctx: {
      enumerable: true,
      get: function(){
        return ctx;
      }//end get
    },//end ctx
    isRunning: {
      enumerable: true,
      get: function(){
        return isRunning;
      }//end get
    },//end isRunning
    frameRate: {
      enumerable: true,
      get: function(){
        return frameRate;
      },//end get
      set: function(value){
        if(value = parseFloat(value)){
          if(value > 0){
            frameRate = value;
          }//end if
        }//end if
      }//end set
    },//end frameRate
    start: {
      enumerable: true,
      value: function(){
        if(!isRunning){
          this.emit('start');
          isRunning = true;
          requestAnimationFrame(masterUpdate);
        }//end if
      }//end value
    },//end start
    stop: {
      enumerable: true,
      value: function(){
        if(isRunning){
          this.emit('stop');
          isRunning = false;
        }//end if
      }//end value
    },//end stop
    clear: {
      enumerable: true,
      value: function(){
        ctx.clearRect(this.left, this.bottom, canvas.width, canvas.height);
      }//end value
    }//end clear
  });//end defineProperties
}).call();
