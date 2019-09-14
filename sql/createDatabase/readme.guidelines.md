
## Primary Keys

**Do** use an INTEGER PRIMARY KEY.

**Avoid** any other type of primary key including GUIDs.

**Why?** Integer primary keys are much better for indexing than any other primary key. In SQLite it is especially important as an INTEGER PRIMARY KEY is an alias for the built in rowid which is around twice as fast as any other type of primary key.


**Do** use a primary key for every table.

**Why?** Improves the performance of all tables.