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

function changeLocation(id) {
  let level = game.stats.level;
  let location = getLocationById(id);
  if (level >= location.requiredLevel) {
    console.log("test");
    game.currentLocation = location;
    show(home());
  } else {
    alert("Your level is too low!");
  }
}
