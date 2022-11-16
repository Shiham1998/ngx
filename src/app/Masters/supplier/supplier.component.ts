import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier';
import { HoneybillService } from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  loading!:boolean;
  supplierlistdata:Supplier[]=[];
  getsupplierId_!:any;
  constructor(private honeybillservice:HoneybillService,private router:Router,) { }
  ngOnInit(): void {
    this.getSupplierList();
  }
  Passid= (data: any) => {
    this.getsupplierId_ = Object.assign(data);
    console.log(this.getsupplierId_);
   }
  getSupplierList(){
    try{
      this.loading=true;
      setTimeout(async()=>{
        (await this.honeybillservice.getSupplierList()).subscribe((supplierlist:Supplier[])=>{
          this.supplierlistdata=[];
          this.supplierlistdata=supplierlist;
          this.loading=false;
        })
      },100)
    }
    catch(e){
      console.log('Error in getSupplierList'+ e);
    }
  }
  deletesupplier(id:string){
    try {
      this.honeybillservice.deleteSupplierList(id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      this.NavigateToList();
    } catch (e) {
     console.log('error in delete supplier'+e);
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
