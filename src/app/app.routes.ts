import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { authGuard } from './guards/auth.guard';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MoviesGenreComponent } from './components/movies-genre/movies-genre.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'browse',
    component: BrowseComponent,

    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/movie.module').then((m) => m.MovieModule),
        component: MoviesListComponent,
      },
      {
        path: 'movies/:movieSeqNo',
        component: MovieDetailsComponent,
      },
      {
        path: 'genre/:genreSeqNo',
        component: MoviesGenreComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
