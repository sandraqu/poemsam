(function() {
	var	$el = $("#newPoem"),
			$print = $('#poemsam'),
			$buttons = $('#poemButtons'),
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

		wordIndexes.forEach( function(val,idx) {
			subsetOfIndexes.push(wordIndexes[idx]);
			if( idx%interval === 0) {
				rand = subsetOfIndexes[Math.floor(Math.random() * subsetOfIndexes.length)];
				finalIndexes.push(rand);
				subsetOfIndexes = [];
			}
		});
		return finalIndexes; // for hiding
	}

	function hideTheseWords(selectedIndexesForHiding,wordsAndBrNbspEntities) {
		selectedIndexesForHiding.forEach( function(val,idx) {
			wordsAndBrNbspEntities[val] = '<span id="holder-'+ idx +'" data-match="'+ val +'" class="mdl-chip" style="width:30px;"><span class="mdl-chip__text"></span></span>'
		});
		return wordsAndBrNbspEntities;
	}

	function makeDomEntity(wordsAndBrNbspEntities) {
		var domEntity = "";
		wordsAndBrNbspEntities.forEach( function(val) {
			domEntity += val;
		});
		return domEntity;
	}

	/**
	 * Randomize array element order in-place.
	 * Using Durstenfeld shuffle algorithm.
	 */
	function shuffleArray(arr) {
		arr.forEach( function(val,i) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    });
    return arr;
	}

	function makeWordButtons(suffledIndexesForHiding,wordsAndBrNbspEntities) {
		var buttonEntities = [];
		suffledIndexesForHiding.forEach( function(val,idx) {
			buttonEntities.push('<span id="guess-'+ idx +'" data-match="'+ val +'" class="mdl-chip"><span class="mdl-chip__text">'+wordsAndBrNbspEntities[val]+'</span></span>');
		});
		return buttonEntities;
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
	suffledIndexesForHiding = shuffleArray(selectedIndexesForHiding);
	//// encrypt match number
	// create buttons
	// on button click, find active holder and enter
	//// decrypt match number
	
	// does guess match index
	buttonDomElements = makeWordButtons(suffledIndexesForHiding,wordsAndBrNbspEntities);
	wordsAndHiddenEntities = hideTheseWords(selectedIndexesForHiding,wordsAndBrNbspEntities);

	buildButtons = makeDomEntity(buttonDomElements);
	buildPoem = makeDomEntity(wordsAndHiddenEntities);
	$buttons.append(buildButtons);
	$print.append(buildPoem);
}());