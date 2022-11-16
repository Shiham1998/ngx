import { Component, OnInit,Input } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { Hsn } from 'src/app/models/hsn';
import { HoneybillService } from 'src/app/services/honeybill.service';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  @Input() addMode = false;
  fg_groupname!: FormGroup;
  loading: boolean = false;
  groupmasterlistdata:Group[]=[];
  message!:string;
  hsnmasterlistdata!:Hsn[];
  ary_getGstValues!:Hsn[];
  selectedHsnCode: any;
  getgroupmastersId: any;

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
 

  constructor(private honeybillservice:HoneybillService,private router:Router) { }

  ngOnInit(): void {
    this.getgroupmasterlist();
  }
  Passidfromdeletemodal = (data: any) => {
    this.getgroupmastersId = Object.assign(data);
    console.log(this.getgroupmastersId);
  }

  getgroupmasterlist() {
    try {
      this.loading = true;
      setTimeout(async () => {
        (await this.honeybillservice.getgroupmasterlist()).subscribe((groupmaster: Group[]) => {
          this. groupmasterlistdata= [];
          
          this.groupmasterlistdata =groupmaster;
          console.log(this.groupmasterlistdata)
          this.loading = false;
        })
      }, 500);
    } catch (e) {
      throw e
    }
  }

  deletegroupmaster(id:string):void{
    try {
      this.honeybillservice.deletegroupmasteritem(id)
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
