import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { Masters } from 'src/app/models/Masters';
@Component({
  selector: 'app-addedit-department',
  templateUrl: './addedit-department.component.html',
  styleUrls: ['./addedit-department.component.css']
})
export class AddeditDepartmentComponent implements OnInit {
  @Input()addMode=false;
  loading:boolean=false;
  fg_department!:FormGroup;
   _type:string="DT";
   Departmentlistdata:Masters[]=[];
   department:Masters={
     name: '',
     id: '',
     active: false,
     m_type: '',
     eventdate: ''
   }
  
  constructor(private honeybillservice:HoneybillService,private route: ActivatedRoute,private router: Router) { }
 
  ngOnInit(): void {
    try{
      this.fg_department=new FormGroup({
        name:new FormControl('')
      });
      
      if(this.route.snapshot.params["id"] == null){
        this.addMode=true;
      }
      if (!this.addMode) {
        this.EditDepartment(this.route.snapshot.params["id"]);
      }
    }
    catch(e){
      console.log('ng-onit Error Department '+e);
      alert('ng-onit Error Department '+e);
    }
    
  }
  NavigateToDepartment(){
    this.router.navigate(['/department']);
  }
 
  SaveDepartment(){
    try{
      if(this.fg_department.valid){
        const data={
          name:this.fg_department.controls['name'].value,
          m_type:this._type,
          active:true
        };
        this.honeybillservice.SaveDepartment(data).subscribe({
          next:(res)=>{
            console.log(res);
          },
          error:(e)=>console.error(e)
        })
      }
      
      this.fg_department.controls['name'].setValue('');
      alert('Department saved succesfully!!');
      this.NavigateToDepartment();
    }
    catch(e){
      console.log('Error in SaveDepartment '+ e);
      alert('Error in SaveDepartment '+ e);
    }
  }
  EditDepartment(id:string):void{
    this.honeybillservice.getdeptByid(id).subscribe({
      next:(data)=>{
        this.department=data;
        this.fg_department.controls['name'].setValue(this.department.name);
        console.log(data);
      },
      error:(e)=>console.error(e)
    });
  }
  UpdateDepartmentList(){
    try{
      if(this.fg_department.valid){
        this.department.name=this.fg_department.controls['name'].value;
        this.honeybillservice.updateBrandmasterid(this.department.id,this.department).subscribe({
          next:(res)=>{
            console.log(res);
            this.addMode=false;
          },
          error:(e)=>console.error(e)
        });
        alert('Department Updated successfully!! ');
      }
      this. NavigateToDepartment();
    }
    catch(e){
      
    }
  }
}
