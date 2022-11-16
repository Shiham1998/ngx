import { Component,Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hsn } from 'src/app/models/hsn';



@Component({
  selector: 'app-addedit-group',
  templateUrl: './addedit-group.component.html',
  styleUrls: ['./addedit-group.component.css']
})
export class AddeditGroupComponent implements OnInit {
  @Input() addMode = false;
  fg_groupname!: FormGroup;
  loading: boolean = false;
  groupmasterlistdata:Group[]=[];
  message!:string;
  hsnmasterlistdata!:Hsn[];
  ary_getGstValues!:Hsn[];
  selectedHsnCode: any;

  groupmaster:Group={
    group_name: '',
    hsnsac_code: '',
    id: '',
    CGST: 0,
    Cess: 0,
    SGST: 0,
    IGST: 0,
    active: false,
    HSN_CGST: 0
  }


  constructor(private honeybillservice:HoneybillService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    try{
      this.fg_groupname=new FormGroup({
        group_name:new FormControl('',[Validators.required, Validators.maxLength(20)]),
        hsnsac_code:new FormControl(''),
        CGST:new FormControl(''),
        Cess:new FormControl(''),
        SGST:new FormControl(''),
        IGST:new FormControl(''),
    });
   
    if (this.route.snapshot.params["id"] == null) {
      this.addMode = true;
    }
  if (!this.addMode) {
      this. viewgroupmasterId(this.route.snapshot.params["id"]);
    }
  }
    catch(e){
      console.log('groupmaster error-ngonit'+e);
      alert('groupmaster error-ngonit'+ e);
    }
    this.gethsnlists();
  }

  viewgroupmasterId(id: string): void {
    this.honeybillservice.getBygroupId(id)
      .subscribe({
        next: (data) => {
         this.groupmaster=data;
         this.fg_groupname.controls['group_name'].setValue(this.groupmaster.group_name);
         this.fg_groupname.controls['hsnsac_code'].setValue(this.groupmaster.hsnsac_code);
         this.fg_groupname.controls['CGST'].setValue(this.groupmaster.CGST);
         this.fg_groupname.controls['Cess'].setValue(this.groupmaster.Cess);
         this.fg_groupname.controls['SGST'].setValue(this.groupmaster.SGST);
         this.fg_groupname.controls['IGST'].setValue(this.groupmaster.IGST);
         console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  savegroupmaster()
  {
    try{
      if(this.fg_groupname.valid){
        const data ={
          group_name:this.fg_groupname.controls['group_name'].value,
          hsnsac_code:this.fg_groupname.controls['hsnsac_code'].value,
          CGST:parseInt(this.fg_groupname.controls['CGST'].value),
          Cess:parseInt(this.fg_groupname.controls['Cess'].value),
          SGST:parseInt(this.fg_groupname.controls['SGST'].value),
          IGST:parseInt(this.fg_groupname.controls['IGST'].value),

        };
        console.log(data);
        this.honeybillservice.savegroupmaster(data).subscribe({
          next:(res)=>{
            console.log(res);
           },
          error:(e)=>console.error(e)
        })
      }
      this.message="Successfully Saved Group Name !"
      this.fg_groupname.controls['group_name'].setValue('');
      this.fg_groupname.controls['hsnsac_code'].setValue('');
      this.fg_groupname.controls['CGST'].setValue('');  
      this.fg_groupname.controls['Cess'].setValue('');
      this.fg_groupname.controls['SGST'].setValue('');
      this.fg_groupname.controls['IGST'].setValue('');
      alert('Groupmaster saved succesfully!!');
      this.navigategroupmaster();
    }
    catch(e){
      console.log('group name error-save'+ e);
      alert('Group Name Save Error Occurs-save'+e);
    }
  }
  navigategroupmaster():void{
    this.router.navigate(['/group']);
  }

  updateGroupmasterlist(){
    try{
      if(this.fg_groupname.valid){
        this.groupmaster.group_name=this.fg_groupname.controls['group_name'].value;
        this.groupmaster.hsnsac_code=this.fg_groupname.controls['hsnsac_code'].value;
        this.groupmaster.CGST=this.fg_groupname.controls['CGST'].value;
        this.groupmaster.Cess=this.fg_groupname.controls['Cess'].value;
        this.groupmaster.SGST=this.fg_groupname.controls['SGST'].value;
        this.groupmaster.IGST=this.fg_groupname.controls['IGST'].value;
        this.honeybillservice.updateGroupmasterid(this.groupmaster.id,this.groupmaster).subscribe({
          next:(res)=>{
            console.log(res);
            this.addMode=false;
          },
          error:(e)=>console.error(e)
        });
        alert(this.message='Group Master Updated successfully!! ');
      }
      this.navigategroupmaster();
    }
    catch(e){
      
    }
  }
  gethsnlists() {
    try {
      this.loading = true;
      setTimeout(async () => {
        (await this.honeybillservice.gethsnmasterlist()).subscribe((hsnmaster: Hsn[]) => {
          this.hsnmasterlistdata = [];

          this.hsnmasterlistdata = hsnmaster;
          console.log(this.hsnmasterlistdata)
          this.loading = false;
        })
      }, 500);
    } catch (e) {
      throw e
    }
  }
  selectHsnMasterid() {
    // this.selectedHsnCode = event.target.value;
    console.log(this.selectedHsnCode) ;
          this.ary_getGstValues = this.hsnmasterlistdata.filter(
            m => (m.HSN_Name == this.fg_groupname.controls['hsnsac_code'].value)
          );
          console.log(this.ary_getGstValues);
          this.fg_groupname.controls['CGST'].setValue(this.ary_getGstValues[0].HSN_CGST);
          this.fg_groupname.controls['SGST'].setValue(this.ary_getGstValues[0].HSN_SGST);
          this.fg_groupname.controls['IGST'].setValue(this.ary_getGstValues[0].HSN_IGST);
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