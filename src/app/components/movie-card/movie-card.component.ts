import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { Movie } from '../../types/movie';
import { tmdbConfig } from '../../constants/config';
import { MaterialModule } from '../../modules/materials.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Title } from '../../constants/commonEnum';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() index: number = 0;
  @Input() isDisplayImage!: boolean;
  enumTitleOriginal = Title.TitleOriginal;

  tmdbConfig = tmdbConfig;

  movieService = inject(MovieService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.movie.vote_average = this.movieService.calculateIMDb(
      this.movie.vote_average
    );
  }

  onClickMovie(index: number) {
    this.router.navigate(['movies', index], { relativeTo: this.route.parent });
  }
}
