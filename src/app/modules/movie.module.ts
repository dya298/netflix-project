import { NgModule } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieDetailsComponent } from '../components/movie-details/movie-details.component';
import { MoviesGenreComponent } from '../components/movies-genre/movies-genre.component';

@NgModule({
  declarations: [],
  imports: [MovieDetailsComponent, MoviesGenreComponent],
  providers: [MovieService],
})
export class MovieModule {}
