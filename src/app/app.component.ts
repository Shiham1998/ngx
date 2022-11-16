import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  data!:any;
  constructor( 
    private tokenStorage: TokenStorageService,
    private route:Router) { }
  title = 'AMS';
 
  
  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event: Event) {
  //     this.tokenStorage.signOut();
  //     alert('window is closed')
  //  }

   ngOnInit(): void {
    this.data= this.tokenStorage.getUser(); 
    if(this.data.id == undefined)
    this.route.navigate(['']);
    
   }
}
