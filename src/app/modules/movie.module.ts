import { NgModule } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './materials.module';
import { MovieDetailsComponent } from '../components/movie-details/movie-details.component';

@NgModule({
  declarations: [],
  imports: [MovieDetailsComponent],
  providers: [MovieService],
})
export class MovieModule {}
