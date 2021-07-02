import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {PokemonsService} from '../pokemons.service';
import {PokemonModel} from '../../models/pokemon.model';
import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements AfterViewInit, OnChanges {

  pokemons: PokemonModel[] = [];
  limit = 20;

  @Input() searchOption?: boolean;
  @Output() pokemonsOptionChange = new EventEmitter<PokemonModel[]>();
  @Input() pokemonsOption ?: PokemonModel[];
  @Output() selectedPokemon: EventEmitter<PokemonModel> = new EventEmitter();
  @ViewChild('search') private searchBox!: ElementRef;
  searchKey!: string;


  constructor(private pokemonsService: PokemonsService) {
  }

  ngAfterViewInit(): void {
    if (this.pokemonsOption !== undefined) {
      this.pokemons = this.pokemonsOption;
    } else {
      this.pokemonsService.getPokemons({offset: this.pokemons.length, limit: this.limit}).subscribe((res) => {
          this.pokemons = res.data;
          this.limit = res.limit;
        }
      );
    }
    if (this.searchOption !== undefined) {
      this.pokemonsService.getPokemons({offset: this.pokemons.length, limit: this.limit}).pipe(map((v) => {
        return v.data as PokemonModel[];
      }));
      fromEvent(this.searchBox.nativeElement, 'keyup').pipe(
        map((i: any) => i.currentTarget.value),
        debounceTime(500)
      ).subscribe((v) => {
        if (v !== '') {
          this.pokemonsService.getPokemons({search: v}).subscribe((res) => {
            this.pokemons = res.data;
          });
        } else {
          // offset = 0 to reload basic pokemons tab.
          this.pokemonsService.getPokemons({offset: 0, limit: this.limit}).subscribe((res) => {
              this.pokemons = res.data;
              this.limit = res.limit;
            }
          );
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pokemonsOption !== undefined && changes.pokemonsOption.previousValue !== changes.pokemonsOption.currentValue) {
      this.pokemonsOption = changes.pokemonsOption.currentValue;
    }
  }

  onScroll(): void {
    this.pokemonsService.getPokemons({offset: this.pokemons.length, limit: this.limit}).subscribe((res) => {
      this.pokemons = [...this.pokemons.concat(res.data)];
      this.limit = res.limit;
    });
  }

  selectPokemon(pokemon: PokemonModel): void {
    this.selectedPokemon.emit(pokemon);
  }

  searchFor($event: any): void {
  }

  removePokemon(pok: PokemonModel): void {
    this.pokemons = this.pokemons.filter((poke) => poke.id !== pok.id);
    this.pokemonsOptionChange.emit(this.pokemons);
  }
}
