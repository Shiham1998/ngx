import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  User
} from '../models/user';
import {
  AuthService
} from '../services/auth.service';
import { HoneybillService } from '../services/honeybill.service';
import {
  TokenStorageService
} from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  toggle1: boolean = false;
  toggle2: boolean = false;
  addUser!: FormGroup;
  isLoggedIn!: boolean;
  isLoginFailed = false;
  infoMessage = '';
  mobile: any;
  user_pwd: any;

  user: User = {
    id: '',
    user_first_name: '',
    user_last_name: '',
    user_email: '',
    user_pwd: '',
    user_mobile: '',
    user_address: '',
    user_type: ''
  };

  form: any = {
    user_mobile: null,
    user_pwd: null,

  };

  constructor(private tokenStorage: TokenStorageService,
    private route: Router,
    private authService: AuthService,
  ) { }
  errorMessage = '';

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.redirectoModule();
    } else {
      this.isLoggedIn = false;
    }

  }

  f_login(): void {
    const {
      user_mobile,
      user_pwd
    } = this.form;
    this.authService.login(user_mobile, user_pwd).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        console.log(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.redirectoModule();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  redirectoModule(): void {
    this.route.navigate(['/layout']);
  }

  changeType(input_field_password: any, num: any) {
    if (input_field_password.type == "password")
      input_field_password.type = "text";
    else
      input_field_password.type = "password";

    if (num == 1)
      this.toggle1 = !this.toggle1;
    else
      this.toggle2 = !this.toggle2;
  }

}
