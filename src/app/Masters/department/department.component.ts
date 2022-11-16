import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Masters } from 'src/app/models/Masters';
import { HoneybillService } from 'src/app/services/honeybill.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  loading!: boolean;
  departmentlistdata:Masters[]=[];
  getdeptId_: any;
  _type:string="DT";
  @Input() addMode = false;

  constructor(private honeybillservice:HoneybillService,private router:Router,) { }

  ngOnInit(): void {
  this. getDepartmentlist();
  }
  Passidfromdeletemodal = (data: any) => {
    this.getdeptId_ = Object.assign(data);
    console.log(this.getdeptId_);
  }
  getDepartmentlist(){
    try{
      this.loading =true;
      setTimeout(async ()=>{
        (await this.honeybillservice.getDepartmentList(this._type)).subscribe((department:Masters[])=>{
          this.departmentlistdata=[];
          this.departmentlistdata=department;
          this.loading=false;
        })
      },100) 
    }
    catch(e){
      console.log('getDepartmentlist error'+e);
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
  deleteDepartment(id:string):void{
    try {
      this.honeybillservice.deletedeptitem(id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
       this.NavigateToList();
    } catch (e) {
     console.log('error in delete Department'+e);
    }
}
}
