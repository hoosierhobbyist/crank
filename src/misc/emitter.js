export default class Emitter {
	
	constructor() {
		Object.defineProperties(this, {
			_events: {
				enumerable: true,
				value: new Map()
			},//end _events
		});//end defineProperties
	}//end constructor
	
	on(event, listener) {
		if(!(typeof listener === 'function')){
			throw TypeError("listener must be a function");
		}//end if
		
		if(!this._events.has(event)){
			this._events.set(event, new Set());
		}//end if
		this._events.get(event).add(listener);
		
		return this;
	}//end on
	
	once(event, listener) {
		if(!(typeof listener === 'function')){
			throw TypeError("listener must be a function");
		}//end if
		
		if(!this._events.has(event)){
			this._events.set(event, new Set());
		}//end if
		
		let wrapper = function(self, args){
			listener.apply(this, args);
			this.remove(event, wrapper);
		}//end wrapper
		this._events.get(event).add(wrapper, this);
		
		return this;
	}//end once
	
	emit(event, ...args) {
		if(this._events.has(event)){
			this._events.get(event).forEach(function(listener) {
				listener.apply(this, args);
			}, this);//end forEach
		}//end if
		
		return this;
	}//end emit
	
	remove(event, listener) {
		if(this._events.has(event)){
			if(this._events.get(event).has(listener)){
				this._events.get(event).delete(listener);
				if(!this._events.get(event).size) {
					this._events.delete(event);
				}//end if
			}//end if
		}//end if
		
		return this;
	}//end remove
	
	listening(event) {
		return this._events.has(event);
	}//end listening
	
}//end class Emitter
