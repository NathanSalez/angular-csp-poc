import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {PokemonModel} from '../models/pokemon.model';
import {PokemonsService} from '../pokemons/pokemons.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiURI = environment.pokedexApiUrl + '/trainers/me/team';

  constructor(private http: HttpClient) {
  }

  createTrainer(): void {
    // TODO
  }

  setTrainerTeam(ids: number[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(this.apiURI, ids, {headers});
  }

  getTrainerTeam(): Observable<any> {
    return this.http.get(this.apiURI);
  }
}
