import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clients } from 'src/app/models/client';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { countrydata } from 'src/assets/_outlet-json/country'; 
import { statedata } from 'src/assets/_outlet-json/state';

@Component({
  selector: 'app-addedit-client',
  templateUrl: './addedit-client.component.html',
  styleUrls: ['./addedit-client.component.css']
})
export class AddeditClientComponent implements OnInit {

  addMode!: boolean;
  fg_clientdetails!:FormGroup;

  clientlist:Clients={
    full_name: '',
    billing_address: '',
    city: '',
    state: '',
    pincode: 0,
    country: '',
    emailid: '',
    phoneno: '',
    contactno: '',
    panno: '',
    GSTin: '',
    Type: '',
    openingbalance: 0,
    doctype: '',
    docno: '',
    DOB: '',
    anniversary: '',
    creditallowed: '',
    creditlimit: 0,
    remarknote: '',
    active: false,
    id: '',
  }
 

  constructor(private honeybillservice:HoneybillService,private route: ActivatedRoute,private router: Router) { }

  countryList!: any[];
  stateList!: any[];

  ngOnInit(): void {
    
    this.stateList=statedata;
    this.countryList=countrydata;
    try{
      this.fg_clientdetails=new FormGroup({
        full_name:  new FormControl(''),
        billing_address:  new FormControl(''),
        city:  new FormControl(''),
        state:  new FormControl(''),
        pincode:   new FormControl(''),
        country:  new FormControl(''),
        emailid:  new FormControl(''),
        phoneno:  new FormControl(''),
        contactno:  new FormControl(''),
        panno:   new FormControl(''),
        GSTin:  new FormControl(''),
        Type:  new FormControl(''),
        openingbalance:   new FormControl(''),
        doctype:  new FormControl(''),
        docno:  new FormControl(''),
        DOB:  new FormControl(''),
        anniversary:  new FormControl(''),
        creditallowed:  new FormControl(''),
        creditlimit:  new FormControl(''),
        remarknote:  new FormControl(''),
      });
        if(this.route.snapshot.params["id"]==null){
          this.addMode=true;
        }
        if(!this.addMode){
        this.editclient(this.route.snapshot.params["id"]);
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
  
  Saveclient(){
    try{
      if(this.fg_clientdetails.valid){
        const data={
        full_name:  this.fg_clientdetails.controls['full_name'].value,
        billing_address: this.fg_clientdetails.controls['billing_address'].value,
        city:  this.fg_clientdetails.controls['city'].value,
        state: this.fg_clientdetails.controls['state'].value,
        pincode: parseInt(this.fg_clientdetails.controls['pincode'].value),
        country:  this.fg_clientdetails.controls['country'].value,
        emailid: this.fg_clientdetails.controls['emailid'].value,
        phoneno: this.fg_clientdetails.controls['phoneno'].value,
        contactno: this.fg_clientdetails.controls['contactno'].value,
        panno: this.fg_clientdetails.controls['panno'].value,
        GSTin: this.fg_clientdetails.controls['GSTin'].value,
        Type: this.fg_clientdetails.controls['Type'].value,
        openingbalance: parseInt(this.fg_clientdetails.controls['openingbalance'].value),
        doctype: this.fg_clientdetails.controls['doctype'].value,
        docno: this.fg_clientdetails.controls['docno'].value,
        DOB: this.fg_clientdetails.controls['DOB'].value,
        anniversary: this.fg_clientdetails.controls['anniversary'].value,
        creditallowed: this.fg_clientdetails.controls['creditallowed'].value,
        creditlimit:parseInt(this.fg_clientdetails.controls['creditlimit'].value),
        remarknote: this.fg_clientdetails.controls['remarknote'].value,
        active:true 
         
      };
      this.honeybillservice.SaveClient(data).subscribe({
        next:(res)=>{
          console.log(res);
          this.addMode = true;
        },
        error:(e)=>console.error(e)
       });
      }
      this.NavigateToClient();
    }
    catch(e){
      console.log('Error in saveclient'+ e);
      alert('Error in saveclient'+ e);
    }
   }
  
   NavigateToClient(){
    this.router.navigate(['/client']);
  }

  editclient(id:string):void{
   this.honeybillservice.getClientById(id).subscribe({
    next:(data)=>{
      this.clientlist=data;
      this.fg_clientdetails.controls['full_name'].setValue(this.clientlist.full_name);
      this.fg_clientdetails.controls['billing_address'].setValue(this.clientlist.billing_address);
      this.fg_clientdetails.controls['city'].setValue(this.clientlist.city);
      this.fg_clientdetails.controls['state'].setValue(this.clientlist.state);
      this.fg_clientdetails.controls['pincode'].setValue(this.clientlist.pincode);
      this.fg_clientdetails.controls['country'].setValue(this.clientlist.country);
      this.fg_clientdetails.controls['emailid'].setValue(this.clientlist.emailid);
      this.fg_clientdetails.controls['phoneno'].setValue(this.clientlist.phoneno);
      this.fg_clientdetails.controls['contactno'].setValue(this.clientlist.contactno);
      this.fg_clientdetails.controls['panno'].setValue(this.clientlist.panno);
      this.fg_clientdetails.controls['GSTin'].setValue(this.clientlist.GSTin);
      this.fg_clientdetails.controls['Type'].setValue(this.clientlist.Type);
      this.fg_clientdetails.controls['openingbalance'].setValue(this.clientlist.openingbalance);
      this.fg_clientdetails.controls['doctype'].setValue(this.clientlist.doctype);
      this.fg_clientdetails.controls['DOB'].setValue(this.clientlist.DOB);
      this.fg_clientdetails.controls['anniversary'].setValue(this.clientlist.anniversary);
      this.fg_clientdetails.controls['creditallowed'].setValue(this.clientlist.creditallowed);
      this.fg_clientdetails.controls['creditlimit'].setValue(this.clientlist.creditlimit);
      this.fg_clientdetails.controls['remarknote'].setValue(this.clientlist.remarknote);
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
  UpdateclientByid(){
    try{
      if(this.fg_clientdetails.valid){
        this.clientlist.full_name=this.fg_clientdetails.controls['full_name'].value;
        this.clientlist.billing_address=this.fg_clientdetails.controls['billing_address'].value;
        this.clientlist.city=this.fg_clientdetails.controls['city'].value;
        this.clientlist.state=this.fg_clientdetails.controls['state'].value;
        this.clientlist.pincode=this.fg_clientdetails.controls['pincode'].value;
        this.clientlist.country=this.fg_clientdetails.controls['country'].value;
        this.clientlist.emailid=this.fg_clientdetails.controls['emailid'].value;
        this.clientlist.phoneno=this.fg_clientdetails.controls['phoneno'].value;
        this.clientlist.contactno=this.fg_clientdetails.controls['contactno'].value;
        this.clientlist.panno=this.fg_clientdetails.controls['panno'].value;
        this.clientlist.GSTin=this.fg_clientdetails.controls['GSTin'].value;
        this.clientlist.Type=this.fg_clientdetails.controls['Type'].value;
        this.clientlist.openingbalance=this.fg_clientdetails.controls['openingbalance'].value;
        this.clientlist.doctype=this.fg_clientdetails.controls['doctype'].value;
        this.clientlist.DOB=this.fg_clientdetails.controls['DOB'].value;
        this.clientlist.anniversary=this.fg_clientdetails.controls['anniversary'].value;
        this.clientlist.creditallowed=this.fg_clientdetails.controls['creditallowed'].value;
        this.clientlist.creditlimit=this.fg_clientdetails.controls['creditlimit'].value;
        this.clientlist.remarknote=this.fg_clientdetails.controls['remarknote'].value;
       
        this.honeybillservice.UpdateClientList(this.clientlist.id,this.clientlist).subscribe({
          next:(res)=>{
            console.log(res);
            this.addMode=false;
          },
          error:(e)=>console.error(e)
        });
        alert('Client Updated successfully!! ');
      }
      this.NavigateToClient();
    }
    catch(e){
      console.log('error in update client information'+e);
      alert('error in update client information'+e);
    }
  }
 
}
