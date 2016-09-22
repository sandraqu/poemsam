
(function() {
	var	$el = $("#newPoem"),
		$print = $('#poemsam'),
		str;
			
	var title = $el.find('.poem-title').html();
	var verses = $el.find('.poem-body').html();

	function makePoemEntity(wordsAndSpaceEntities) {
		var poemEntity = "";

		wordsAndSpaceEntities.forEach( function(val) {
			makeLineReturnEntities = val.replace(/\r\n/g,'<br/>').replace(/[\r\n]/g,'<br/>');
			makeSpaceEntities = makeLineReturnEntities.replace(/\s/g,'&nbsp;');
			poemEntity += makeSpaceEntities;
		});
		return poemEntity;
	}

	wordsAndSpaces = verses.split(/([^\s]+)/);
	debugger;
	wordIndexes = wordsAndSpaces.map(function(el,idx){
		return /\s+/.test(el) ? undefined : idx;
	})
	.filter(function(el){
		return el !== undefined;
	});

	poemEntity = makePoemEntity(wordsAndSpaces);
	$print.append(poemEntity);
}());

