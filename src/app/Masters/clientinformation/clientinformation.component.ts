import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clients } from 'src/app/models/client';
import { HoneybillService } from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-clientinformation',
  templateUrl: './clientinformation.component.html',
  styleUrls: ['./clientinformation.component.css']
})
export class ClientinformationComponent implements OnInit {
  loading!:boolean;
  clientlistdata:Clients[]=[];
  getclientId_!:any;
  
  constructor(private honeybillservice:HoneybillService,private router:Router,) { }

  ngOnInit(): void {
    this.getClientList();
  }
  Passid= (data: any) => {
    this.getclientId_ = Object.assign(data);
    console.log(this.getclientId_);
   }
  getClientList(){
    try{
      this.loading=true;
      setTimeout(async()=>{
        (await this.honeybillservice.getClientList()).subscribe((clientlist:Clients[])=>{
          this.clientlistdata=[];
          this.clientlistdata=clientlist;
          this.loading=false;
        })
      },100)
    }
    catch(e){
      console.log('Error in getClientList'+ e);
    }
  }
  deleteclient(id:string){
    try {
      this.honeybillservice.deleteClientList(id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      this.NavigateToList();
    } catch (e) {
     console.log('error in delete client'+e);
    }
  }
  NavigateToList() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {
      skipLocationChange: true,
      replaceUrl: true
    }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
