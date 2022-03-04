const view = {
  currentPage: "home",
};

const game = {
  classChosen: false,

  chosenCharacter: null,
  currentLocation: "Starting Village",
  currentEnemy: null,
  day: 0,

  stats: {
    level: 1,
    gold: 100,
    maxHealth: 500,
    health: 500,
    maxEnergy: 100,
    energy: 100,
    xp: 0,
  },

  characters: [
    {
      name: "Knight",
      baseAttack: 30,
      id: 0,
    },
    {
      name: "Archer",
      baseAttack: 15,
      id: 1,
    },
    {
      name: "Rouge",
      baseAttack: 20,
      id: 2,
    },
  ],

  locations: [
    {
      name: "Starting Village",
      id: 0,
      requiredLevel: 0,
      shopAvailable: true,
      canFight: false,
      travelCost: 20,
    },
    {
      name: "Forest",
      id: 1,
      requiredLevel: 1,
      shopAvailable: false,
      canFight: true,
      travelCost: 55,
      enemies: [
        {
          name: "Spider",
          maxhp: 100,
          hp: 100,
          attack: 15,
          requiredLevel: 1,
          exp: 35,
          gold: 20,
          id: 0,
        },
        {
          name: "Giant Rat",
          maxhp: 170,
          hp: 170,
          attack: 20,
          requiredLevel: 3,
          exp: 65,
          gold: 60,
          id: 1,
        },
        {
          name: "Wolf",
          maxhp: 300,
          hp: 300,
          attack: 30,
          requiredLevel: 7,
          exp: 105,
          gold: 100,
          id: 2,
        },
      ],
    },
    {
      name: "Mountains",
      id: 2,
      requiredLevel: 10,
      shopAvailable: false,
      travelCost: 20,
      canFight: true,
    },
    {
      name: "Ice Ravine",
      id: 3,
      requiredLevel: 20,
      shopAvailable: false,
      travelCost: 50,
      canFight: true,
    },
    {
      name: "Abanonded Village",
      id: 4,
      requiredLevel: 30,
      shopAvailable: true,
      travelCost: 30,
      canFight: true,
    },
    {
      name: "Lava Sea",
      id: 5,
      requiredLevel: 40,
      shopAvailable: true,
      travelCost: 60,
      canFight: true,
    },
    {
      name: "Yellow Ocean",
      id: 6,
      requiredLevel: 50,
      shopAvailable: true,
      travelCost: 80,
      canFight: true,
    },
  ],
};
