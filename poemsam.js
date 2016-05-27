'use strict';

var stanza = {
		1: "That time of year",
		2: "Thou mayst in me behold",
		3: "When yellow leaves or none or few do hang",
		4: "From broken bows that shake against the cold",
		5: "Where late the sweet birds sang"
	};

function createInput ( field ) {
	var input = document.createElement("input");
	
	input.type = "text";
	input.className = "button";
	input.value = field;
	return input;
}

function printButtons( buttons ) {
	var div = document.getElementById("poemsam"),
	buttonsLen = buttons.length;
	
	for ( var i = 0; i < buttonsLen; i++ ) {
		div.appendChild(buttons[i]);
	}
}

function getInput( verse ) {
	var line = verse.split(" "),
	lineLen = line.length,
	htm = [];

	for ( var i = 0; i < lineLen; i++ ) {
		htm.push( createInput( line[i] ) );
	}
	// add a line break to every verse
	htm.push( document.createElement("br") );
	htm.push( document.createElement("br") );
	printButtons(htm);
}

function getEachLine(stanza) {
	for ( var verse in stanza ) {
		getInput( stanza[verse] );
	}
}

getEachLine(stanza);