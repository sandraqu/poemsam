(function() {
	var	$new = $("#newPoem"),
			$game = $('#poemGame'),
			$poem = $game.find('.poem-sam'),
			$buttons = $game.find('.poem-buttons'),
			str;
			
	var title = $new.find('.poem-title').html();
	var verses = $new.find('.poem-body').html();
	var poemHidden = '.poem-hidden';
	var poemWord = '.poem-word';
	var sheetHidden = document.getElementById('styleHidden');
	var sheetWord = document.getElementById('styleWord');


	/*
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
	*/

	function selectOneInSet(setsOfIndexes,interval) {
		var subsetOfIndexes=[],
			finalIndexes=[],
			rand;

		wordIndexes.forEach( function(val,idx) {
			subsetOfIndexes.push(wordIndexes[idx]);
			if( idx !== 0 && idx%interval === 0) {
				rand = subsetOfIndexes[Math.floor(Math.random() * subsetOfIndexes.length)];
				finalIndexes.push(rand);
				subsetOfIndexes = [];
			}
		});
		return finalIndexes; // for hiding
	}

	function makeSubsets(wordIndexes,interval) {
		var subsetOfIndexes=[],
			sets=[];
		// to dos
		// first array ends up being interval+1
		// also, any remainders after the last mod 0, don't get into the sets
		wordIndexes.forEach( function(val,idx) {
			subsetOfIndexes.push(val);
			if(idx !== 0 && idx % interval === 0) {
				sets.push(subsetOfIndexes);
				subsetOfIndexes = [];
			}
		});
		return sets;
	}

	function temp(listOfLists) {
		var rand,
			finalIndexes=[];

		listOfLists.forEach( function(){
			rand = subsetOfIndexes[Math.floor(Math.random() * subsetOfIndexes.length)];
			finalIndexes.push(rand);
		});
		return finalIndexes;
	}

	function selectOneRandomFromSubset(mainArr) {
    filter(mainArr, selectSubset).forEach(selectRandom);
	}

	function selectRandom(subsetOfIndexes) {
		return subsetOfIndexes[Math.floor(Math.random() * subsetOfIndexes.length)];
	}

	function hideTheseWords(selectedIndexesForHiding,wordsAndBrNbspEntities) {
		selectedIndexesForHiding.forEach( function(val,idx) {
			wordsAndBrNbspEntities[val] = '<label id="holder-'+ idx +'" data-match="'+ val +'" class="mdl-chip poem-hidden"><span class="mdl-chip__text"></span></label>'
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
			buttonEntities.push('<label id="guess-'+ idx +'" data-match="'+ val +'" class="mdl-chip poem-word"><span class="mdl-chip__text">'+wordsAndBrNbspEntities[val]+'</span></label>');
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

//wordsAndBrEntities = makeBrElements(wordsAndSpaces);
	wordsAndBrEntities = wordsAndSpaces.map( function(hey) {
			return hey.replace(/\r\n/g,'<br/>').replace(/[\r\n]/g,'<br/>');
		});
	//wordsAndBrNbspEntities = makeNbspElements(wordsAndBrEntities);
	/*
	wordsAndBrNbspEntities = wordsAndBrEntities.map( function(now) {
			return now.replace(/\s/g,'&nbsp;');
		});
		*/
	//selectedIndexesForHiding = selectOneInX(wordIndexes,5);
	setsOfIndexes = makeSubsets(wordIndexes,5);

	// Cache your array!
	// store last poem (new poem) in local storage

	selectedIndexesForHiding = setsOfIndexes.map( function(hey){
			return hey[Math.floor(Math.random() * hey.length)];
		});

	suffledIndexesForHiding = shuffleArray(selectedIndexesForHiding);
	//// encrypt match number
	// on button click, find active holder and enter
	// on holder click, find active button and enter
	//// decrypt match number
	
	// does guess match index
	buttonDomElements = makeWordButtons(suffledIndexesForHiding,wordsAndBrEntities);
	wordsAndHiddenEntities = hideTheseWords(selectedIndexesForHiding,wordsAndBrEntities);

	buildButtons = makeDomEntity(buttonDomElements);
	buildPoem = makeDomEntity(wordsAndHiddenEntities);
	$buttons.append(buildButtons);
	$poem.append(buildPoem);

	function checkMate() {
		active = $('.active').length;
		if( active === 2) {
			wordMatch = $buttons.find('.active').data('match');
			wordWidth = $buttons.find('.active').width();
			blankMatch = $poem.find('.active').data('match');
			if ( wordMatch === blankMatch) {
				word = $buttons.find('.active').text();
				$poem.find('.active').attr('style','').width(wordWidth);
				$poem.find('.active').find('.mdl-chip__text').addClass('done').text(word);
			}
		}
	}

	function isSelf(hey, obj) {
		var regx = new RegExp(hey,"g");
		var str = obj.innerText; // HTMLStyleElement, innerText is inherited from HTMLElement

		return regx.test(str);
	}

	function makeStyle(guess,word){
		// modify css instead
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '.cssClass { color: #F00; }';
		document.getElementsByTagName('head')[0].remove(style);
		document.getElementsByTagName('head')[0].appendChild(style);

		//document.getElementById('someElementId').className = 'cssClass';
	}
	// insert Alman's code learning here

	$("body").on("click", poemWord, function(event) {
		event.preventDefault();
		// <label id="guess-2" data-match="101" class="mdl-chip poem-word"><span class="mdl-chip__text">because</span></label>
		// this.id;
		// <div class="poem-word" data-id="" data-play=""></div>
		//debugger;
		var $button = $(this);
		//var id;
		var data = $button.data("stats");
		var style, hasStyleAlready;
		
		if (!data){
			data = {};
			data.id = $button.attr("id");
			data.width = $button.width();
			data.try = $button.data('match');
			$button.data("stats", data); // update data
		}
 
    hasStyleAlready = isSelf(data.id,sheetWord);
    style  = !hasStyleAlready ? "#"+data.id+"{ border-color: #ff5722; background-color: #f9d62e; }" : "";

    sheetWord.innerHTML = style;
		

/*
		if( $(this).hasClass('active') ){
			$(this).toggleClass('active');	
		} else {
			$(poemWord).removeClass('active');
			$(this).addClass('active');
		}
		checkMate();
*/
	});




	$("body").on("click", poemHidden, function() {
		    // <div class="poem-blank" data-id="" data-play=""></div>

		if( $(this).hasClass('active') ){
			$(this).toggleClass('active');	
		} else {
			$(poemHidden).removeClass('active');
			$(this).addClass('active');
		}
		checkMate();
	});

}());

