function header() {
  let location = game.chosenCharacter ? `<div class="current-location">Current Location: ${game.currentLocation.name} Lvl: ${game.stats.level} Day: ${game.day}</div>` : "";
  let gold = game.chosenCharacter ? `<div class="currency">Gold: ${game.stats.gold}</div>` : "";
  let html = /*HTML*/ `
    <div class="header">
      ${location}
      ${gold}
      <div class="tab" onclick="changePage('home')">Home</div>
      <div class="tab  ${game.classChosen ? "" : "disabled"}" onclick="${game.classChosen ? "changePage('stats')" : ""} ">Stats</div>
      <div class="tab  ${game.classChosen ? "" : "disabled"}" onclick="${game.classChosen ? "changePage('settings')" : ""}">Settings</div>
    </div>
    `;
  return html;
}

function footer() {
  let html = /*HTML*/ `
    <div class="footer">
      <div class="health" style="width: ${(game.stats.health / game.stats.maxHealth) * 100}%"><tt>hp</tt></div>
      
      <div class="energy" style="width: ${(game.stats.energy / game.stats.maxEnergy) * 100}%"><tt>energy</tt></div>
    </div>
  `;

  if (game.chosenCharacter) {
    return html;
  }
}

function show(tab) {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${header()}
    ${tab}
    ${footer()}
  `;
}

function home() {
  let html = "";
  if (game.classChosen) {
    let chosenChar = game.chosenCharacter;
    let shop = game.currentLocation.shopAvailable ? `<div class="menu-choice" >Visit the shop</div>` : "";
    let fight = game.currentLocation.canFight ? `<div class="menu-choice" onclick="changePage('battle')">Battle</div>` : "";
    html = /*HTML*/ `
      <div class="home">
        <h1>Welcome, ${chosenChar.name}!</h1>
        <h4>What would you like to do?</h4>
        <div class="menu">
          <div class="menu-choice" onclick="changePage('adventure')">Adventure</div>
          ${shop}
          ${fight}
          <div class="menu-choice" onclick="rest(${game.currentLocation.canFight})">Rest ${game.currentLocation.canFight ? "<span class='dangerous'>danger!</span>" : ""}</div>
        </div>
      </div>
    `;
  } else {
    let charSelectHTML = "";

    for (let i = 0; i < game.characters.length; i++) {
      const character = game.characters[i];
      charSelectHTML += /*HTML*/ `
        <div class="character" onclick="selectChar(${character.id})">
          <h1>${character.name}</h1>
        </div>
      `;
    }

    html = /*HTML*/ `
      <div class="char-select">
        <div class="characters">
          ${charSelectHTML}
        </div>
      </div>
    `;
  }
  return html;
}

function stats() {
  let html = /*HTML*/ `
    <div class="stats">
      <p>Health: ${game.stats.health} / ${game.stats.maxHealth}</p>
      <p>Energy: ${game.stats.energy} / ${game.stats.maxEnergy}</p>
      <p>Attack: ${game.chosenCharacter.baseAttack}</p>
      <p>Current Exp: ${game.stats.xp} @ lvl ${game.stats.level} </p>
    </div>
  `;
  return html;
}

function settings() {
  let html = /*HTML*/ `
    <div class="settings">
      <h1>Cheats</h1>
      <div>
      <p>Set level: </p>
        <input id="levelCheat" type="number"/>
        <button onclick="setLevel()">Set Level</button>
      </div>
    </div>
  `;
  return html;
}

function adventure() {
  let currentLocation = game.currentLocation;
  let locationHTML = "";
  let html = "";

  for (let i = 0; i < game.locations.length; i++) {
    const location = game.locations[i];
    if (location.name != currentLocation.name) {
      locationHTML += /*HTML*/ `
          <div class="location"  onclick="changeLocation(${location.id})">
            <p>${location.name}</p>
            <p>Lvl required: ${location.requiredLevel}</p>
            <p>Travel Cost: ${location.travelCost}</p>
          </div>
      `;
    } else {
      locationHTML += /*HTML*/ `
          <div class="location selected"">
            <p>${location.name}</p>
            <p>Lvl required: ${location.requiredLevel}</p>
            <p>Travel Cost: ${location.travelCost}</p>
          </div>
      `;
    }
  }

  html += /*HTML*/ `
    <div class="home">
      ${locationHTML}
    </div>
  `;

  return html;
}

function battle() {
  let currentLocation = game.currentLocation;
  let battleHTML = "";
  let html = "";

  for (let i = 0; i < currentLocation.enemies.length; i++) {
    const enemy = currentLocation.enemies[i];
    battleHTML += /*HTML*/ `
      <div class="enemy" onclick="setBattle(${enemy.id})">
        <p>${enemy.name}</p>
        <p>HP: ${enemy.maxhp}</p>
        <p>Lvl: ${enemy.level}</p>
        <p>Exp: ${enemy.exp}</p>
      </div>
    `;
  }

  html += /*HTML*/ `
    <div class="home">
      ${battleHTML}
    </div>
  `;

  return html;
}

function fight() {
  if (game.currentEnemy) {
    let html = /*HTML*/ `
    <div class="fight">
      <div class="player">
        <p>${game.chosenCharacter.name}</p>
        <div class="health" style="width: ${(game.stats.health / game.stats.maxHealth) * 100}%"></div>
      </div>
      <div class="opponent">
        <p>${game.currentEnemy.name}</p>
        <div class="health" style="width: ${(game.currentEnemy.hp / game.currentEnemy.maxhp) * 100}%"></div>
      </div>
      <div class="attack" onclick="attack()">
        <p>ATTACK</p>
      </div>
    </div>
  `;
    return html;
  }
  console.log("hello");
}

function changePage(page) {
  switch (page) {
    case "home":
      show(home());
      view.currentPage = "home";
      break;
    case "stats":
      show(stats());
      view.currentPage = "stats";
      break;
    case "settings":
      show(settings());
      view.currentPage = "settings";
      break;
    case "adventure":
      show(adventure());
      view.currentPage = "adventure";
      break;
    case "battle":
      show(battle());
      view.currentPage = "battle";
      break;
    case "fight":
      show(fight());
      view.currentPage = "fight";
      break;
    default:
      show(home());
      view.currentPage = "home";
      break;
  }
}

function renderCurrentPage() {
  changePage(view.currentPage);
}

changePage("home");
