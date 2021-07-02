import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PokemonModel} from '../../models/pokemon.model';
import {PokemonDetailComponent} from '../pokemon-detail/pokemon-detail.component';
import {AuthService} from '../../login/auth.service';
import {TeamService} from '../../team/team.service';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  providers: [MatSnackBar]
})
export class PokedexComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer')
  private drawer: any;
  @ViewChild(PokemonDetailComponent)
  private pokemonDetailComponent!: PokemonDetailComponent;
  selectedId!: number;

  // tslint:disable-next-line:variable-name
  constructor(private authService: AuthService, private teamService: TeamService, private _snackBar: MatSnackBar, private router: Router) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
  }

  onSelectedPokemon($event: any): void {
    this.selectedId = $event.id;
  }

  ngAfterViewInit(): void {
    /*
    Just for styling effect
    * */
    setTimeout(() => this.drawer.toggle(), 300);
  }

  randomPokemon(): void {
    this.selectedId = Math.floor(Math.random() * 150) + 1;
  }

  logout(): void {
    this.authService.logout();
  }

  addPokToTeam($event: PokemonModel): void {
    this.teamService.getTrainerTeam().subscribe((ids) => {
      if (ids.length < environment.maxNumberOfPokemons) {
        ids.push($event.id);
        this.teamService.setTrainerTeam(ids).subscribe(() => this.openSnackBar('Pokémon ' + $event.name + ' ajouté', 'Ok'));
      } else {
        this.openSnackBar('Votre équipe est pleine !', 'Ok');
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  randomTeam(): void {
    this.teamService.setTrainerTeam([]).subscribe(() => {
      const ids = [];
      for (let i = 0; i < environment.maxNumberOfPokemons; i++) {
        ids.push(Math.floor(Math.random() * 150) + 1);
      }
      this.teamService.setTrainerTeam(ids).pipe(tap(() => this.router.navigate(['team'])));
    });
  }
}
