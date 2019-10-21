
// NOTE: bloodhound.add() only adds to memory, not to prefetched local storage.
//  This storage is to augment the prefetch local storage.

import coreObject from "../../../lib/core/extensions/coreObject";

function PrefetchDataAdditionalStorage() {
	this.dataKey = null;
}

PrefetchDataAdditionalStorage.prototype.add = function(datums) {

	if (this.dataKey && datums && datums.length > 0) {

		var storage = localStorage[this.dataKey];

		if (storage) {
			storage = JSON.parse(storage);
		} else {
			storage = {};
		}

		for (var datum of datums) {
			storage[datum.id] = datum;
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
			storage = JSON.parse(storage);
			datums = coreObject.valuesToArray(storage);
		}
	}

	return datums;
}

PrefetchDataAdditionalStorage.prototype.clear = function() {

	localStorage.clear(this.dataKey);
}

export default PrefetchDataAdditionalStorage;