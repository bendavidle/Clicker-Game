//initiliaze
game.experienceList = initExp();

function selectChar(id) {
  let character = getCharacterById(id);
  game.classChosen = true;
  game.chosenCharacter = character;
  game.currentLocation = getLocationById(0); //Default value

  renderCurrentPage();
}

function getCharacterById(id) {
  let characters = game.characters;
  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    if (char.id === id) {
      return char;
    }
  }
}

function getLocationById(id) {
  let locations = game.locations;
  for (let i = 0; i < locations.length; i++) {
    const loc = locations[i];
    if (loc.id === id) {
      return loc;
    }
  }
}

function getEnemyById(id) {
  let location = game.currentLocation;
  for (let i = 0; i < location.enemies.length; i++) {
    const enemy = location.enemies[i];
    if (enemy.id == id) {
      return enemy;
    }
  }
}

function setBattle(enemyId) {
  let enemy = getEnemyById(enemyId);
  game.currentEnemy = enemy;
  changePage("fight");
}

function attack() {
  let attack = game.chosenCharacter.baseAttack;

  if (game.currentEnemy.hp - attack <= 0) {
    let gold = randomNumber(game.currentEnemy.gold - game.currentEnemy.gold / 2, game.currentEnemy.gold * 2);
    game.stats.gold += gold;
    game.stats.xp += game.currentEnemy.exp;
    game.currentEnemy.hp = 0;
    game.currentEnemy.hp = game.currentEnemy.maxhp;
    game.stats.level = calculateLevel();

    changePage("home");

    setTimeout(() => {
      alert(`
        You won against ${game.currentEnemy.name}. You earned ${game.currentEnemy.exp} exp! 
        The enemy dropped ${gold} gold!`);
    }, 100);
  } else {
    game.currentEnemy.hp -= attack;
    enemyTurn();
  }
}

function enemyTurn() {
  let attack = game.currentEnemy.attack;
  if (game.stats.health - attack <= 0) {
    let lostGold = game.stats.gold / 2;
    game.stats.health = 0;
    game.stats.gold -= Math.floor(lostGold);
    changePage("home");
    game.currentEnemy.hp = game.currentEnemy.maxhp;
    game.stats.health = game.stats.maxHealth;
    setTimeout(() => {
      alert(`You lost against ${game.currentEnemy.name}. You lost ${lostGold} gold.`);
    }, 100);
  } else {
    game.stats.health -= attack;
  }
  renderCurrentPage();
}

function calculateLevel() {
  let currentLevel = game.stats.level;
  for (let i = 0; i < game.experienceList.length; i++) {
    const expRequired = game.experienceList[i];
    if (game.stats.xp <= expRequired) {
      setTimeout(() => {
        alert(`You level up!`);
      }, 120);
      game.chosenCharacter.baseAttack += i;
      game.chosenCharacter.maxHealth += i * 4;
      return i;
    }
  }
}

function rest(danger) {
  if (danger) {
    if (randomNumber(0, 100) > 50) {
      setBattle(randomNumber(0, game.currentLocation.enemies.length));
      return;
    }
  }

  if (game.stats.health < game.stats.maxHealth) {
    let remainingHealth = game.stats.maxHealth - game.stats.health;
    if (remainingHealth < 70) {
      game.stats.health = game.stats.maxHealth;
    } else {
      let randomHealth = randomNumber(remainingHealth / 5, remainingHealth / 1.3);
      if (game.stats.health + randomHealth >= game.stats.maxHealth) {
        game.stats.health = game.stats.maxHealth;
      } else {
        game.stats.health += randomHealth;
      }
    }
  }

  if (game.stats.energy < game.stats.maxEnergy) {
    let remainingEnergy = game.stats.maxEnergy - game.stats.energy;
    if (remainingEnergy < 10) {
      game.stats.energy = game.stats.maxEnergy;
    } else {
      let randomEnergy = randomNumber(remainingEnergy / 5, remainingEnergy / 1.3);
      if (game.stats.energy + randomEnergy >= game.stats.maxEnergy) {
        game.stats.energy = game.stats.maxEnergy;
      } else {
        game.stats.energy += randomEnergy;
      }
    }
  }

  game.day++;
  renderCurrentPage();
}

function changeLocation(id) {
  let level = game.stats.level;
  let energy = game.stats.energy;
  let location = getLocationById(id);
  if (level >= location.requiredLevel) {
    if (energy >= location.travelCost) {
      game.currentLocation = location;
      game.stats.energy -= location.travelCost;
      changePage("home");
    } else {
      alert("You have no energy left to travel. Please rest!");
    }
  } else {
    alert("Your level is too low!");
  }
}

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function initExp() {
  let expReqs = [];
  let expReq = 30;
  expReqs.push(expReq);
  for (var i = 1; i < 1024; i++) {
    expReq += i / 2 + Math.round(expReq * 0.0001);
    expReqs.push(expReqs[i - 1] + Math.ceil(expReq));
  }

  return expReqs;
}

function setLevel() {
  let level = document.getElementById("levelCheat").value;
  game.stats.level = level;
  game.chosenCharacter.baseAttack += Math.ceil(parseInt(level * 2));
  game.stats.maxHealth += parseInt(level) * 4;
  renderCurrentPage();
}
