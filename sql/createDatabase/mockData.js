
require("dotenv").config();
var articlesStore = require("../../server/store/articlesStore");
var coreMath = require("../../server/lib/core/extensions/coreMath");


// TODO get a generator

var words = ['exercitationem', 'perferendis', 'perspiciatis', 'laborum', 'eveniet',
	'sunt', 'iure', 'nam', 'nobis', 'eum', 'cum', 'officiis', 'excepturi',
	'odio', 'consectetur', 'quasi', 'aut', 'quisquam', 'vel', 'eligendi',
	'itaque', 'non', 'odit', 'tempore', 'quaerat', 'dignissimos',
	'facilis', 'neque', 'nihil', 'expedita', 'vitae', 'vero', 'ipsum',
	'nisi', 'animi', 'cumque', 'pariatur', 'velit', 'modi', 'natus',
	'iusto', 'eaque', 'sequi', 'illo', 'sed', 'ex', 'et', 'voluptatibus',
	'tempora', 'veritatis', 'ratione', 'assumenda', 'incidunt', 'nostrum',
	'placeat', 'aliquid', 'fuga', 'provident', 'praesentium', 'rem',
	'necessitatibus', 'suscipit', 'adipisci', 'quidem', 'possimus',
	'voluptas', 'debitis', 'sint', 'accusantium', 'unde', 'sapiente',
	'voluptate', 'qui', 'aspernatur', 'laudantium', 'soluta', 'amet',
	'quo', 'aliquam', 'saepe', 'culpa', 'libero', 'ipsa', 'dicta',
	'reiciendis', 'nesciunt', 'doloribus', 'autem', 'impedit', 'minima',
	'maiores', 'repudiandae', 'ipsam', 'obcaecati', 'ullam', 'enim',
	'totam', 'delectus', 'ducimus', 'quis', 'voluptates', 'dolores',
	'molestiae', 'harum', 'dolorem', 'quia', 'voluptatem', 'molestias',
	'magni', 'distinctio', 'omnis', 'illum', 'dolorum', 'voluptatum', 'ea',
	'quas', 'quam', 'corporis', 'quae', 'blanditiis', 'atque', 'deserunt',
	'laboriosam', 'earum', 'consequuntur', 'hic', 'cupiditate',
	'quibusdam', 'accusamus', 'ut', 'rerum', 'error', 'minus', 'eius',
	'ab', 'ad', 'nemo', 'fugit', 'officia', 'at', 'in', 'id', 'quos',
	'reprehenderit', 'numquam', 'iste', 'fugiat', 'sit', 'inventore',
	'beatae', 'repellendus', 'magnam', 'recusandae', 'quod', 'explicabo',
	'doloremque', 'aperiam', 'consequatur', 'asperiores', 'commodi',
	'optio', 'dolor', 'labore', 'temporibus', 'repellat', 'veniam',
	'architecto', 'est', 'esse', 'mollitia', 'nulla', 'a', 'similique',
	'eos', 'alias', 'dolore', 'tenetur', 'deleniti', 'porro', 'facere',
	'maxime', 'corrupti'];

	
for (var count = 1; count <= 100; count++) {

	console.log(getWords(2, 4));
	articlesStore.addArticle(getWords(2, 4), getWords(6, 8), getWords(10, 30), coreMath.randomInteger(1, 2));
}


function getWords(min, max) {

	var amount = coreMath.randomInteger(min, max);
	var randomWords = [];

	for (var count = 0; count <= amount; count++) {

		var randomIndex = coreMath.randomInteger(0, words.length - 1);

		randomWords.push(words[randomIndex]);
	}

	return randomWords.join(" ");
}
