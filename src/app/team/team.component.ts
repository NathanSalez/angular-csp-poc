import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {TeamService} from './team.service';
import {PokemonModel} from '../models/pokemon.model';
import {Observable} from 'rxjs';
import {PokemonsService} from '../pokemons/pokemons.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @ViewChild('drawer')
  private drawer: any;
  team!: Observable<PokemonModel[]>;
  pokemonsToDelete: PokemonModel[] = [];

  constructor(private authService: AuthService, private teamService: TeamService, private pokemonService: PokemonsService) {
  }

  ngOnInit(): void {
    this.teamService.getTrainerTeam().subscribe((ids) => this.team = this.pokemonService.getPokemonsDetails(ids));
  }

  submitDelete(vueTeam: PokemonModel[]): void {
    vueTeam = vueTeam.filter((pok) => this.pokemonsToDelete.find(p => p.id === pok.id) === undefined);
    this.teamService.setTrainerTeam(vueTeam.map((line) => line.id)).subscribe();
    this.pokemonsToDelete = [];
    this.drawer.toggle();
    this.team = this.pokemonService.getPokemonsDetails(vueTeam.map((line) => line.id));
  }

  placeToDelete(pok: any): void {
    if (this.pokemonsToDelete.length === 0) {
      this.drawer.toggle();
    }
    if (!this.pokemonsToDelete.find(p => p === pok)) {
      this.pokemonsToDelete.push(pok as PokemonModel);
    }
  }

  checkToggle(): void {
    if (this.pokemonsToDelete.length === 0) {
      this.drawer.toggle();
    }
  }
}
