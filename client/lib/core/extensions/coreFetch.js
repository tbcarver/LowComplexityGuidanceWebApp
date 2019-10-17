
var coreFetch = {}

coreFetch.getPostOptions = function(data) {

	var options = {
		method: "POST",
		redirect: "manual",
		credentials: "same-origin",
	};

	if (data) {		
		options.body = JSON.stringify(data);
		options.headers = { "Content-Type": "application/json" };
	}

	return options;
}


export default coreFetch