import { Component, Input, OnInit } from '@angular/core';
import { Hsn } from 'src/app/models/hsn';
import { FormControl, FormGroup } from '@angular/forms';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addedit-hsn',
  templateUrl: './addedit-hsn.component.html',
  styleUrls: ['./addedit-hsn.component.css']
})
export class AddeditHsnComponent implements OnInit {
  @Input() addMode = false;
  fg_hsnname!: FormGroup;
  loading: boolean = false;
  hsnmasterlistdata:Hsn[]=[];
  message!:string;
  mode!:number;
  gst!:number;

  hsnmaster:Hsn={
    id: '',
    Code: 0,
    HSN_Code: '',
    HSN_Name: '',
    Description: '',
    HSN_GST: 0,
    HSN_SGST: 0,
    HSN_CGST: 0,
    HSN_IGST: 0,
    active: false,
  };
   

  constructor(private honeybillservice:HoneybillService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
        this.fg_hsnname=new FormGroup({
        Code:new FormControl(''),
        HSN_Code:new FormControl(''),
        HSN_Name:new FormControl(''),
        Description:new FormControl(''),
        HSN_GST:new FormControl(''),
        HSN_SGST:new FormControl(''),
        HSN_CGST:new FormControl(''),
        HSN_IGST:new FormControl(''),
    });
    if (this.route.snapshot.params["id"] == null) {
      this.addMode = true;
    }
    if (!this.addMode) {
      this.getHsnId(this.route.snapshot.params["id"]);
    }
    
  }
  

  //  ***************************************** (Add New HsnData to Database) ***************************************
  savehsndata()
  {
    try{
      if (this.fg_hsnname.valid) {
      const data = {
        Code: this.fg_hsnname.controls['Code'].value,
        HSN_Code: this.fg_hsnname.controls['HSN_Code'].value,
        HSN_Name: this.fg_hsnname.controls['HSN_Name'].value,
        Description: this.fg_hsnname.controls['Description'].value,
        HSN_GST: this.fg_hsnname.controls['HSN_GST'].value,
        HSN_SGST: this.fg_hsnname.controls['HSN_SGST'].value,
        HSN_CGST: this.fg_hsnname.controls['HSN_CGST'].value,
        HSN_IGST: this.fg_hsnname.controls['HSN_IGST'].value,
      };
      console.log(data);
      this.honeybillservice.savehsnmaster(data).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      }
      this.message="Successfully Saved Hsn Name !"
      this.fg_hsnname.controls['Code'].setValue('');
      this.fg_hsnname.controls['HSN_Code'].setValue('');
      this.fg_hsnname.controls['HSN_Name'].setValue('');
      this.fg_hsnname.controls['Description'].setValue('');
      this.fg_hsnname.controls['HSN_GST'].setValue('');
      this.fg_hsnname.controls['HSN_SGST'].setValue('');
      this.fg_hsnname.controls['HSN_CGST'].setValue('');
      this.fg_hsnname.controls['HSN_IGST'].setValue('');
      alert('HsnMaster Saved successfully..!!');
      this.navigatehsnmaster();
    }
    catch(e){
      console.log('hsn name error-save'+ e);
      alert('Hsn Name Save Error Occurs-save'+e);
    }
  } 
  navigatehsnmaster():void{
    this.router.navigate(['/hsn']);
  }

  //  ***************************************** (Update Data ) *********************************************************************
  updatehsndata(): void {
    try {
      if (this.fg_hsnname.valid) {
          this.hsnmaster.Code = this.fg_hsnname.controls['Code'].value,
          this.hsnmaster.HSN_Code = this.fg_hsnname.controls['HSN_Code'].value,
          this.hsnmaster.HSN_Name = this.fg_hsnname.controls['HSN_Name'].value,
          this.hsnmaster.Description = this.fg_hsnname.controls['Description'].value,
          this.hsnmaster.HSN_GST = this.fg_hsnname.controls['HSN_GST'].value,
          this.hsnmaster.HSN_SGST = this.fg_hsnname.controls['HSN_SGST'].value,
          this.hsnmaster.HSN_CGST = this.fg_hsnname.controls['HSN_CGST'].value,
          this.hsnmaster.HSN_IGST = this.fg_hsnname.controls['HSN_IGST'].value,
          this.honeybillservice.updateHsnmasterid(this.hsnmaster.id, this.hsnmaster).subscribe({
              next: (res) => {
                console.log(res);
                this.addMode = false;
              },
              error: (e) => console.error(e)
            });
        alert(this.message = 'Hsn Master edited successfully..!!');
      }
      this.navigatehsnmaster();
    }
      catch(e){
    }
  }

  getHsnId(id: string): void {
    this.honeybillservice.getByhsnId(id)
      .subscribe({
        next: (data) => {
          this.hsnmaster = data;
          this.fg_hsnname.controls['Code'].setValue(this.hsnmaster.Code);
          this.fg_hsnname.controls['HSN_Code'].setValue(this.hsnmaster.HSN_Code);
          this.fg_hsnname.controls['HSN_Name'].setValue(this.hsnmaster.HSN_Name);
          this.fg_hsnname.controls['Description'].setValue(this.hsnmaster.Description);
          this.fg_hsnname.controls['HSN_GST'].setValue(this.hsnmaster.HSN_GST);
          this.fg_hsnname.controls['HSN_SGST'].setValue(this.hsnmaster.HSN_SGST);
          this.fg_hsnname.controls['HSN_CGST'].setValue(this.hsnmaster.HSN_CGST);
          this.fg_hsnname.controls['HSN_IGST'].setValue(this.hsnmaster.HSN_IGST);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  gstCalc(event: any):void{
    var gst= event.target.value/ 2;
    this.fg_hsnname.controls['HSN_SGST'].setValue(gst);
    this.fg_hsnname.controls['HSN_CGST'].setValue(gst); 
  }

  number(event:any){
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressAlphanumeric(event:any){
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z 0-9 s]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  
}
