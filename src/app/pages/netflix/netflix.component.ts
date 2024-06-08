import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/materials.module';
import SwiperCore from 'swiper';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { LeftAreaComponent } from '../../components/left-area/left-area.component';
import { RouterOutlet } from '@angular/router';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

@Component({
  selector: 'app-netflix',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MaterialModule,
    LeftAreaComponent,
    RouterOutlet,
  ],
  templateUrl: './netflix.component.html',
  styleUrl: './netflix.component.scss',
})
export class NetflixComponent {}
