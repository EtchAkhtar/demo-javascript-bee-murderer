

/*
 * Update the display with information about each bee
 */
function displayBees() {
	var arrayLength = beeCollection.length;
	var txt = '';
	for (var i = 0; i < arrayLength; i++) {
		var bee = beeCollection[i];
		txt += '<tr class=' + bee.type + ' id="bee_' + bee.id + '"><td>' + bee.type + '</td><td>' + bee.lifespan + '</td></tr>';
	}
	document.getElementById('beeTableBody').innerHTML = txt;
}

/*
 * What happens when we selfishly hit a bee
 */
function hit() {
	// Ignore already dead bees
	var arrayLength = beeCollection.length;
	var newBees = new Array();
	for (var i = 0; i < arrayLength; i++) {
		var bee = beeCollection[i];
		if (!bee.amIDead()) {
			newBees.push(bee);
		}
	}

	// Get random bee from collection
	var bee = newBees[Math.floor(Math.random()*newBees.length)];

	// Hit it (you meanie)
	bee.hit();

	// If queen dies, all die
	if (bee.amIQueen() && bee.amIDead()) {
		for (var i = 0; i < arrayLength; i++) {
			beeCollection[i].killMe();
		}
	}

	// If all die, reset game
	var allDead = true;
	for (var i = 0; i < arrayLength; i++) {
		var bee = beeCollection[i];
		if (!bee.amIDead()) {
			allDead = false;
			break;
		}
	}

	if (allDead) { beeCollection = resetBees(queenCount, workerCount, droneCount); }

	// Refresh bee display
	setTimeout(function(){ displayBees(); }, 500);
}

/*
 * Reset the game
 */
function resetBees(queenCount, workerCount, droneCount)
{
	var beeCollection = new Array();
	var id = 1;

	for (i=1; i<=queenCount; i++) {
		beeCollection.push(new Bee(id++, 100, 8, 'Queen'));
	}

	for (i=1; i<=workerCount; i++) {
		beeCollection.push(new Bee(id++, 75, 10, 'Worker'));
	}

	for (i=1; i<=droneCount; i++) {
		beeCollection.push(new Bee(id++, 50, 12, 'Drone'));
	}

	return beeCollection;
}

/*
 * Create Bee object and declare methods (in JavaScript it's done by prototype)
 */
var Bee = function(id, lifespan, hitDeduction, type) {
	this.id = id;
	this.lifespan = lifespan;
	this.hitDeduction = hitDeduction;
	this.type = type;
}

Bee.prototype.hit = function() {
	this.lifespan -= this.hitDeduction;
    if (this.lifespan < 0) { this.lifespan = 0; }

    // Highlight
    $('#bee_' + this.id).css({backgroundColor: '#ff0'});
};

Bee.prototype.killMe = function() {
    this.lifespan = 0;
};


Bee.prototype.amIDead = function() {
    return this.lifespan <= 0;
};

Bee.prototype.amIQueen = function() {
    return this.type == 'Queen';
};

// Play the game
var queenCount = 1, workerCount = 5, droneCount = 8;
var beeCollection = resetBees(queenCount, workerCount, droneCount);
displayBees();

