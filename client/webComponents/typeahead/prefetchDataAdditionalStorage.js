
// NOTE: bloodhound.add() only adds to memory, not to prefetched local storage.
//  This storage is to augment the prefetch local storage.

function PrefetchDataAdditionalStorage() {
	this.dataKey = null;
}

PrefetchDataAdditionalStorage.prototype.add = function(datums) {

	if (this.dataKey && datums && datums.length > 0) {

		var storage = this.get();

		for (var datum of datums) {
			storage.push(datum);
		}

		storage = JSON.stringify(storage);

		localStorage[this.dataKey] = storage;
	}
}

PrefetchDataAdditionalStorage.prototype.get = function() {

	var datums = [];

	if (this.dataKey) {

		var storage = localStorage[this.dataKey];

		if (storage) {
			datums = JSON.parse(storage);
		}
	}

	return datums;
}

PrefetchDataAdditionalStorage.prototype.clear = function() {

	localStorage.clear(this.dataKey);
}


export default PrefetchDataAdditionalStorage;