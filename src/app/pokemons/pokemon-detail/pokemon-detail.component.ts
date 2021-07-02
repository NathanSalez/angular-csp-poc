import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonsService} from '../pokemons.service';
import {PokemonModel} from '../../models/pokemon.model';
import {Observable} from 'rxjs';
import {AuthService} from '../../login/auth.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges {
  pokemon$?: Observable<PokemonModel>;
  @Input() selectedPokemonId?: number;
  @Input() cols!: number;
  @Input() rowHeight!: string;
  @Input() isRemovable = false;
  @Input() isAddable = false;
  @Input() showDescription = false;
  @Output() onDelete: EventEmitter<PokemonModel> = new EventEmitter<PokemonModel>();
  @Output() onAdd: EventEmitter<PokemonModel> = new EventEmitter<PokemonModel>();


  constructor(private route: ActivatedRoute, private pokemonsService: PokemonsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    const idPokemon = this.route.snapshot.paramMap.get('id');
    if (idPokemon !== null) {
      this.pokemon$ = this.pokemonsService.getPokemonById(idPokemon);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedPokemonId.previousValue !== changes.selectedPokemonId.currentValue
      && changes.selectedPokemonId.currentValue !== undefined) {
      this.pokemon$ = this.pokemonsService.getPokemonById(changes.selectedPokemonId.currentValue);
    }
  }

  emitDelete(pok: PokemonModel): void {
    this.onDelete.emit(pok);
  }

  emitAdd(pok: PokemonModel): void {
    this.onAdd.emit(pok);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
