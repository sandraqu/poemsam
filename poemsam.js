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

	function selectOneInX(interval,wordIndexes) {
		var subsetOfIndexes=[],
			finalIndexes=[],
			rand;

		for(i=0; i<wordIndexes.length-1; i++) {
			subsetOfIndexes.push(wordIndexes[i]);
			if( i%interval === 0) {
				rand = subsetOfIndexes[Math.floor(Math.random() * subsetOfIndexes.length)];
				finalIndexes.push(rand);
				subsetOfIndexes = [];
			}
		}
		return finalIndexes; // for hiding
	}

	function hideTheseWords(selectedIndexesForHiding,wordsAndBrNbspEntities) {
		selectedIndexesForHiding.forEach( function(val) {
			wordsAndBrNbspEntities[val] = 	'<span id="guess-' + val + '" class="mdl-chip" style="width:30px;"><span class="mdl-chip__text"></span></span>'
		});
		return wordsAndBrNbspEntities;
	}

	function makePoemEntity(wordsAndBrNbspEntities) {
		var poemEntity = "";
		wordsAndBrNbspEntities.forEach( function(val) {
			poemEntity += val;
		});
		return poemEntity;
	}

	wordsAndSpaces = verses.split(/([^\s]+)/);
	wordIndexes = wordsAndSpaces.map(function(el,idx) {
		return /\s+/.test(el) ? undefined : idx;
	})
	.filter(function(el) {
		return el !== undefined;
	});

	wordsAndBrEntities = makeBrElements(wordsAndSpaces);
	wordsAndBrNbspEntities = makeNbspElements(wordsAndBrEntities);
	selectedIndexesForHiding = selectOneInX(5,wordIndexes);
	wordsAndHiddenEntities = hideTheseWords(selectedIndexesForHiding,wordsAndBrNbspEntities);

	buildPoem = makePoemEntity(wordsAndHiddenEntities);
	$print.append(buildPoem);
}());