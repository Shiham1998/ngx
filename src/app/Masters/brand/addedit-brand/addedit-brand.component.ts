import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Masters } from 'src/app/models/Masters';
import { HoneybillService } from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './addedit-brand.component.html',
  styleUrls: ['./addedit-brand.component.css']
})
export class AddEditBrandComponent implements OnInit {
  @Input() addMode = false;
  fg_brandname!: FormGroup;
  loading: boolean = false;
  brandmasterlistdata:Masters[]=[];
  message!:string;
  _type:string="B";
  
  brandmaster:Masters={
    name: '',
    id: '',
    active: false,
    m_type: '',
    eventdate: ''
  }
  constructor(private honeybillservice:HoneybillService,private route: ActivatedRoute,private router: Router,) { }

  ngOnInit(): void {
    try{
      this.fg_brandname=new FormGroup({
        name:new FormControl('')
    });
   
    if (this.route.snapshot.params["id"] == null) {
      this.addMode = true;
    }
    if (!this.addMode) {
      this. viewbrandmasterId(this.route.snapshot.params["id"]);
    }
   }
    catch(e){
      console.log('brandmaster error-ngonit'+e);
      alert('brandmaster error-ngonit'+ e);
    }
  }
  viewbrandmasterId(id: string): void {
    this.honeybillservice.getByBrandId(id)
      .subscribe({
        next: (data) => {
         this.brandmaster=data;
         this.fg_brandname.controls['name'].setValue(this.brandmaster.name);
         console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  savebrandmaster()
  {
    try{
      if(this.fg_brandname.valid){
        const data ={
          name:this.fg_brandname.controls['name'].value,
          m_type:this._type,
          active:true
        };
        console.log(data);
        this.honeybillservice.savebrandmaster(data).subscribe({
          next:(res)=>{
            console.log(res);
          },
          error:(e)=>console.error(e)
        })
      }
      this.message="Successfully Saved Brand Name !"
      this.fg_brandname.controls['name'].setValue('');
      alert('Brandmaster saved succesfully!!');
      this.navigatebrandmaster();
    }
    catch(e){
      console.log('brand name error-save'+ e);
      alert('Brand Name Save Error Occurs-save'+e);
    }
  }
  navigatebrandmaster():void{
    this.router.navigate(['/brand']);
  }
  updateBrandmasterlist(){
    try{
      if(this.fg_brandname.valid){
        this.brandmaster.name=this.fg_brandname.controls['name'].value;
        this.honeybillservice.updateBrandmasterid(this.brandmaster.id,this.brandmaster).subscribe({
          next:(res)=>{
            console.log(res);
            this.addMode=false;
          },
          error:(e)=>console.error(e)
        });
        alert(this.message='Brand Master Updated successfully!! ');
      }
      this.navigatebrandmaster();
    }
    catch(e){
      
    }
  }
}
