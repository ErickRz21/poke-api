export type Pokemon = {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;  // hp, attack, defense, etc.
        url: string;
      };
    }[];
    abilities: {
      is_hidden: boolean;
      slot: number;
      ability: {
        name: string;
        url: string;
      };
    }[];
    weight: number;  // hectograms
    height: number;  // decimeters
    base_experience: number;
    moves: {
      move: {
        name: string;
        url: string;
      };
      
    }[];
  };
  