module.exports = {

	API_KEY: null,

	API_URL: 'https://api.jaas.tech/collections',
	COLLECTION_URL: 'https://api.jaas.tech/collections/{collection}',
	ITEM_URL: 'https://api.jaas.tech/collections/{collection}/{id}',

	init: function(api_key) {
		if(!api_key)
			throw new Error('API key is missing')
		this.API_KEY = api_key;
	},

	httpCall: function(url, req, cb) {
		if(!this.API_KEY)
			throw new Error('API key is missing')
		if(!cb)
			throw new Error('Callback function missing')
		fetch(url, req)
		.then((response) => response.json())  
		.then((responseData) => {
			return cb(null, responseData)
		})
		.catch((err) => {
			return cb(err)
		});
	},

	collection: function(collection, where, cb) {
		if(!collection)
			throw new Error('Collection name missing');
		var requestObj = {
			method: 'get',  
			headers: {  
				"Content-type": "application/json",
				"x-jaas-token": this.API_KEY
			}
		};
		if(typeof(where) == 'function')
			this.httpCall(this.COLLECTION_URL.replace('{collection}', collection), requestObj, where);
		else {
			this.httpCall(this.COLLECTION_URL.replace('{collection}', collection) + '?query=' + JSON.stringify(where) , requestObj, cb);
		}
	},

	readItem: function(collection, id, cb) {
		if(!collection)
			throw new Error('Collection name missing');
		if(!id)
			throw new Error('Item ID missing');
		var requestObj = {
			method: 'get',  
			headers: {  
				"Content-type": "application/json",
				"x-jaas-token": this.API_KEY
			}
		};
		this.httpCall(this.ITEM_URL.replace('{collection}', collection).replace('{id}', id), requestObj, cb);
	},

	createItem: function(collection, obj, cb) {
		if(!collection)
			throw new Error('Collection name missing');
		if(!obj)
			throw new Error('Data missing');
		var requestObj = {
			method: 'post',  
			headers: {  
				"Content-type": "application/json",
				"x-jaas-token": this.API_KEY
			},
			body: JSON.stringify(obj)
		};
		this.httpCall(this.COLLECTION_URL.replace('{collection}', collection), requestObj, cb);
	},

	updateItem: function(collection, id, obj, cb) {
		if(!collection)
			throw new Error('Collection name missing');
		if(!id)
			throw new Error('Item ID missing');
		if(!obj)
			throw new Error('Data missing');
		var requestObj = {
			method: 'put',  
			headers: {  
				"Content-type": "application/json",
				"x-jaas-token": this.API_KEY
			},
			body: JSON.stringify(obj)
		};
		this.httpCall(this.ITEM_URL.replace('{collection}', collection).replace('{id}', id), requestObj, cb);
	},

	deleteItem: function(collection, id, cb) {
		if(!collection)
			throw new Error('Collection name missing');
		if(!id)
			throw new Error('Item ID missing');
		var requestObj = {
			method: 'delete',  
			headers: {  
				"Content-type": "application/json",
				"x-jaas-token": this.API_KEY
			}
		};
		this.httpCall(this.ITEM_URL.replace('{collection}', collection).replace('{id}', id), requestObj, cb);
	}

}