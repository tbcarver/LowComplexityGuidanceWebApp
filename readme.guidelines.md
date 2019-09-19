# CUCF Web Application Development Guidelines

This is an opinionated coding guideline document for all business application type web applications built at CUCF by inmates.
These guidelines presents preferred coding technologies, patterns, conventions, and tools.



## Development Philosophy

Prefer simplicity over all other values. After simplicity value maintainability.

All software development is complex. Reducing this complexity must be the main goal. CUCF has special challenges for software development with a major challenge being the turn over and lack of experience of developers. The code itself should be the best guidance for development.

Reduce coder's fingerprints through disciplined application of the development guidelines. All code should be styled in the same way and the same development techniques should be applied for all similar problems.



## Guidelines vocabulary

Each guideline describes either a good or bad practice.
The wording of each guideline indicates how strong the recommendation is.

**Do** is one that should always be followed.
_Always_ might be a bit too strong of a word.
You need a really unusual case for breaking a *Do* guideline.

**Consider** guidelines should generally be followed.
If you fully understand the meaning behind the guideline and have a good reason to deviate, then do so. Please strive to be consistent.

**Avoid** indicates something you should almost never do. Code examples to *avoid* have an unmistakable red header.

**Except** indicates an exception case to the other guidelines.
In rare cases an exception should be allowed.

**Why?** gives reasons for following the previous recommendations.



## Development Languages

**Do** use HTML, CSS, SASS, JavaScript, SQL.

**Avoid** any other language with the exception of a very minor amount of SASS to facilitate the minor customization of bootstrap.

**Why?** HTML and CSS are necessary for Web Application User Interface. JavaScript is a single language that can be used both on the server and client. SQL is the language for relational databases. These form the CodeCamp technologies and are the most used of all web programming technologies.



## Development Libraries

**Do** use npm modules that do not require compilation.

**Avoid** any modules that require compilation, i.e. *node-sass*, unless it is absolutely required, i.e. *mssql*.

**Why?** When an npm module requires compilation and then during 'yarn install --offline' the OS needs a complex setup to allow for compiling c files into assembly for the target machine. This complex setup may not be able to be achieved.


**Do** use dart *sass* 'yarn add sass --offline' instead of *node-sass*.

**Why?** *node-sass* requires a compilation.



## Web Server

**Do** use Express.

**Avoid** any other additions to Express like Loopback, Express is sufficient for all web server needs.

**Why?** Express is the dominant web server for the server side JavaScript ecosystem and is very simple to use and understand. Express can be ran in production with the use of PM2 (Process Manager) for monitoring and restarting.



## Web Site Optimization

**Do** cache all static resources for the max expiration time (1 year, 31536000 milliseconds).

**Why?** Reduce load times after first web page loading. Reduce server load.


**Do** use cache busting for all built resources i.e. sass to css, webpacked js.

**Avoid** any js resources that are not versioned.

**Why?** When caching all static resources for 1 year it is necessary to load static resources that have changed.



## JavaScript

**Do** return from only one place in a function.

**Why?** Makes it easier to know where the function is exiting. Allows for easier placement of breakpoints at the exit of the function.


## Database

**Do** Use efficient paging.

-- Reasonably efficient pagination without OFFSET
-- SQLite version (Adapted from MS SQL syntax)
-- Source: http://www.phpbuilder.com/board/showpost.php?p=10376515&postcount=6

SELECT foo, bar, baz, quux FROM table
WHERE oid NOT IN ( SELECT oid FROM table
                   ORDER BY title ASC LIMIT 50 )
ORDER BY title ASC LIMIT 10

**Avoid** LIMIT [no of rows] + OFFSET [row num].

**Why?** Offset does a full table scan to the offset number causing major performance issues with large 10,000+ record sets.