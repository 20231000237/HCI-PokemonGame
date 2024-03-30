// mandatory functions
function $(s) {
	return document.querySelector(s);
}
function typeWriter(text, target, speed = 40) {
    let i = 0;
    let targetElement = $(target);
    if (!targetElement) {
        console.error("Target element not found.");
        return;
    }
    targetElement.innerHTML = '';
    function type() {
        if (i < text.length) {
            targetElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}


function disableMoves() {
    var buttons = document.querySelectorAll('.moves');
    buttons.forEach(function(button) {
        button.disabled = true;
    });
}
function enableMoves() {
    var buttons = document.querySelectorAll('.moves');
    buttons.forEach(function(button) {
        button.disabled = false;
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function start() {
	let snorlax = $('.snorlax-moves');
	snorlax.style.display = 'none';
	disableMoves();
	let screen = $('#main');
	let sb = $('#sb');
	sb.style.display = 'none';
	screen.style.display = 'flex';
	$('#next').disabled = true;
	// $('#next').style.backgroundColor = 'green';
	typeWriter('You sent out Kyogre!', '#text-area');
	await delay(2000);
	typeWriter('Opponent sent out Groudon!', '#text-area');
	await delay(2000);
	typeWriter('Pick your move!', '#text-area');
	enableMoves();
}
function youWon() {
	let screen = $('#main');
	screen.style.display = 'none';
	let winscreen = $('#winscreen');
	winscreen.style.display = 'block';
}
function youLose() {
	let screen = $('#main');
	screen.style.display = 'none';
	let losescreen = $('#losescreen');
	losescreen.style.display = 'block';
}

// pokemon constructor
function Pokemon(name, hp) {
	this.name = name;
	this.hp = hp;
}

// FOR OPPONENT
async function sendOut(who) {
	if (who == milktank) {
		typeWriter(`Opponent has sent out ${who.name}!`, '#text-area');
		let sprite = $('#milktank');
		sprite.style.display = 'block';
		$('.oppbox').style.display = 'block';
		$('#opphealth').style.width = who.hp + '%';
		$('#opphealth').style.backgroundColor = 'green';
		$('#pkmn-name2').innerText = "Miltank";
	} else if (who == ampharos) {
		typeWriter(`Opponent has sent out ${who.name}!`, '#text-area');
		let sprite = $('#ampharos');
		sprite.style.display = 'block';
		$('.oppbox').style.display = 'block';
		$('#opphealth').style.width = who.hp + '%';
		$('#opphealth').style.backgroundColor = 'green';
		let name = $('#pkmn-name2');
		name.innerHTML = "Ampharos";
		name.style.fontSize = "23px";
	}
}

async function sendOut2(who) {
	if (who == snorlax) {
		typeWriter(`You sent out ${who.name}!`, '#text-area');
		let moves = $('.snorlax-moves');
		moves.style.display = "grid";
		let sprite = $('#snorlax');
		sprite.style.display = 'block';
		$('.userbox').style.display = 'block';
		let name = $('#pkmn-name1');
		name.innerHTML = "Snorlax";
		$('#userhealth').style.width = who.hp + '%';
		$('#userhealth').style.backgroundColor = 'green';
	} else if (who == victini) {
		typeWriter(`You sent out ${who.name}!`, '#text-area');
		let moves = $('.victini-moves');
		moves.style.display = "grid";
		let sprite = $('#victini');
		sprite.style.display = 'block';
		$('.userbox').style.display = 'block';
		let name = $('#pkmn-name1');
		name.innerHTML = "Victini";
		$('#userhealth').style.width = who.hp + '%';
		$('#userhealth').style.backgroundColor = 'green';
	}
}

// FOR OPPONENT
async function checkIfFainted(target) {
	console.log(target.name, target.hp);
	if (target.hp <= 55) {
		$('#opphealth').style.backgroundColor = '#F1C40F';
	} 
	if (target.hp <= 20) {
		$('#opphealth').style.backgroundColor = '#C0392B';
	} 
	if (target.hp > 55) {
		$('#opphealth').style.backgroundColor = 'green';
	}

	if (target.hp <= 0) {
		target.hp = 0;
		$('#opphealth').style.width = target.hp + '%';
		typeWriter(`${target.name}'s health has been reduced to ${target.hp}!`, '#text-area');
		await delay(2000);
        typeWriter(`${target.name} has fainted!`, '#text-area');
		if (groudon.hp <= 0) {
			let sprite = $('#groudon');
			await delay(3000);
			sprite.style.display = 'none';
			$('.oppbox').style.display = 'none';
			current_opp = milktank;
			groudon.hp = 1;
		} else if (milktank.hp <= 0) {
			let sprite = $('#milktank');
			sprite.style.display = 'none';
			$('.oppbox').style.display = 'none';
			current_opp = ampharos;
			milktank.hp = 1;
		} else if (ampharos.hp <= 0) {
			let sprite = $('#ampharos');
			sprite.style.display = 'none';
			$('.oppbox').style.display = 'none';
			ampharos.hp = 1;
			await delay(3000);
			youWon();
		}
		await delay(2000);
		sendOut(current_opp);
	} else {
		typeWriter(`${target.name}'s health has been reduced to ${target.hp}!`, '#text-area');
	}

	await delay(2000);
	$('#next').disabled = false;
}
// FOR YOU
async function checkIfFainted2(target) {
	console.log(target.name, target.hp);
	if (target.hp <= 55) {
		$('#userhealth').style.backgroundColor = '#F1C40F';
	} 
	if (target.hp <= 20) {
		$('#userhealth').style.backgroundColor = '#C0392B';
	} 
	if (target.hp > 55) {
		$('#userhealth').style.backgroundColor = 'green';
	}

	if (target.hp <= 0) {
		target.hp = 0;
		$('#userhealth').style.width = target.hp + '%';
		typeWriter(`${target.name}'s health has been reduced to ${target.hp}!`, '#text-area');
		await delay(2000);
        typeWriter(`${target.name} has fainted!`, '#text-area');
        await delay(2000);

        if (kyogre.hp <= 0) {
        	$('#k').disabled = true;
			let sprite = $('#kyogre');
			sprite.style.display = 'none';
			$('.userbox').style.display = 'none';
			let moves = $('.kyogre-moves');
			moves.style.display = 'none';
			you = snorlax;
			kyogre.hp = 1;
		} else if (snorlax.hp <= 0) {
			$('#s').disabled = true;			
			let sprite = $('#snorlax');
			sprite.style.display = 'none';
			$('.userbox').style.display = 'none';
			let moves = $('.snorlax-moves');
			moves.style.display = 'none';
			you = victini;
			snorlax.hp = 1;
		} else if (victini.hp <= 0) {
			$('#v').disabled = true;
			let sprite = $('#victini');
			sprite.style.display = 'none';
			$('.userbox').style.display = 'none';
			let moves = $('.victini-moves');
			moves.style.display = 'none';
			victini.hp = 1;
			await delay(3000);
			youLose();
		}
		await delay(2000);
		sendOut2(you);
	} else {
		typeWriter(`${target.name}'s health has been reduced to ${target.hp}!`, '#text-area');
	}

	await delay(3000);
	typeWriter('Pick your move!', '#text-area');
	enableMoves();
}

let kyogre = new Pokemon('Kyogre', 100);
let groudon = new Pokemon('Groudon', 100);
let snorlax = new Pokemon('Snorlax', 100);
let milktank = new Pokemon('Miltank', 100);
let ampharos = new Pokemon('Ampharos', 100);
let victini = new Pokemon('Victini', 100);

let current_opp = groudon;
let you = kyogre;

// kyogre's moves
async function wf(target) {
	disableMoves();
	typeWriter('Kyogre used Waterfall!', '#text-area');
	target.hp -= 35;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}
async function hp(target) {
	disableMoves();
	typeWriter('Kyogre used Hydro Pump!', '#text-area');
	target.hp -= 45;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}
async function surf(target) {
	disableMoves();
	typeWriter('Kyogre used Surf!', '#text-area');
	target.hp -= 30;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}
async function bliz(target) {
	disableMoves();
	typeWriter('Kyogre used Blizzard!', '#text-area');
	target.hp -= 35;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}

// snorlax moves
async function bs(target) {
	disableMoves();
	typeWriter('Snorlax used Body Slam!', '#text-area');
	target.hp -= 30;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}
async function crunch(target) {
	disableMoves();
	typeWriter('Snorlax used Crunch!', '#text-area');
	target.hp -= 20;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}
async function zh(target) {
	disableMoves();
	typeWriter('Snorlax used Zen Headbutt!', '#text-area');
	target.hp -= 35;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}
async function tb(target) {
	disableMoves();
	typeWriter('Snorlax used Thunderbolt!', '#text-area');
	target.hp -= 25;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}
// victini moves
async function vc(target) {
	disableMoves();
	typeWriter('Victini used V-create!', '#text-area');
	target.hp -= 50;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}
async function psy(target) {
	disableMoves();
	typeWriter('Victini used Psychic!', '#text-area');
	target.hp -= 35;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}
async function mp(target) {
	disableMoves();
	typeWriter('Victini used Mega Punch!', '#text-area');
	target.hp -= 30;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}
async function bb(target) {
	disableMoves();
	typeWriter('Victini used Brick Break', '#text-area');
	target.hp -= 20;
	await delay(2000);
	$('#opphealth').style.width = target.hp + '%';
	checkIfFainted(target);
}

// ampharos' moves
async function thunder(target) {
    typeWriter('Ampharos used Thunder!', '#text-area');
    target.hp -= 35;
    await delay(2000);
    $('#userhealth').style.width = target.hp + '%';
    checkIfFainted2(target);
}
async function dp(target) {
    typeWriter('Ampharos used Dragon Pulse!', '#text-area');
    target.hp -= 30;
    await delay(2000);
    $('#userhealth').style.width = target.hp + '%';
    checkIfFainted2(target);
}

// milktank's moves
async function stomp(target) {
    typeWriter('Miltank used Stomp!', '#text-area');
    target.hp -= 35;
    await delay(2000);
    $('#userhealth').style.width = target.hp + '%';
    checkIfFainted2(target);
}
async function milkdrink(target) {
    typeWriter('Miltank used Milk Drink!', '#text-area');
    target.hp -= 0;
    await delay(2000);
    milktank.hp += 40;
    $('#opphealth').style.width = milktank.hp + '%';
    if (milktank.hp >= 100) {
    	milktank.hp = 100;
    }
    typeWriter('Miltank regained 40HP!', '#text-area');
    // checkIfFainted2(target);
    await delay(3000);
	typeWriter('Pick your move!', '#text-area');
	enableMoves();
}

// groudon's moves
async function eq(target) {
    typeWriter('Groudon used Earthquake!', '#text-area');
    target.hp -= 45;
    await delay(2000);
    $('#userhealth').style.width = target.hp + '%';
    checkIfFainted2(target);
}

async function sb(target) {
    typeWriter('Groudon used Solar Beam!', '#text-area');
    target.hp -= 30;
    await delay(2000);
    $('#userhealth').style.width = target.hp + '%';
    checkIfFainted2(target);
}

async function next(target) {
	$('#next').disabled = true;
	const randomNumber = Math.random();
	if (current_opp == groudon) {
		if (randomNumber < 0.5) {
			eq(target);
		} else {
			sb(target);
		}
	} else if (current_opp == milktank) {
		if (randomNumber < 0.75) {
			stomp(target);
		} else {
			milkdrink(target);
		}
	} else if (current_opp == ampharos) {
		if (randomNumber < 0.5) {
			thunder(target);
		} else {
			dp(target);
		}
	}
}

document.getElementById('sb').addEventListener('click', function() {
    var audio = document.getElementById('audio');
    audio.volume = 0.1;
    if (audio.paused) {
        audio.play();
        this.textContent = 'Pause Music';
    } else {
        audio.pause();
        audio.currentTime = 0; // Rewind to the beginning
        this.textContent = 'Play Music';
    }
});

