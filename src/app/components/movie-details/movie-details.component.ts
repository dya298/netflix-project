import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../modules/materials.module';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieCategoryComponent } from '../movie-category/movie-category.component';
import { DomSanitizer } from '@angular/platform-browser';
import {
  BG_DEFAULT,
  STRING_EMPTY,
  tmdbConfig,
  urlYoutube,
} from '../../constants/config';
import { Crew } from '../../models/crew';
import { Cast } from '../../models/cast';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Common } from '../../constants/common-enum';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    MovieCategoryComponent,
    MaterialModule,
    MovieCardComponent,
    SpinnerComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class MovieDetailsComponent {
  @Input() isDisplayImage!: boolean;

  movie$: Observable<Movie> | undefined;

  tmdbConfig = tmdbConfig;
  movie!: Movie;
  cast: Cast[] = [];
  crew!: Crew;
  totalCast: string = STRING_EMPTY;
  similarMovies: Movie[] = [];
  listUrlYoutube: any[] = [];
  isFinishLoad = true;
  bgDropDefault = BG_DEFAULT;

  _movieService = inject(MovieService);
  _sanitizer = inject(DomSanitizer);
  _route = inject(ActivatedRoute);
  _router = inject(Router);

  ngOnInit() {
    this.movie$ = this._route.data.pipe(map((data) => data['movie_details']));

    this.similarMovies = this._route.snapshot.data['similar_movie'];

    this._route.params.subscribe(async (params) => {
      this._movieService
        .LoadCastingMovie(params['movieId'])
        .subscribe((result: any) => {
          this.cast = result.cast;

          this.crew = result.crew[Common.VALUE_DEFAULT];

          this.totalCast = this._movieService.TotalCasting(this.cast);
        });

      this._movieService
        .LoadKeysYoutubeMovie(params['movieId'])
        .subscribe((result: any) => {
          var newKeys: any = this._movieService.ValidKeysYoutube(
            result.results
          );

          for (
            let index = Common.VALUE_DEFAULT;
            index < newKeys.length;
            index++
          ) {
            this.listUrlYoutube[index] =
              this._sanitizer.bypassSecurityTrustResourceUrl(
                `${urlYoutube}${newKeys[index].key}`
              );
          }
        });

      this.isFinishLoad = false;
    });
  }

  onClickSimilarMovie(index: number) {
    this._router.navigate(['movies', index], {
      relativeTo: this._route.parent,
    });
    this.isFinishLoad = true;
  }
}
