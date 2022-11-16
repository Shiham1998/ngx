import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
 import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data!:any;
  userid!: any;
  @Input() addMode = true;
  duserid:any;
  userdata!: User[];
  profiledata!: User[];
  getpwd!:any;

  message!:any;
  getpassword!: string | any;
  user: User = {
    id: '',
    user_first_name: '',
    user_last_name: '',
    user_email: '',
    user_pwd: '',
    user_mobile: '',
    user_address: '',
    user_type:'',
  };
  first_name: any;
  last_name:any;
  email:any;
  pwd:any;
  mobile:any;
  address:any;
  usertype:any;

  addUser = new FormGroup({
    user_first_name: new FormControl(''),
    user_last_name: new FormControl(''),
    user_pwd: new FormControl(''),
    user_email: new FormControl(''),
    user_mobile: new FormControl(''),
    user_address: new FormControl(''),
    user_confirmpwd: new FormControl('')
  },
);
  
  constructor(private authservice: AuthService,
    private route: Router,
    private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {
    this.data = this.tokenStorage.getUser();
    console.log(this.data);
    this.userid = this.data.id;
    console.log(this.userid)

    if (this.userid) {
      this.addMode = false;
      this.getUserList();
    }
    if (!this.userid) {
      this.addMode = true;
    }
    
   
  }
  //  ***************************************** Add New Data to Database) ***************************************
 
  saveUser(): void {
  try{
      if (this.addUser.valid) {
      this.getpassword = this.addUser.controls.user_pwd.value;
      const salt = bcrypt.genSaltSync(10);
      this.getpassword = bcrypt.hashSync(this.getpassword, 10);
      this.first_name = this.addUser.controls.user_first_name.value,
      this.last_name = this.addUser.controls.user_last_name.value,
      this.email = this.addUser.controls.user_email.value,
      this.pwd = this.getpassword,
      this.mobile = this.addUser.controls.user_mobile.value,
      this.address = this.addUser.controls.user_address.value,
      this.usertype = 'User'
      this.authservice.User(this.first_name,this.last_name, this.email, this.pwd, this.mobile,this.address,this.usertype)
        .subscribe({
          next: (res) => {
            console.log(res);
           
          },
          error: (e) => console.error(e)
        });
       this.Newsignup();
      this.message = 'Registration success..!!';
    } 
    else {
      return;
    }
    setTimeout(() => {
      this.route.navigate(['/login']);
   }, 2000);
  }
  catch(e){
    console.log(e);
    alert(e);
  }
  }

  Newsignup()
  {
    this.addUser.controls.user_first_name.setValue('');
    this.addUser.controls.user_last_name.setValue('');
    this.addUser.controls.user_email.setValue('');
    this.addUser.controls.user_pwd.setValue('');
    this.addUser.controls.user_mobile.setValue('');
    this.addUser.controls.user_address.setValue('');
    this.addUser.controls.user_confirmpwd.setValue('');
  
 }


 getUserList() {
  try{
    setTimeout(async () => {
      (await this.authservice.getUserList()).subscribe((user: User[]) => {
        this.userdata = [];
        this.userdata = user;
        this.profiledata = this.userdata.filter(x => x.id == this.userid);
        this.addUser.controls.user_first_name.setValue(this.profiledata[0].user_first_name);
        this.addUser.controls.user_last_name.setValue(this.profiledata[0].user_last_name);
       this.addUser.controls.user_email.setValue(this.profiledata[0].user_email);
        this.addUser.controls.user_mobile.setValue(this.profiledata[0].user_mobile);
        this.addUser.controls.user_pwd.setValue(this.profiledata[0].user_pwd);
        this.addUser.controls.user_address.setValue(this.profiledata[0].user_address);
        
      })
    }, 500);
  }
  catch(e)
  {
    console.log('register-getUserList' + e)
    alert('register-getUserList' + e)
  }

}

  //  ***************************************** Update Data ) ***************************************
  updateUser(): void {
    try{
      if (this.addUser.valid) {
        this.user.id = this.userid;
        this.user.user_first_name = this.addUser.controls.user_first_name.value;
        this.user.user_last_name = this.addUser.controls.user_last_name.value;
       this.user.user_pwd=this.addUser.controls.user_pwd.value;
        this.user.user_email = this.addUser.controls.user_email.value;
        this.user.user_mobile = this.addUser.controls.user_mobile.value;
        this.user.user_address = this.addUser.controls.user_address.value;
        this.authservice.updateUser(this.userid, this.user)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.addMode = false;
            },
            error: (e) => console.error(e)
          });
          this.Newsignup();
          this.message = 'Profile Edited..!!';
      }
      setTimeout(() => {
        this.route.navigate(['/layout']);
     }, 2000);
    }
    catch(e){
      console.log(e);
      alert(e);
    }
  }


   //  *****************************************  passing id to modal button) ***************************************
   Passidfromdeletemodal = (data: any) => {
    this.userid = Object.assign(data);
  }
    //  *****************************************   delete  particular machine detail ***************************************
    deleteUser(id: string): void {
      this.authservice.deleteUser(id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
         
        });
        this.Newsignup();
        this.message = 'Profile Deleted..!!';
        setTimeout(() => {
          this.route.navigate(['/login']);
       }, 2000);
    }

 redirectoModule(): void {
  this.route.navigate(['/login']);
}
}
