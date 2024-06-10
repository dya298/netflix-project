import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../models/movie';
import SwiperCore from 'swiper';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { ActivatedRoute, Router } from '@angular/router';
import { STRING_EMPTY, tmdbConfig } from '../../constants/config';
import { Common } from '../../constants/common-enum';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

@Component({
  selector: 'app-movie-category',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movie-category.component.html',
  styleUrl: './movie-category.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class MovieCategoryComponent {
  @Input() title = STRING_EMPTY;
  @Input() movies: Movie[] = [];

  isDisplayImage!: boolean;
  peerMovie: number = Common.PEER_IMAGE_7;
  tmdbConfig = tmdbConfig;

  _route = inject(ActivatedRoute);
  _router = inject(Router);

  breakpoints = {
    330: {
      slidesPerView: Common.PEER_IMAGE_3,
    },
    870: {
      slidesPerView: Common.PEER_IMAGE_5,
    },
    1200: {
      slidesPerView: Common.PEER_IMAGE_7,
    },
  };

  constructor() {
    if (window.innerWidth <= Common.SIZE_LG) {
      this.peerMovie = Common.PEER_IMAGE_3;
    }
  }

  onClickMovie(index: number) {
    this.isDisplayImage = false;

    this._router.navigate(['movies', index], {
      relativeTo: this._route.parent,
    });
  }
}
