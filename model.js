const view = {
  currentPage: "home",
};

const game = {
  classChosen: false,

  chosenCharacter: null,

  currentLocation: "Starting Village",

  stats: {
    level: 1,
    gold: 100,
  },

  characters: [
    {
      name: "Knight",
      id: 0,
    },
    {
      name: "Archer",
      id: 1,
    },
    {
      name: "Rouge",
      id: 2,
    },
  ],

  weapons: [
    {
      name: "dagger",
      atk: 10,
      desc: "It looks a bit rusty.",
    },
    {
      name: "spear",
      atk: 15,
      desc: "It's a bit crooked.",
    },
    {
      name: "zweihander",
      atk: 40,
      desc: "I don't know how this fits in my backpack.",
    },
  ],

  locations: [
    {
      name: "Starting Village",
      id: 0,
      requiredLevel: 0,
      shopAvailable: true,
      canFight: false,
    },
    {
      name: "Forest",
      id: 1,
      requiredLevel: 1,
      shopAvailable: false,
      canFight: true,
      enemies: [
        {
          name: "Spider",
          maxhp: 100,
          hp: 100,
          requiredLevel: 1,
          exp: 35,
        },
        {
          name: "Giant Rat",
          maxhp: 170,
          hp: 170,
          requiredLevel: 3,
          exp: 65,
        },
        {
          name: "Wolf",
          maxhp: 300,
          hp: 300,
          requiredLevel: 7,
          exp: 105,
        },
      ],
    },
    {
      name: "Mountains",
      id: 2,
      requiredLevel: 10,
      shopAvailable: false,
      canFight: true,
    },
    {
      name: "Ice Ravine",
      id: 3,
      requiredLevel: 20,
      shopAvailable: false,
      canFight: true,
    },
    {
      name: "Abanonded Village",
      id: 4,
      requiredLevel: 30,
      shopAvailable: true,
      canFight: true,
    },
    {
      name: "Lava Sea",
      id: 5,
      requiredLevel: 40,
      shopAvailable: true,
      canFight: true,
    },
    {
      name: "Yellow Ocean",
      id: 6,
      requiredLevel: 50,
      shopAvailable: true,
      canFight: true,
    },
  ],
};
