(function() {
	var	$el = $("#newPoem"),
			$print = $('#poemsam'),
			str;
			
	var title = $el.find('.poem-title').html();
	var verses = $el.find('.poem-body').html();

	function makeBrElements(wordsAndSpaces) {
		wordsAndSpaces.forEach( function(val,idx,arr) {
			arr[idx] = val.replace(/\r\n/g,'<br/>').replace(/[\r\n]/g,'<br/>');
		});
		return wordsAndSpaces;
	}

	function makeNbspElements(wordsAndBrEntities) {
		wordsAndBrEntities.forEach( function(val,idx,arr) {
			arr[idx] = val.replace(/\s/g,'&nbsp;');
		});
		return wordsAndBrEntities;
	}

	function makePoemEntity(wordsAndBrNbspEntities) {
		var poemEntity = "";
		wordsAndBrNbspEntities.forEach( function(val) {
			poemEntity += val;
		});
		return poemEntity;
	}

	wordsAndSpaces = verses.split(/([^\s]+)/);
	wordIndexes = wordsAndSpaces.map(function(el,idx){
		return /\s+/.test(el) ? undefined : idx;
	})
	.filter(function(el){
		return el !== undefined;
	});

	wordsAndBrEntities = makeBrElements(wordsAndSpaces);
	wordsAndBrNbspEntities = makeNbspElements(wordsAndBrEntities);
	buildPoem = makePoemEntity(wordsAndBrNbspEntities);
	$print.append(buildPoem);
}());

