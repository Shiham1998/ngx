import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  profile = false;
  @Input() adminMode = false;
  getlogindata!: any;
  constructor(private tokenStorage: TokenStorageService,
    private route: Router,) { }

  ngOnInit(): void {
    this.getlogindata = this.tokenStorage.getUser();
    console.log(this.getlogindata.user_type);
    if (this.getlogindata.user_type == 'Admin') {
      this.adminMode = true;
    }
    else {
      this.adminMode = false;
    }
  }

  triggerClick(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.getElementById('profile') as HTMLElement;
    element.click();
    this.profile = true
  }
  
  //Logout function
  RemoveToken_user(): void {
    this.tokenStorage.signOut();
    this.route.navigate(['']);
  }
}
