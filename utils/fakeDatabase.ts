import PokeType from "../schemas/enums/PokeType";

export const bulbasaur = {
    Id: 1,
    Name: 'bulbasaur',
    Sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png",
    Pokenum: 1,
    Height: 50,
    Weight: 20.1,
    Color: "green",
    Description: "little beast yeah",
    PokeType: ["NORMAL", "GRASS"],
    Category: "PHYSIC",
    Talents: [{Id: 1, Name: "CHARMEUR PUISSANT", Description: "Avec un clein d'oeil il t'envoie 7eme ciel"}, {Id: 2, Name: "CHARMEUR PUISSANT", Description: "Avec un clein d'oeil il t'envoie 7eme ciel"}],
    Capacities:  [{Id: 45, Name:"Mimi-queue", Type:"NORMAL", Category: "PHYSIC", Power: 90, Precision: 0.90, PowerPoint: 10, Target: 2 }] , 
    Evolutions: [{
      Id: 1,
      Name: 'bulbasaur',
      Pokenum: 1,
      Height: 50,
      Weight: 20.1,
      Color: "green",
      Description: "little beast yeah",
      PokeType: ["NORMAL", "GRASS"],
    }, {
    Id: 2,
    Name: 'ivysaur',
    Pokenum: 2,
    Height: 172,
    Weight: 77.1,
    Color: "green",
    Description: "little beast yeah",
    PokeType: ["NORMAL", "GRASS"]
  }]
  };
  
  export const ivysaur = {
    Id: 2,
    Name: 'ivysaur',
    Pokenum: 2,
    Height: 172,
    Weight: 77.1,
    Color: "green",
    Description: "little beast yeah",
    PokeType: ["NORMAL", "GRASS"]
  };