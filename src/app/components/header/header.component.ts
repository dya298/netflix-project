import { LeftAreaComponent } from './../left-area/left-area.component';
import { Component, inject } from '@angular/core';
import { LOGO_URL } from '../../constants/config';
import { CommonModule } from '@angular/common';
import { DropdownMenuUserComponent } from './dropdown-menu-user/dropdown-menu-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../modules/materials.module';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    DropdownMenuUserComponent,
    LeftAreaComponent,
    MaterialModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDisplayImage: boolean = false;
  logoUrl = LOGO_URL;
  isTogglePopupGenre: boolean = false;

  _loginService = inject(LoginService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);

  ngOnInit() {
    if (this._loginService.IsLoggedIn) {
      this.isDisplayImage = true;
    } else {
      this.isDisplayImage = false;
    }
  }

  onClickLogo() {
    this._router.navigate(['/'], { relativeTo: this._route.parent });
  }

  onTogglePopupGenre() {
    this.isTogglePopupGenre = !this.isTogglePopupGenre;
  }
}
