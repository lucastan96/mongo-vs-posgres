// Mongo DB
// Big Data Systems CA 1

// Database: bigdata_ca1_lucas_tan
// Collection: movies


// 2. Inserting Documents
db.movies.insert({
    title: "Fight Club",
    writer: "Chuck Palahniuk",
    year: 1999,
    actors: ["Brad Pitt", "Edward Norton"]
});
db.movies.insert({
    title: "Pulp Fiction",
    writer: "Quentin Tarantino",
    year: 1994,
    actors: ["John Travolta", "Uma Thurman"]
});
db.movies.insert({
    title: "Inglorious Bastards",
    writer: "Quentin Tarantino",
    year: 2009,
    actors: ["Brad Pitt", "Diane Kruger", "Eli Roth"]
});
db.movies.insert({
    title: "The Hobbit: An Unexpected Journey",
    writer: "J.R.R. Tolkien",
    year: 2012,
    franchise: "The Hobbit"
});
db.movies.insert({
    title: "The Hobbit: The Desolation of Smaug",
    writer: "J.R.R. Tolkien",
    year: 2013,
    franchise: "The Hobbit"
});
db.movies.insert({
    title: "The Hobbit: The Battle of the Five Armies",
    writer: "J.R.R Tolkien",
    year: 2012,
    franchise: "The Hobbit",
    synopsis: "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness."
});
db.movies.insert({
    title: "Pee Wee Herman's Big Adventure"
});
db.movies.insert({
    title: "Avatar"
});


// 3. Querying & Finding Documents
db.movies.find().pretty(); // Get all documents
db.movies.find({writer: "Quentin Tarantino"}).pretty(); // Get all documents with "writer" set to "Quentin Tarantino"
db.movies.find({actors: "Brad Pitt"}).pretty(); // Get all documents where "actors" include "Brad Pitt"
db.movies.find({franchise: "The Hobbit"}).pretty(); // Get all documents with "franchise" set to "The Hobbit"
var year_range = {};
year_range['$lt'] = 2000
year_range['$gt'] = 1989
db.movies.find({year: year_range}).pretty(); // Get all movies released in the 90s
db.movies.find({$or: [{year: {$lt:2000}}, {year: {$gt:2010}}]}).pretty(); // Get all movies released before the year 2000 or after 2010


// 4. Updating Documents
db.movies.update({title: "The Hobbit: An Unexpected Journey"}, {$set: {synopsis: "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."}}); // Adding a synopsis to "The Hobbit: An Unexpected Journey"
db.movies.update({title: "The Hobbit: The Desolation of Smaug"}, {$set: {synopsis: "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."}}); // Adding a synopsis to "The Hobbit: The Desolation of Smaug"
db.movies.update({title: "Pulp Fiction"}, {$push: {actors: "Samuel L. Jackson"}}); // Adding actor "Samuel L. Jackson" to the movie "Pulp Fiction"


// 5. Searching for Text
db.movies.find({synopsis: /Bilbo/}, {title: 1, synopsis: 1}).pretty(); // Find movies that contain a synopsis that includes the word "Bilbo"
db.movies.find({synopsis: /Gandalf/}, {title: 1, synopsis: 1}).pretty(); // Find movies that contain a synopsis that includes the word "Gandalf"
db.movies.find({$and: [{synopsis: /Bilbo/}, {synopsis: {$nin: [/Gandalf/]}}]}, {title: 1, synopsis: 1}).pretty(); // Find movies that contain a synopsis that includes the word "Bilbo" but not "Gandalf"
db.movies.find({$or: [{synopsis: /dwarves/}, {synopsis: /hobbit/}]}, {title: 1, synopsis: 1}).pretty(); // Find movies that contain a synopsis that includes the word "dwarves" or "hobbit"
db.movies.find({$or: [{synopsis: /gold/}, {synopsis: /dragon/}]}, {title: 1, synopsis: 1}).pretty(); // Find movies that contain a synopsis that includes the word "gold" and "dragon"


// 6. Deleting Documents
db.movies.remove({title: "Pee Wee Herman's Big Adventure"}); // Delete the movie "Pee Wee Herman's Big Adventure"
db.movies.remove({title: "Avatar"}); // Delete the movie "Avatar"


// 7. Relationships
// Inserting Documents to "users" Collection
db.users.insert({
    username: "GoodGuyGreg",
    first_name: "Good Guy",
    last_name: "Greg"
});
db.users.insert({
    username: "ScumbagSteve",
    full_name: {first: "Scumbag", last: "Steve"}
});
// Loading & Running a JavaScript File
load("/Users/lucastan96/Documents/Computing/Computing\ Level\ 8\ Year\ 3/Big\ Data\ Systems/Assignments/functions.js");
// Inserting Documents to "posts" Collection
insertPost("GoodGuyGreg", "Passes out at party", "Wakes up early and cleans house");
insertPost("GoodGuyGreg", "Steals your identity", "Raises your credit score");
insertPost("GoodGuyGreg", "Reports a bug in your code", "Sends you a pull request");
insertPost("ScumbagSteve", "Borrows something", "Sells it");
insertPost("ScumbagSteve", "Borrows everything", "The end");
insertPost("ScumbagSteve", "Forks your repo on Github", "Sets to private");
// Inserting Documents to "comments" Collection
insertComment("GoodGuyGreg", "Hope you got a good deal!", "Borrows something");
insertComment("GoodGuyGreg", "What's mine is yours!", "Borrows everything");
insertComment("GoodGuyGreg", "Don't violate the license agreement!", "Forks your repo on Github");
insertComment("ScumbagSteve", "It still isn't clean", "Passes out at party");
insertComment("ScumbagSteve", "Denied your PR cause I found a hack", "Reports a bug in your code");


// 8. Querying Related Collections
db.users.find().pretty(); // Find all users
db.posts.find().pretty(); // Find all posts
db.posts.find({username: "GoodGuyGreg"}).pretty(); // Find all posts authored by "GoodGuyGreg"
db.posts.find({username: "ScumbagSteve"}).pretty(); // Find all posts authored by "ScumbagSteve"
db.comments.find().pretty(); // Find all comments
db.comments.find({username: "GoodGuyGreg"}).pretty(); // Find all comments authored by "GoodGuyGreg"
db.comments.find({username: "ScumbagSteve"}).pretty(); // Find all comments authored by "ScumbagSteve"
db.comments.find({'post.$id' : db.posts.findOne({title : "Reports a bug in your code"})._id }).pretty(); // Find all posts belonging to the post "Reports a bug in your code"