
var where = " WHERE ";
var and = " AND ";
var or = " OR ";

class WhereClause {

	constructor() {
		this.andClauses = [];
		this.orClauses = [];
	}

	addAndClause(clause) {
		this.andClauses.push(` (${clause}) `);
	}

	addOrClause(clause) {
		this.orClauses.push(` (${clause}) `);
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