import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/materials.module';
import SwiperCore from 'swiper';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { LeftAreaComponent } from '../../components/left-area/left-area.component';
import { RouterOutlet } from '@angular/router';
import { MovieService } from '../../services/movie.service';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MaterialModule,
    LeftAreaComponent,
    RouterOutlet,
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export class BrowseComponent {}
