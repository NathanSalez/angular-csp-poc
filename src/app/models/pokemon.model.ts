export interface PokemonModel {
  id: number;
  name: string;
  imgUrl?: string;
  description: string;
  height: number;
  weight: number;
  types: string[];
}
