(function() {

	var
	db = function(name, tables) {

		this.name = name;
		this.tables = tables;

		for(var table in this.tables) {

			var
			_table = this.tables[table];

			_table._data = [];

			for(var record in _table.data) {

				_table._data.push(new _table.handler(_table.data[record]));

			};

			// console.log(_table.data);

		};

	};
	db.prototype.select = function(tableName, query) {

		var
		_return = [],
		table = this.tables[tableName],
		rowCount = table.data.length;

		// console.log((this.name + " select from " + tableName + " where "), query);

		for(var key in query) {

			for(var rowInc=1;rowInc<rowCount;rowInc++) {

				var
				row = table.data[rowInc];

				if(row[key]===query[key]) {

					_return.push(row);

				};

			};

		};

		return _return;

	};
	db.prototype.select2 = function(tableName, query) {

		var
		_return = [],
		table = this.tables[tableName],
		rowCount = table.data.length;

		// console.log((this.name + " select2 from " + tableName + " where "), query);

		for(var rowInc=1;rowInc<rowCount;rowInc++) {

			var
			row = table.data[rowInc];

			if(query.call(this, row)===true) {

				_return.push(row);

			};

		};

		return _return;

	};

	var
	example_db = new db("example_db", {
		"people": {
			handler: function(data) {
				this.id = data[0];
				this.age = data[1];
				this.group = data[2];
				this.colour = data[3];
				this.fname = data[4];
				this.sname = data[5];
			},
			data: [
				["1", "27", "1", "green", "James", "Rock"],
				["2", "32", "1", "pink", "Alice", "Rock"],
				["3", "3", "1", "brown", "Harris", "Rock"],
				["4", "1", "1", "brown", "Arran", "Rock"],
				["5", "42", "1", "brown", "Chris", "Pipe"],
				["6", "21", "1", "brown", "Amy", "Archer"],
				["7", "23", "1", "brown", "Charlotte", "Whotton"],
				["8", "69", "1", "brown", "Joyce", "Jackson"],
				["9", "74", "1", "brown", "James", "Jackson"]
			]
		},
		"groups": {
			handler: function(data) {
				this.id = data[0];
				this.name = data[1];
				this.location = data[2];
			},
			data: [
				["1", "musicians", "1"],
				["2", "developers", "1"],
				["3", "binpersons", "1"],
				["4", "tennisplayers", "1"]
			]
		},
		"locations": {
			handler: function(data) {
				this.id = data[0];
				this.name = data[1];
			},
			data: [
				["id", "name"],
				["1", "colchester"]
			]
		}
	}),
	peopleByTheNameOfRock = example_db.select("people", {
		"sname": "Rock"
	}),
	peopleByTheNameOfRock2 = example_db.select2("people", function(row) {

		return row.sname==="Rock";

	});

	console.log("example_db", example_db);
	console.log("peopleByTheNameOfRock", peopleByTheNameOfRock);
	console.log("peopleByTheNameOfRock2", peopleByTheNameOfRock2);
	// console.log(example_db.getRowAccessor("people", "sname"));
	// console.log(example_db.getRowAccessor("people", "age"));

})();
