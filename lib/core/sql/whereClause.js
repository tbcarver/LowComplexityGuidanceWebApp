
var _ = require("lodash");
var coreString = require("../extensions/coreString");

var where = " WHERE ";
var and = " AND ";
var or = " OR ";

class WhereClause {

	constructor() {
		this.andClauses = [];
		this.orClauses = [];
		this.parameters = {};
	}

	addAndClause(clause, key, value) {

		if (!_.isNil(key) && !_.isNil(value) && !coreString.isEmptyString(value)) {

			this.andClauses.push(` (${clause}) `);
			this.addParameter(key, value);
		}
	}

	addOrClause(clause) {
		this.orClauses.push(` (${clause}) `);
	}

	addParameter(key, value) {

		if (!_.isNil(key) && !_.isNil(value) && !coreString.isEmptyString(value)) {

			this.parameters[key] = value;
		}
	}

	buildWhere() {
		return this.join(where);
	}

	buildAnd() {
		return this.join(and);
	}

	buildOr() {
		return this.join(or);
	}

	join(prepend) {

		var clause = this.andClauses.join(and);

		if (this.orClauses.length > 0) {
			if (clause) {

				clause += or;
				clause += " ( ";
				clause += this.orClauses.join(or);
				clause += " ) ";

			} else {
				clause += this.orClauses.join(or);
			}
		}

		if (clause) {
			clause = `${prepend} (${clause}) `;
		}

		return clause;
	}
}

module.exports = WhereClause;