
## General Naming

**Do** use variable name rules. i.e. do not use dashes -.

**Why?** Allows matching the names to object and property names.


**Avoid** names that are programming language key words (SQL, JavaScript) including common HTML tags, i.e. title, body.

**Do** use VS Code SQL language mode syntax highlighting of key words to avoid key words. Prefix a key word with the singular table name.

**Why?** Allows using the name without having to escape it with []. Allows matching the column name to a property name.


**Avoid** variable names with spaces.

**Why?** Allows using the name without having to escape it with []. Allows matching the column name to a property name.


**Avoid** all abbreviations even those used by a particular library, like req, err, or msg. Well known abbreviations like HTML or HTTP are acceptable. Use wikipedia as a test for well known abbreviations.

**Why?** Reduce cognitive load. English words are easier to understand. No translation or extra training required.



## Table Names

**Do** use pascal case.

**Why?** Matches class name casing.

**Do** use plural names.

**Why?** A row represents a single item, a table represents a group of these items.



## Column Names

**Do** use camel case.

**Why?** Distinguish names from table names. Matches object property name casing.


**Do** use singular names.

**Why?** A row represents a single item.  The column is a part of that single item.



## Primary Keys

**Do** use an INTEGER PRIMARY KEY.

**Avoid** any other type of primary key including GUIDs.

**Why?** Integer primary keys are much better for indexing than any other primary key. In SQLite it is especially important as an INTEGER PRIMARY KEY is an alias for the built in rowid which is around twice as fast as any other type of primary key.


**Do** use a primary key for every table.

**Why?** Improves the performance of all tables.


**Do** use the table name as a singular followed by Id. For naming the id column.

**Avoid** using just the word id.

**Why?** When joining tables, the id columns have to become fully qualified adding to the overhead of creating queries.



## Foreign Keys

**Avoid** foreign keys on records that must be inserted with minimal failure. i.e. log records.

**Why?** Reduce the failure of inserting critical records.
