import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NetflixComponent } from './pages/netflix/netflix.component';
import { AuthGuardLogin } from './guards/auth.guard';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { NetflixContainerMainComponent } from './components/netflix-container-main/netflix-container-main.component';
import { MoviesGenreComponent } from './components/movies-genre/movies-genre.component';
import {
  MovieDetailsResolver,
  SimilarMovieResolver,
} from './resolvers/movie.resolver';
import { LazyLoadingMovieGenreResolver } from './resolvers/genre.resolver';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'netflix',
    component: NetflixComponent,

    canActivate: [AuthGuardLogin],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/movie.module').then((m) => m.MovieModule),
        component: NetflixContainerMainComponent,
      },
      {
        path: 'movies/:movieId',
        component: MovieDetailsComponent,
        resolve: {
          movie_details: MovieDetailsResolver,
          similar_movie: SimilarMovieResolver,
        },
      },

      {
        path: 'genre/:genreId',
        component: MoviesGenreComponent,
        resolve: { lazyloading_movie_genre: LazyLoadingMovieGenreResolver },
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
