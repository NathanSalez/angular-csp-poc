import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {forkJoin, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {QueryParamsModel} from '../models/query-params.model';
import {ResponseAPI} from '../models/responseAPI';
import {PokemonModel} from '../models/pokemon.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private apiURI: string = environment.pokedexApiUrl + '/pokemons';

  constructor(private http: HttpClient) {
  }

  getPokemons(params: QueryParamsModel): Observable<ResponseAPI<PokemonModel>> {
    let httpParams = new HttpParams();
    Object.entries(params).filter(([, v]) => v !== undefined).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value);
    });
    return this.http.get<ResponseAPI<PokemonModel>>(this.apiURI, {params: httpParams});
  }

  getPokemonById(id: string): Observable<PokemonModel> {
    return this.http.get<PokemonModel>(this.apiURI + '/' + id);
  }

  getPokemonsDetails(ids: number[]): Observable<PokemonModel[]> {
    const tmpTeam = ids.map((id => this.getPokemonById(`${id}`)));
    return forkJoin(tmpTeam as unknown as PokemonModel[]).pipe(tap(res => console.log(res)));
  }
}
