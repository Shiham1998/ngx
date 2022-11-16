import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Supplier } from 'src/app/models/supplier';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { countrydata } from 'src/assets/_outlet-json/country';
import { statedata } from 'src/assets/_outlet-json/state';
import { bankdata } from 'src/assets/_outlet-json/bank';
@Component({
  selector: 'app-addedit-supplier',
  templateUrl: './addedit-supplier.component.html',
  styleUrls: ['./addedit-supplier.component.css']
})
export class AddeditSupplierComponent implements OnInit {
  addMode!: boolean;
  fg_supplierdetails!:FormGroup;

  supplierlist:Supplier={
    id: '',
    company_name: '',
    address: '',
    city: '',
    state: '',
    pincode: 0,
    country: '',
    email: '',
    phoneno: '',
    bank_name: '',
    bank_accno: '',
    IFSC_code: '',
    panno: '',
    GSTIN: '',
    tax_state: '',
    openingbal: '',
    Type: '',
    contactperson: '',
    contactno: '',
    remarknote: '',
    active: false,
  
  }

 

  constructor(private honeybillservice:HoneybillService,private route: ActivatedRoute,private router: Router) { }
  countryList!: any[];
  stateList!: any[];
  bankList!:any[];
  ngOnInit(): void {

    this.stateList=statedata;
    this.countryList=countrydata;
    this.bankList=bankdata;
    try{
      this.fg_supplierdetails=new FormGroup({
        company_name:  new FormControl(''),
        address:  new FormControl(''),
        city:  new FormControl(''),
        state:  new FormControl(''),
        pincode:   new FormControl(''),
        country:  new FormControl(''),
        email:  new FormControl(''),
        phoneno:  new FormControl(''),
        bank_name:  new FormControl(''),
        bank_accno:   new FormControl(''),
        IFSC_code:  new FormControl(''),
        panno:  new FormControl(''),
        GSTIN:   new FormControl(''),
        tax_state:  new FormControl(''),
        openingbal:  new FormControl(''),
        Type:  new FormControl(''),
        contactperson:  new FormControl(''),
        contactno:  new FormControl(''),
        remarknote:  new FormControl(''),
      });
        if(this.route.snapshot.params["id"]==null){
          this.addMode=true;
        }
        if(!this.addMode){
        this.editsupplier(this.route.snapshot.params["id"]);
        }
    }catch(e){
      console.log('client error-ngonit'+e);
      alert('client error-ngonit'+ e);
    }
  }
  numberOnly(event:any): boolean {
    const charCode = event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  
  Savesupplier(){
    try{
      if(this.fg_supplierdetails.valid){
        const data={
          company_name:  this.fg_supplierdetails.controls['company_name'].value,
          address :this.fg_supplierdetails.controls['address'].value,
        city:  this.fg_supplierdetails.controls['city'].value,
        state: this.fg_supplierdetails.controls['state'].value,
        pincode:this.fg_supplierdetails.controls['pincode'].value,
        country:  this.fg_supplierdetails.controls['country'].value,
        email: this.fg_supplierdetails.controls['email'].value,
        phoneno: this.fg_supplierdetails.controls['phoneno'].value,
        bank_name: this.fg_supplierdetails.controls['bank_name'].value,
        bank_accno: this.fg_supplierdetails.controls['bank_accno'].value,
        IFSC_code: this.fg_supplierdetails.controls['IFSC_code'].value,
        panno: this.fg_supplierdetails.controls['panno'].value,
        GSTIN:this.fg_supplierdetails.controls['GSTIN'].value,
        tax_state: this.fg_supplierdetails.controls['tax_state'].value,
        openingbal: this.fg_supplierdetails.controls['openingbal'].value,
        Type: this.fg_supplierdetails.controls[ 'Type'].value,
        contactperson: this.fg_supplierdetails.controls['contactperson'].value,
        contactno :this.fg_supplierdetails.controls['contactno'].value,
       
        remarknote: this.fg_supplierdetails.controls['remarknote'].value,
        active:true 
         
      };
      this.honeybillservice.SaveSupplier(data).subscribe({
        next:(res)=>{
          console.log(res);
          this.addMode = true;
        },
        error:(e)=>console.error(e)
       });
      }
      this.NavigateToSupplier();
    }
    catch(e){
      console.log('Error in saveclient'+ e);
      alert('Error in saveclient'+ e);
    }
   }
  
   NavigateToSupplier(){
    this.router.navigate(['/supplier']);
  }

  editsupplier(id:string):void{
   this.honeybillservice.getSupplierById(id).subscribe({
    next:(data)=>{
      this.supplierlist=data;
      this.fg_supplierdetails.controls['company_name'].setValue(this.supplierlist.company_name);
      this.fg_supplierdetails.controls['address'].setValue(this.supplierlist.address);
      this.fg_supplierdetails.controls['city'].setValue(this.supplierlist.city);
      this.fg_supplierdetails.controls['state'].setValue(this.supplierlist.state);
      this.fg_supplierdetails.controls['pincode'].setValue(this.supplierlist.pincode);
      this.fg_supplierdetails.controls['country'].setValue(this.supplierlist.country);
      this.fg_supplierdetails.controls['email'].setValue(this.supplierlist. email);
      this.fg_supplierdetails.controls['phoneno'].setValue(this.supplierlist.phoneno);
      this.fg_supplierdetails.controls['bank_name'].setValue(this.supplierlist.bank_name);
      this.fg_supplierdetails.controls['bank_accno'].setValue(this.supplierlist.bank_accno);
      this.fg_supplierdetails.controls['IFSC_code'].setValue(this.supplierlist.IFSC_code);
      this.fg_supplierdetails.controls['panno'].setValue(this.supplierlist.panno);
      this.fg_supplierdetails.controls['GSTIN'].setValue(this.supplierlist.GSTIN);
      this.fg_supplierdetails.controls['tax_state'].setValue(this.supplierlist.tax_state);
      this.fg_supplierdetails.controls['openingbal'].setValue(this.supplierlist.openingbal);
      this.fg_supplierdetails.controls['Type'].setValue(this.supplierlist.Type);
      this.fg_supplierdetails.controls['contactperson'].setValue(this.supplierlist.contactperson);
      this.fg_supplierdetails.controls['contactno'].setValue(this.supplierlist.contactno);
      this.fg_supplierdetails.controls['remarknote'].setValue(this.supplierlist.remarknote);
      console.log(data);
    },
    error:(e)=>console.error(e)
   });
  }

  checkCheckBoxvalue(event: { checked: any; },no:any){
    console.log(event.checked);
    
    console.log(no);
    var a = document.getElementById('date1') as HTMLInputElement;
    var b = document.getElementById('date2') as HTMLInputElement;
     switch(no){
      case 1 :
        if(event.checked==true&&no==1){
          a.disabled=false; 
        }else{
          a.disabled=true;
          a.value="";
        }
      break;
      case 2 :
        if(event.checked==true&&no==2){
          b.disabled=false; 
        }else{
          b.disabled=true;
          b.value="";
        }
      break;
    }
  } 
  UpdateSupplierByid(){
    try{
      if(this.fg_supplierdetails.valid){
        this.supplierlist.company_name=this.fg_supplierdetails.controls['company_name'].value;
        this.supplierlist.address=this.fg_supplierdetails.controls['address'].value;
        this.supplierlist.city=this.fg_supplierdetails.controls['city'].value;
        this.supplierlist.state=this.fg_supplierdetails.controls['state'].value;
        this.supplierlist.pincode=this.fg_supplierdetails.controls['pincode'].value;
        this.supplierlist.country=this.fg_supplierdetails.controls['country'].value;
        this.supplierlist.email=this.fg_supplierdetails.controls['email'].value;
        this.supplierlist.phoneno=this.fg_supplierdetails.controls['phoneno'].value;
        this.supplierlist.bank_name=this.fg_supplierdetails.controls['bank_name'].value;
        this.supplierlist.bank_accno=this.fg_supplierdetails.controls['bank_accno'].value;
        this.supplierlist.IFSC_code=this.fg_supplierdetails.controls['IFSC_code'].value;
        this.supplierlist.panno=this.fg_supplierdetails.controls['panno'].value;
        this.supplierlist.GSTIN=this.fg_supplierdetails.controls['GSTIN'].value;
        this.supplierlist.tax_state=this.fg_supplierdetails.controls['tax_state'].value;
        this.supplierlist.openingbal=this.fg_supplierdetails.controls['openingbal'].value;
        this.supplierlist.Type=this.fg_supplierdetails.controls['Type'].value;
        this.supplierlist.contactperson=this.fg_supplierdetails.controls['contactperson'].value;
        this.supplierlist.contactno=this.fg_supplierdetails.controls['contactno'].value;
        this.supplierlist.remarknote=this.fg_supplierdetails.controls['remarknote'].value;   
        this.honeybillservice.UpdateSupplierList(this.supplierlist.id,this.supplierlist).subscribe({
          next:(res)=>{
            console.log(res);
            this.addMode=false;
          },
          error:(e)=>console.error(e)
        });
        alert('Supplier Updated successfully!! ');
      }
      this.NavigateToSupplier();
    }
    catch(e){
      console.log('error in update client information'+e);
      alert('error in update client information'+e);
    }
  }

}
