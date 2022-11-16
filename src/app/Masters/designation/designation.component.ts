import { Component, Input, OnInit } from '@angular/core';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { Router } from '@angular/router';
import { Masters } from 'src/app/models/Masters';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  loading!:boolean;
  designationlistdata:Masters[]=[];
  getdesignationId_: any;
  @Input() addMode=false;
  _type: string="D";

  constructor(private honeybillService:HoneybillService,
    private router:Router) { }

  ngOnInit(): void {
    this.getdesignationlist();
  }

  Passidfromdeletemodal = (data: any) => {
    this.getdesignationId_ = Object.assign(data);
    console.log(this.getdesignationId_);
  }

  getdesignationlist(){
    try{
      this.loading =true;
      setTimeout(async ()=>{
        (await this.honeybillService.getdesignationlist(this._type)).subscribe((designationlist:Masters[])=>{
          this.designationlistdata=[];
          this.designationlistdata=designationlist;
          this.loading=false;
        })
      },100) 
    }
    catch(e){
      console.log('getdesignation error'+e)
    }
  }

 deletedesignation(id:string):void{
    try {
      this.honeybillService.deletedesignationitem(id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
        // this. getdesignationlist();
        this.NavigateToList();
    } catch (e) {
     console.log('error in delete designation'+e);
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
