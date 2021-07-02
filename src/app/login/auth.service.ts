import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TeamService} from '../team/team.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURI = environment.pokedexApiUrl + '/auth';
  // tslint:disable-next-line:variable-name
  private _token?: string;
  // tslint:disable-next-line:variable-name
  private _refreshToken?: string;
  // tslint:disable-next-line:variable-name
  private _expiresIn?: number;

  constructor(private http: HttpClient) {
  }

  get token(): string | undefined {
    return this._token;
  }

  get expiresIn(): number | undefined {
    return this._expiresIn;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiURI + '/login', {email, password}).pipe(tap((res) => {
      this._token = res.access_token;
      this._refreshToken = res.refresh_token;
      this._expiresIn = Number(res.expires_in);
    }));
  }

  refreshCurrentToken(): Observable<any> {
    return this.http.post<any>(this.apiURI + '/refresh', {refresh_token: this._refreshToken}).pipe(tap((res) => {
      this._token = res.access_token;
      this._refreshToken = res.refresh_token;
      this._expiresIn = Number(res.expires_in);
    }));
  }

  isLoggedIn(): boolean {
    return this._token !== undefined && this._token?.length > 0;
  }

  logout(): void {
    this._token = undefined;
    this._refreshToken = undefined;
    this._expiresIn = undefined;
  }
}
