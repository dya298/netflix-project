import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/materials.module';
import { LoginService } from '../../../services/login.service';
import { IMAGE_DEFAULT_USER } from '../../../constants/config';

@Component({
  selector: 'app-dropdown-menu-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './dropdown-menu-user.component.html',
  styleUrl: './dropdown-menu-user.component.scss',
})
export class DropdownMenuUserComponent {
  isDisplayImage: boolean = false;
  isHiddenPopupUserInfo: boolean = false;
  imgUrlUser = IMAGE_DEFAULT_USER;
  
  _loginService = inject(LoginService);

  ngOnInit() {
    if (this._loginService.IsLoggedIn) {
      this.isDisplayImage = true;
    } else {
      this.isDisplayImage = false;
    }
  }
  onClickToggleUserInfo() {
    this.isHiddenPopupUserInfo = !this.isHiddenPopupUserInfo;
  }
  onLogout() {
    this._loginService.LogoutUser();
  }
}
