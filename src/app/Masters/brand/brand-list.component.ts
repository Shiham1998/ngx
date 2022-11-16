import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Masters } from 'src/app/models/Masters';
import { HoneybillService } from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  loading!: boolean;
  brandmasterlistdata:Masters[]=[];
  _type:string="B";
  getbrandmasterId_: any;
  @Input() addMode = false;

constructor(private honeybillservice:HoneybillService,private router:Router) { }

  ngOnInit(): void {
  this.getbrandmasterlist();
}

Passidfromdeletemodal = (data: any) => {
  this.getbrandmasterId_ = Object.assign(data);
  console.log(this.getbrandmasterId_);
}
  getbrandmasterlist(){
    try{
      this.loading =true;
      setTimeout(async ()=>{
        (await this.honeybillservice.getbrandmasterlist(this._type)).subscribe((brandmasterlist:Masters[])=>{
          this.brandmasterlistdata=[];
          this.brandmasterlistdata=brandmasterlist;
          this.loading=false;
        })
      },100) 
    }
    catch(e){
      console.log('getbrandmaster error'+e);
    }
  }
  deletebrandmaster(id:string):void{
    try {
      this.honeybillservice.deletebrandmasteritem(id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      this.NavigateToList();
    } catch (e) {
     console.log('error in delete brandmaster'+e);
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
