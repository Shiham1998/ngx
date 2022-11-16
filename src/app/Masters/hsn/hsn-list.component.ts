import { Component,Input, OnInit } from '@angular/core';
import { Hsn } from 'src/app/models/hsn';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hsn-list',
  templateUrl: './hsn-list.component.html',
  styleUrls: ['./hsn-list.component.css']
})
export class HsnListComponent implements OnInit {
  @Input() addMode = false;
  fg_hsnname!: FormGroup;
  loading: boolean = false;
  hsnmasterlistdata:Hsn[]=[];
  gethsnmastersId:any;

  hsnmaster:Hsn={
    id:'',
    Code: 0,
    HSN_Code: '',
    HSN_Name: '',
    Description:'',
    HSN_GST:0,
    HSN_SGST:0,
    HSN_CGST:0,
    HSN_IGST:0,
    active:false,
  };
  constructor(private honeybillservice:HoneybillService,private router:Router) { }

  ngOnInit(): void {
    this.gethsnmasterlist()
  }

  Passidfromdeletemodal = (data: any) => {
    this.gethsnmastersId = Object.assign(data);
    console.log(this.gethsnmastersId);
  }

  gethsnmasterlist() {
    try {
      this.loading = true;
      setTimeout(async () => {
        (await this.honeybillservice.gethsnmasterlist()).subscribe((hsnmaster: Hsn[]) => {
          this. hsnmasterlistdata= [];
          
          this.hsnmasterlistdata =hsnmaster;
          console.log(this.hsnmasterlistdata)
          this.loading = false;
        })
      }, 500);
    } catch (e) {
      throw e
    }
  }
  

  deletehsnmaster(id:string):void{
    try {
      this.honeybillservice.deletehsnmasteritem(id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      this.NavigateToList();
    } catch (e) {
     console.log('error in delete hsnmaster'+e);
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
}
