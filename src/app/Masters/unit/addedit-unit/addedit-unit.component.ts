import { Component,Input, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Masters } from 'src/app/models/Masters';
import { HoneybillService } from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-addedit-unit',
  templateUrl: './addedit-unit.component.html',
  styleUrls: ['./addedit-unit.component.css']
})
export class AddeditUnitComponent implements OnInit {
  @Input() addMode = false;
  fg_unitname!: FormGroup;
  loading: boolean = false;
  unitlistdata:Masters[]=[];
  message!:string;
  _type:string="U";

  unitmaster:Masters={
    name: '',
    id: '',
    active: false,
    m_type: '',
    eventdate: ''
  }

  constructor(private honeybillservice:HoneybillService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    try{
      this.fg_unitname=new FormGroup({
        name:new FormControl('',[Validators.required, Validators.maxLength(20)])
    });

    if (this.route.snapshot.params["id"] == null) {
      this.addMode = true;
    }
  if (!this.addMode) {
      this. viewunitmasterId(this.route.snapshot.params["id"]);
    }
  }
  catch(e){
    console.log('unitmaster error-ngonit'+e);
    alert('unitmaster error-ngonit'+ e);
  }
}
viewunitmasterId(id: string): void {
  this.honeybillservice.getByunitId(id)
    .subscribe({
      next: (data) => {
       this.unitmaster=data;
       this.fg_unitname.controls['name'].setValue(this.unitmaster.name);
       console.log(data);
      },
      error: (e) => console.error(e)
    });
}

saveunitmaster()
{
  try{
    if(this.fg_unitname.valid){
      const data ={
        name:this.fg_unitname.controls['name'].value,
        m_type:this._type,
        active:true
      };
      console.log(data);
      this.honeybillservice.saveunitmaster(data).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(e)=>console.error(e)
      })
    }
    this.message="Successfully Saved Unit Name !"
    this.fg_unitname.controls['name'].setValue('');
    alert('Unit saved succesfully!!');
    this.navigateunitmaster();
  }
  catch(e){
    console.log('unit name error-save'+ e);
    alert('Unit Name Save Error Occurs-save'+e);
  }
}
navigateunitmaster():void{
  this.router.navigate(['/unit']);
}

updateUnitmasterlist(){
  try{
    if(this.fg_unitname.valid){
      this.unitmaster.name=this.fg_unitname.controls['name'].value;
      this.honeybillservice.updateUnitmasterid(this.unitmaster.id,this.unitmaster).subscribe({
        next:(res)=>{
          console.log(res);
          this.addMode=false;
        },
        error:(e)=>console.error(e)
      });
      alert(this.message='Unit Updated successfully!! ');
    }
    this.navigateunitmaster();
  }
  catch(e){
    
  }
}

}
