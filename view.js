function header() {
  let location = game.chosenCharacter ? `<div class="current-location">Current Location: ${game.currentLocation.name} Lvl: ${game.stats.level}</div>` : "";
  let gold = game.chosenCharacter ? `<div class="currency">Gold: ${game.stats.gold}</div>` : "";
  let html = /*HTML*/ `
    <div class="header">
      ${location}
      ${gold}
      <div class="tab" onclick="changePage('home')">Home</div>
      <div class="tab" onclick="changePage('inventory')">Inventory</div>
      <div class="tab" onclick="changePage('stats')">Stats</div>
      <div class="tab" onclick="changePage('settings')">Settings</div>
    </div>
    `;
  return html;
}

function show(tab) {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${header()}
    ${tab}
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
          <div class="menu-choice">Rest for the day</div>
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

function inventory() {
  let html = /*HTML*/ `
    <div class="inventory">
      <p>This is inventory</p>
    </div>
  `;
  return html;
}

function stats() {
  let html = /*HTML*/ `
    <div class="stats">
      <p>This is stats</p>
    </div>
  `;
  return html;
}

function settings() {
  let html = /*HTML*/ `
    <div class="settings">
      <p>This is settings</p>
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
          </div>
      `;
    } else {
      locationHTML += /*HTML*/ `
          <div class="location selected"">
            <p>${location.name}</p>
            <p>Lvl required: ${location.requiredLevel}</p>
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
      <div class="enemy">
        <p>${enemy.name}</p>
        <p>HP: ${enemy.maxhp}</p>
        <p>Lvl: ${enemy.requiredLevel}</p>
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

function changePage(page) {
  switch (page) {
    case "home":
      show(home());
      view.currentPage = "home";
      break;
    case "inventory":
      show(inventory());
      view.currentPage = "inventory";
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
    default:
      show(home());
      view.currentPage = "home";
      break;
  }
}

function renderCurrentPage() {
  changePage(view.currentPage);
}

show(home());
