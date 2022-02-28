function header() {
  let html = /*HTML*/ `
    <div class="header">
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
    html = /*HTML*/ `
      <div class="home">
        <p>This is home the character is chosen</p>
      </div>
    `;
  } else {
    let charSelectHTML = "";

    for (let i = 0; i < game.characters.length; i++) {
      const character = game.characters[i];
      charSelectHTML += /*HTML*/ `
        <div class="character">
          ${character.name}
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

function changePage(page) {
  switch (page) {
    case "home":
      show(home());
      break;
    case "inventory":
      show(inventory());
      break;
    case "stats":
      show(stats());
      break;
    case "settings":
      show(settings());
      break;
    default:
      show(home());
      break;
  }
}

show(home());
