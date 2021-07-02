import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ColorPipe} from './color.pipe';
import {PokedexComponent} from './pokedex/pokedex.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent, ColorPipe, PokedexComponent],
  imports: [
    // Core modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    // Application modules
    DragDropModule,
    InfiniteScrollModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatChipsModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatTooltipModule
  ],
  exports: [PokemonListComponent, ColorPipe, PokemonDetailComponent]
})
export class PokemonsModule {
}
