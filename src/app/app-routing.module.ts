import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PokemonListComponent} from './pokemons/pokemon-list/pokemon-list.component';
import {PokemonDetailComponent} from './pokemons/pokemon-detail/pokemon-detail.component';
import {PokedexComponent} from './pokemons/pokedex/pokedex.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationGuard} from './authentication.guard';
import {TeamComponent} from './team/team.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'pokedex'},
  {path: 'pokedex', pathMatch: 'full', component: PokedexComponent},
  {path: 'login', pathMatch: 'full', component: LoginComponent},
  {
    path: 'team', pathMatch: 'full', component: TeamComponent, canActivate: [AuthenticationGuard],
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
  },
  {
    path: 'pokemons', pathMatch: 'full', component: PokemonListComponent,
    loadChildren: () => import('./pokemons/pokemons.module').then(m => m.PokemonsModule)
  },
  {path: 'pokemons/detail/:id', pathMatch: 'full', component: PokemonDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
