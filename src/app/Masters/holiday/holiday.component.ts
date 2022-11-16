import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Masters } from 'src/app/models/Masters';
import { HoneybillService } from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  loading!: boolean;
  HolidayListdata:Masters[]=[];
  getholidayId_: any;
  _type:string="H";
  @Input() addMode = false;

  constructor(private honeybillservice:HoneybillService,private router:Router,) { }

  ngOnInit(): void {
    this. getHolidaylist();
  }
  Passidfromdeletemodal = (data: any) => {
    this.getholidayId_ = Object.assign(data);
    console.log(this.getholidayId_);
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
  getHolidaylist(){
    try{
      this.loading =true;
      setTimeout(async ()=>{
        (await this.honeybillservice.getHolidayList(this._type)).subscribe((Holiday:Masters[])=>{
          this.HolidayListdata=[];
          this.HolidayListdata=Holiday;
          this.loading=false;
        })
      },100) 
    }
    catch(e){
      console.log('getHolidaylist error'+e);
    }
  }
  deleteHoliday(id:string):void{
    try {
      this.honeybillservice.deleteHolidayList(id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
       this.NavigateToList();
    } catch (e) {
     console.log('error in delete Holiday'+e);
    }
}
}
