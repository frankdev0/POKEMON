interface pokemonProps {
    id: string;
    url: string;
    name: string;
    imageUrl:string;
  
  }

  interface pokemonProps {
    id: string;
    url: string;
    name: string;
    imageUrl: string;
    pokemon: {
      id: string;
      url: string;
      name: string;
    };
  }
  
  interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }