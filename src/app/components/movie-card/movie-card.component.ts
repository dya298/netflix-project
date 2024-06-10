import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { Movie } from '../../models/movie';
import { tmdbConfig } from '../../constants/config';
import { MaterialModule } from '../../modules/materials.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Common, Title } from '../../constants/common-enum';

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
  @Input() isDisplayImage!: boolean;

  enumTitleOriginal = Title.TITLE_ORIGINAL;
  valueDefault = Common.VALUE_DEFAULT;
  defaultPage = Common.DEFAULT_PAGE;
  subString4 = Common.SUBSTRING_4;

  tmdbConfig = tmdbConfig;

  movieService = inject(MovieService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);

  onClickMovie(index: number) {
    this._router.navigate(['movies', index], {
      relativeTo: this._route.parent,
    });
  }
}
