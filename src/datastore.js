import Promise from 'promise'

class DataStore {
    constructor() {
        console.log("running the DataStore constructor ...");
        this.data = {};
    }

	promiseResolvedWith(value) {
		var promise = new Promise(function(resolve, reject) {
			resolve(value);
		});
		return promise;
	}
	
	add(key, val) {
		this.data[key] = val;
		//return this.promiseResolvedWith(null);
	}
	
	get(key) { return this.promiseResolvedWith(this.data[key]); }
	
	getAll() { return this.promiseResolvedWith(this.data); }
	
	remove(key) { 
		delete this.data[key];  
		return this.promiseResolvedWith(null); 
	}
}

export default DataStore;
