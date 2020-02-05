////////////////////////////////BATTLE LOGIC///////////////////////////////////
var enemyMove;
var savedEnemyMove;
var health = 100; //player starting health
var enemyHealth = 100; //enemy starting health
var speech = ''; //battle's direct dialogue
var attackButton = document.getElementById('dropkick'); //standard attack
var counterButton = document.getElementById('counter'); //counter attack
var healthBar = document.getElementById('healthBar');
var enemyHealthBar = document.getElementById('enemyHealthBar');
var battleLog = document.getElementById('dialogueBox'); //battle text
var advanceTo = document.getElementById('advanceTo'); //advances to next scenario when enemy health hits 0
var battleHUD = document.getElementsByClassName('battleHUD')[0]; //battle HUD
battleHUD.style.display = 'none';
let newgame = document.getElementById("start");
let enable = 1; //allows multiple battles
//


function enableButtons() {
	attackButton.disabled = false;
	counterButton.disabled = false;
}


//triggers the fight in the HTML
function startBattle(go) {
	enemyMove(go);
	healthChange();
	gameOver();
}


//adds the counter action to attack
function counter(yu) {
	var move = Math.floor((Math.random() * 5)); //  hit/miss ratio for yu counter
	if (move >= 3 && yu === 'dropkick') {
		speech = "Enemy counter successful! Took 10 damage";
		health -= 10;
	} else if (move >= 3 && yu === 'counter') {
		speech = "Player's counter successful! Enemy took 20 damage!";
		enemyHealth -= 20;
	} else if (move < 3 && yu === 'dropkick') {
		speech = "Counter failed! Dealt 15 damage";
		enemyHealth -= 15;
	} else if (move < 3 && yu === 'counter') {
		speech = "Player's counter failed! Dealt 15 damage";
		health -= 15;
	}

}


//dislpays results of battle
function roundResults(speech) {
	battleLog.innerHTML += speech + '<br>';
	if (enemyHealth === 0) {
		battleLog.innerHTML = ''
	}
}


function healthChange() {
	healthBar.style.width = health + "%";
	enemyHealthBar.style.width = enemyHealth + "%";
	if (enemyHealth === 0) {
		if (enable == 1) {
			scenario.six.buttons[0] = ["Next", "advanceTo(scenario.seven)"]
			scenario.six.text = "Key Guardian was defeated!"
			enemyHealth = 100;
			enemyHealthBar.style.width = enemyHealth + "%"; //resets battle
			// enable = false;
			enable = 2;
			requestAnimationFrame(advanceTo(scenario.six))
		} else if (enable == 2) {
			scenario.oneFive.buttons[0] = ["Next", "advanceTo(scenario.oneSix)"]
			scenario.oneFive.text = "..."
			enemyHealth = 100;
			enemyHealthBar.style.width = enemyHealth + "%"; //resets battle
			// enable = false;
			enable = 3;
			requestAnimationFrame(advanceTo(scenario.oneFive))
		} else if (enable == 3) {
			scenario.oneEleven.buttons[0] = ["Next", "advanceTo(scenario.oneTwelve)"]
			scenario.oneEleven.text = "Enemy Defeated!"
			enemyHealth = 100;
			enemyHealthBar.style.width = enemyHealth + "%"; //resets battle
			enable = 4;
			requestAnimationFrame(advanceTo(scenario.oneEleven))
		} else if (enable == 4) {
			scenario.twoThree.buttons[0] = ["Next", "advanceTo(scenario.twoFour)"]
			scenario.twoThree.text = "Enemy Defeated!"
			enemyHealth = 100;
			enemyHealthBar.style.width = enemyHealth + "%"; //resets battle
			enable == 5;
			requestAnimationFrame(advanceTo(scenario.twoThree))
		
	} else if (health === 0) {
		console.log('gameover');
	}
  }
}


//takes moves of the player, generates one for enemy then runs the damage step
function enemyMove(go) {
	var move = Math.floor((Math.random() * 4) + 1); //enemy hit/miss ratio
	if (move <= 3) {
		savedEnemyMove = 'dropkick';
	} else {
		savedEnemyMove = 'counter';
	};
	damageStep(go, savedEnemyMove);
	roundResults(speech);
}


//proccesses the moves to a result
function damageStep(yu, en) {
	if (yu === 'dropkick' && en === 'dropkick') {
		speech = 'Both parties took damage';
		if (enemyHealth >= 15 && health >= 10) {
			enemyHealth -= 15;
			health -= 10;
		} else {
			enemyHealth = 0;
			health = 100;
		}
	} else if (yu === 'counter' && en === 'counter') {
		speech = 'You defend yourself';
	} else if (yu === 'dropkick' && en === 'counter') {
		speech = 'Enemy readies itself';
		counter(yu, en);
	} else if (yu === 'counter' && en === 'dropkick') {
		speech = 'You ready yourself';
		counter(yu, en);
	}
}


window.onload = enableButtons();


/////////////////////////////////////GAME LOGIC////////////////////////////////////////


var images = document.getElementById('images');
var text = document.getElementById('text');
var buttonBox = document.getElementById('buttonBox');
var input = document.getElementById('input');
//variable for the name of the character
var protag;


//name scenario starts, advances to next scenario on Enter
input.onkeypress = function (event) {
	console.log(input.value);
	if (event.key == "Enter" || event.keyCode == 13) { //keycode '13' equal to 'Enter' key
		protag = input.value;
		input.parentNode.removeChild(input) //removes the input bar after first scenario
		advanceTo(scenario.two)
	}
};

//replaces 'Player' with your input
var changeText = function (words) {
	text.innerHTML = words.replace("Player", protag);
};

//allows images to be switched within scenarios
var changeImage = function (img) {
	images.style.backgroundImage = "url(" + img + ")"; //id is being dynamically received
};

//allows buttons to be switched within scenarios
var changeButtons = function (buttonList) {
	buttonBox.innerHTML = "";
	for (var i = 0; i < buttonList.length; i++) {
		buttonBox.innerHTML += "<button onClick=" + buttonList[i][1] + ">" + buttonList[i][0] + "</button>";
	};
};

//displays battle HUD in specific scenarios
var showBattleHUD = function (yesorno) {
	if (yesorno === 'yes') {
		battleHUD.style.display = 'initial';
	}
	if (yesorno === 'no') {
		battleHUD.style.display = 'none';
	}
}

//moves the game along
var advanceTo = function (s) {
	changeImage(s.image)
	changeText(s.text)
	changeButtons(s.buttons)
	showBattleHUD(s.test)
};


//Text nodes
var scenario = {
	one: {
		image: src = "media/greenbeanpxl.png",
		text: "What's your name, string bean?",
	},
	two: {
		image: src = "media/elvispxl.png", //protag
		text: "You are Player, an Elvis impersonator highly valued by the community. You were sent by the governor to investigate a haunted Chinese buffet, because you're just that badass.",
		buttons: [["Continue", "advanceTo(scenario.three)"]]
	},
	three: {
		image: src = "media/doorknobpxl.png",
		text: "You find yourself in a room of the basement in the haunted establishment. You hear footsteps from above, causing a chill to run down your spine, but nothing can stop The Player. How will you twist the doorknob?",
		buttons: [["Left", "advanceTo(scenario.four)"], ["Right", "advanceTo(scenario.five)"]]
	},
	four: {
		text: "Alas, your cockiness got the best of you. A wall of flying chopsticks impaled you, thus ending the Story of Player."
	},
	five: {
		image: src = "media/basementpxl.png",
		text: "You exit the room and view the surrounding area. You see the basement door exit but it's locked. You see a key through the window of another room in the basement. You open the room door, but you see an enemy blocking the way!",
		buttons: [["FIGHT", "advanceTo(scenario.six)"]]
	},
	six: {
		image: src = "media/goatpxl.png", //enemy1
		text: "The Key Guardian attacks!",
		buttons: [],
		test: 'yes'
	},
	seven: {
		text: "Player was victorious! You grab the room key and exit the basement.",
		buttons: [["Next", "advanceTo(scenario.eight)"]],
		test: 'no'
	},
	eight: {
		text: "You walk towards the center of the building. You see the bar and the buffet stand. Where should you go?",
		buttons: [["Bar", "advanceTo(scenario.oneOne)"], ["Buffet", "advanceTo(scenario.twoOne)"]]
	},
	oneOne: {
		text: "You head towards the bar and see an open bottle of vodka. Drink it?",
		buttons: [["No", "advanceTo(scenario.oneThree)"], ["Yes", "advanceTo(scenario.oneTwo)"]]
	},
	oneTwo: {
		image: src = "media/ghostpxl.png",
		text: "You drink the bottle of vodka. The Ghost of Bad Decisions appears and extracts your soul from your body. GAME OVER"
	},
	oneThree: {
		text: "You ignore the bottle and leave the bar. You see the kid's playroom and decide to go there and investigate.",
		buttons: [["Next", "advanceTo(scenario.oneFour)"]]
	},
	oneFour: {
		text: "You start to feel uneasy. the playroom is empty, but you can sense a presence. Suddenly, a monster drops from the ceiling!",
		buttons: [["FIGHT", "advanceTo(scenario.oneFive)"]]
	},
	oneFive: {
		image: src = "media/apyrpxl.png", //enemy1-1
		text: "друг charges at full force!",
		buttons: [],
		test: 'yes'
	},
	oneSix: {
		text: "друг suffers a blow to the head and runs off. You see a key lying on the floor of the playroom. It has the word 'backdoor' written on it. Where should you go?",
		buttons: [["Kitchen", "advanceTo(scenario.oneSeven)"], ["Smoking Area", "advanceTo(scenario.oneEight)"]],
		test: 'no'
	},
	oneSeven: {
		image: src = "media/hibachipxl.png",
		text: "You enter the kitchen and see a hibachi chef wordlessly frying food. His mouth is sewn shut. GAME OVER"
	},
	oneEight: {
		text: "You use the key and find yourself outside in the smoking area. On one of the tables, you see a set of keys. Which will you take?",
		buttons: [["Yin", "advanceTo(scenario.oneNine)"], ["Yang", "advanceTo(scenario.oneTen)"]]
	},
	oneNine: {
		text: "You grab the Yin key. Suddenly, your body starts to levitate, and eventually implodes on itself. GAME OVER"
	},
	oneTen: {
		text: "You grab the Yang key. You've accomplished your goal, now you must leave and report back to the governor. You make your way towards the front door. You unlock the door and find yourself in the parking lot. Suddenly, a sense of impending doom lurks over you...",
		buttons: [["Continue...", "advanceTo(scenario.oneEleven)"]]
	},
	oneEleven: {
		image: src = "media/cyberpxl.png", //enemy1-2
		text: "VROOM VROOM",
		test: 'yes',
		buttons: []
	},
	oneTwelve: {
		text: "Player reports back to the governor and earns a bucket of chicken wings. YOU WIN",
		test: 'no',
		buttons: [["Next", "advanceTo(scenario.oneThirteen)"]]
	},
	oneThirteen: {
		test: "no"
	},
	twoOne: {
		text: "You make your way towards the buffet stand. A man holding an overloaded hibachi plate spots you. What will you do?",
		buttons: [["Run", "advanceTo(scenario.twoTwo)"], ["FIGHT", "advanceTo(scenario.twoThree)"]]
	},
	twoTwo: {
		text: "You try to run away, but the man catches up and corners you!",
		buttons: [["Next", "advanceTo(scenario.twoThree)"]]
	},
	twoThree: {
		image: src = "media/mrxxpxl.png", //enemy2-1
		text: "The man vigorously eats some rice...",
		test: 'yes',
		buttons: []
	},
	twoFour: {
		image: src = "media/glowpxl.png",
		text: "You manage to make the man stumble, but the rice gives him power. You run away into the bathroom, and notice a blue glow among the darkness. What will you do?",
		buttons: [["Approach", "advanceTo(scenario.twoFive)"]],
		test: 'no'
	},
	twoFive: {
		image: src = "media/glowpxl.png",
		text: 'You open the glowing stall and see a ghost. "I am the Toilet Guardian. I am binded by a contract to protect this toilet. Please help me escape."',
		buttons: [["Flush", "advanceTo(scenario.twoSix)"], ["Free", "advanceTo(scenario.twoSeven)"]]
	},
	twoSix: {
		image: src = "media/crowd2pxl.png",
		text: "You flush the ghost down the toilet. You hear the echoes of a thousand souls. GAME OVER"
	},
	twoSeven: {
		text: "You free the ghost from the toilet. It thanks you profusely before flying off. You exit the bathroom, when suddenly...",
		buttons: [["Next", "advanceTo(scenario.twoEight)"]]
	},
	twoEight: {
		image: src = "media/mrxxpxl.png", //enemy2-2
		text: "The man is going in for seconds!",
		test: 'yes',
		buttons: [["Next", "advanceTo(scenario.twoNine)"]]
	},
	twoNine: {
		text: "You dropkick the man in the stomach, causing the front door keys to drop from his shirt pocket. You grab the key to unlock the door and flee from the building.",
		buttons: [["Continue", "advanceTo(scenario.twoTen)"]],
		test: 'no'
	},
	twoTen: {
		text: "You exit the building and find yourself in the parking lot. Suddenly, a sense of impending doom lurks over you...",
		buttons: [["Continue...", "advanceTo(scenario.twoEleven)"]]
	},
	twoEleven: {
		image: src = "media/cyberpxl.png",  //enemy2-3
		text: "VROOM VROOM",
		test: 'yes',
		buttons: [["Next", "advanceTo(scenario.twoTwelve)"]]
	},
	twoTwelve: {
		text: "Player reports back to the governor and earns a bucket of chicken wings. YOU WIN",
		test: 'no',
		buttons: [["Next", "advanceTo(scenario.twoThirteen)"]]
	},
	twoThirteen: {
		test: 'no'
	}
};


//starts the game
advanceTo(scenario.one);