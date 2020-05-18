export default class Emitter extends Map {
	
	constructor() {
		super();
	}//end constructor
	
	on(event, listener) {
        if(typeof event === 'string') {
            if(typeof listener === 'function') {
                if(!this.has(event)){
                    this.set(event, new Set());
                }//end if
                this.get(event).add(listener);
                return true;
            }//end if
        }//end if
		return false;
	}//end on
	
	once(event, listener) {
        listener['ONCE'] = true;
        return this.on(event, listener);
    }//end once
    
    remove(event, listener) {
        if(this.has(event)) {
            if(this.get(event).delete(listener)) {
                if(!this.get(event).size) {
                    this.delete(event);
                }//end if
                return true;
            }//end if
        }//end if
        return false;
    }//end remove
	
	emit(event, ...args) {
		if(this.has(event)) {
			this.get(event).forEach((listener) => {
                listener.apply(this, args);
                if(listener['ONCE']) {
                    this.remove(event, listener);
                }//end if
            });//end forEach
            return true;
		}//end if
		return false;
	}//end emit
	
}//end class Emitter