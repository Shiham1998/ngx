import { Component,Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Masters } from 'src/app/models/Masters';
import { HoneybillService } from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {
  loading!:boolean;
  unitmasterlistdata:Masters[]=[];
  _type:string="U";
  getunitmasterId_: any;
  @Input() addMode = false;

  constructor(private honeybillservice:HoneybillService,
    private router:Router) { }

  ngOnInit(): void {
    this.getunitmasterlist();
  }

  Passidfromdeletemodal = (data: any) => {
    this.getunitmasterId_ = Object.assign(data);
    console.log(this.getunitmasterId_);
  }

  getunitmasterlist(){
    try{
      this.loading =true;
      setTimeout(async ()=>{
        (await this.honeybillservice.getunitmasterlist(this._type)).subscribe((unitmasterlist:Masters[])=>{
          this.unitmasterlistdata=[];
          this.unitmasterlistdata=unitmasterlist;
          this.loading=false;
        })
      },100) 
    }
    catch(e){
      console.log('getunitmaster error'+e);
    }
  }

  deleteunitmaster(id:string):void{
    try {
      this.honeybillservice.deleteunitmasteritem(id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
        this.NavigateToList();
    } catch (e) {
     console.log('error in delete unitmaster'+e);
    }
}
NavigateToList() {
  let currentUrl = this.router.url;
  let newUrl;
  this.router.navigateByUrl('/', {
    skipLocationChange: true,
    replaceUrl: true
  }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
}
