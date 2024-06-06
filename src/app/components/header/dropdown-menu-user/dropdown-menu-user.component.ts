import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/materials.module';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-dropdown-menu-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './dropdown-menu-user.component.html',
  styleUrl: './dropdown-menu-user.component.scss',
})
export class DropdownMenuUserComponent {
  isDisplayImage: boolean = false;
  loginService = inject(LoginService);
  isHiddenPopupUserInfo: boolean = false;

  ngOnInit() {
    if (this.loginService.isLoggedIn) {
      this.isDisplayImage = true;
    } else {
      this.isDisplayImage = false;
    }
  }
  onClickToggleUserInfo() {
    this.isHiddenPopupUserInfo = !this.isHiddenPopupUserInfo;
  }
  onLogout() {
    this.loginService.LogoutUser();
  }
}
