import { Component, Input, OnInit } from '@angular/core';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { Masters} from 'src/app/models/Masters';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addedit-holiday',
  templateUrl: './addedit-holiday.component.html',
  styleUrls: ['./addedit-holiday.component.css']
})
export class AddeditHolidayComponent implements OnInit {
 @Input()addMode=false;
 loading:boolean=false;
 fg_holiday!:FormGroup;
 _type:string="H";
 holidaylist:Masters={
   name: '',
   id: '',
   active: false,
   m_type: '',
   eventdate: ''
 }
 holidaylistdata:Masters[]=[];
  constructor(private honeybillservice:HoneybillService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    try{
      this.fg_holiday=new FormGroup({
        name:new FormControl(''),
        eventdate:new FormControl('')
      })
      if(this.route.snapshot.params["id"] == null){
        this.addMode=true;
      }
      if (!this.addMode) {
        this.EditHoliday(this.route.snapshot.params["id"]);
      }
    }
    catch(e){
    console.log('Error in ng-onit'+e)
  }
  }
 NavigateToHoliday(){
  this.router.navigate(['/holiday']);
 }

 SaveHoliday(){
  try{
    if(this.fg_holiday.valid){
      const data={
        name:this.fg_holiday.controls['name'].value,
        eventdate:this.fg_holiday.controls['eventdate'].value,
        active:true,
        m_type:this._type
      }
      this.honeybillservice.SaveHoliday(data).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(e)=>console.error(e)
      })
    }
    this.fg_holiday.controls['name'].setValue('');
    this.fg_holiday.controls['eventdate'].setValue('');
    alert('Holiday Saved Successfully!!');
    this.NavigateToHoliday();
  }catch(e){
    console.log('Error in SaveHoliday '+ e);
    alert('Error in SaveHoliday '+ e);
  }
 }
 
 EditHoliday(id:string):void{
  this.honeybillservice.getHolidayByid(id).subscribe({
    next:(data)=>{
      this.holidaylist=data;
      this.fg_holiday.controls['name'].setValue(this.holidaylist.name);
      this.fg_holiday.controls['eventdate'].setValue(this.holidaylist.eventdate);
      console.log(data);
    },
    error:(e)=>console.error(e)
  });
}
UpdateDepartmentList(){
  try{
    if(this.fg_holiday.valid){
      this.holidaylist.name=this.fg_holiday.controls['name'].value;
      this.holidaylist.eventdate=this.fg_holiday.controls['eventdate'].value;
      this.honeybillservice.UpdateHolidayList(this.holidaylist.id,this.holidaylist).subscribe({
        next:(res)=>{
          console.log(res);
          this.addMode=false;
        },
        error:(e)=>console.error(e)
      });
      alert('Department Updated successfully!! ');
    }
    this. NavigateToHoliday();
  }
  catch(e){
    
  }
}
}
