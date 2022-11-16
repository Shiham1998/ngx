import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Itemlist } from 'src/app/models/itemlist';
import { HoneybillService } from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-view-itemlist',
  templateUrl: './view-itemlist.component.html',
  styleUrls: ['./view-itemlist.component.css']
})
export class ViewItemlistComponent implements OnInit {
  isLinear = false;
  ditemlistid: any;
  viewItemlist!: FormGroup;
  itemdetails = '';
  @Input() addMode = false;
  itemlist: Itemlist = {
    id: '',
    hsn_code: '',
    item_code: '',
    sku: '',
    item_name: '',
    unit: '',
    product_type: '',
    serial_no: '',
    group: '',
    brand: '',
    print_name: '',
    purchase_price: 0,
    sale_price: 0,
    min_sale_price: 0,
    mrp: 0,
    opening_stock: 0,
    opening_stock_value: 0,
    low_level_limit: 0,
    GST: 0,
    IGST: 0,
    CGST: 0,
    SGST: 0,
    cess: 0,
    hsn_name: '',
    hsn_description: '',
    bar_code: '',
    shortname: '',
    department: '',
    subgroup: '',
    supplier: '',
    maximum_qty: 0,
    barcode_status: '',
    stock_maintainance: false,
    box_qty: 0,
    customer_discount: 0,
    dealer_discount: 0,
    whole_salerate: 0,
    rack_group: '',
    rack_name: '',
    quotation_status: '',
    tax_status: '',
    productimage: '',
    allow_weighing_scale: false,
    salesman_commission: false,
    salesman_commission_amount: ''
  };
  constructor(private honeybillService: HoneybillService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewItemlist = new FormGroup({
      hsn_code: new FormControl(''),
      item_code: new FormControl(''),
      sku: new FormControl(''),
      item_name: new FormControl(''),
      unit: new FormControl(''),
      costprice: new FormControl(''),
      p1_IGST: new FormControl(''),
      p1_CGST: new FormControl(''),
      p1_SGST: new FormControl(''),
    
      cess: new FormControl(''),
      group: new FormControl(''),
      brand: new FormControl(''),
      print_name: new FormControl(''),
      purchase_price: new FormControl(''),
      sale_price: new FormControl(''),
      min_sale_price: new FormControl(''),
      mrp: new FormControl(''),
      opening_stock: new FormControl(''),
      opening_stock_value: new FormControl(''),
      sale_discount: new FormControl(''),
      low_level_limit: new FormControl(''),
      product_type: new FormControl(''),
      serial_no: new FormControl(''),
      product_description: new FormControl(''),
    });
    if (!this.addMode) {
      this.getitemlist(this.route.snapshot.params["id"]);
    }

    this.ditemlistid = this.route.snapshot.params["id"];
    console.log(this.ditemlistid);
  }

  getitemlist(id: string): void {
    try {
      this.honeybillService.getByItemlistId(id)
        .subscribe({
          next: (data) => {
            this.itemlist = data;
            this.viewItemlist.controls['hsn_code'].setValue(this.itemlist.hsn_code);
            this.viewItemlist.controls['item_code'].setValue(this.itemlist.item_code);
            this.viewItemlist.controls['sku'].setValue(this.itemlist.sku);
            this.viewItemlist.controls['item_name'].setValue(this.itemlist.item_name);
            this.viewItemlist.controls['unit'].setValue(this.itemlist.unit);
         
            this.viewItemlist.controls['p1_IGST'].setValue(this.itemlist.IGST);
            this.viewItemlist.controls['p1_CGST'].setValue(this.itemlist.CGST);
            this.viewItemlist.controls['p1_SGST'].setValue(this.itemlist.SGST);
         
            this.viewItemlist.controls['cess'].setValue(this.itemlist.cess);
            this.viewItemlist.controls['group'].setValue(this.itemlist.group);
            this.viewItemlist.controls['brand'].setValue(this.itemlist.brand);
            this.viewItemlist.controls['print_name'].setValue(this.itemlist.print_name);
            this.viewItemlist.controls['purchase_price'].setValue(this.itemlist.purchase_price);
            this.viewItemlist.controls['sale_price'].setValue(this.itemlist.sale_price);
            this.viewItemlist.controls['min_sale_price'].setValue(this.itemlist.min_sale_price);
            this.viewItemlist.controls['mrp'].setValue(this.itemlist.mrp);
            this.viewItemlist.controls['opening_stock'].setValue(this.itemlist.opening_stock);
            this.viewItemlist.controls['opening_stock_value'].setValue(this.itemlist.opening_stock_value);
           
            this.viewItemlist.controls['low_level_limit'].setValue(this.itemlist.low_level_limit);
            this.viewItemlist.controls['product_type'].setValue(this.itemlist.product_type);
            this.viewItemlist.controls['serial_no'].setValue(this.itemlist.serial_no);
          
           
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    } catch (e) {
      console.log('Machines - getMachineId' + e);
      alert('Machines - getMachineId' + e);
    }
  }



    //  *****************************************   delete  particular machine detail ***************************************

    deleteItemlists(id: string): void {
      try {
        this.honeybillService.deleteItemlist(id)
          .subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (e) => console.error(e)
          });
        // this.NewMachines();
       
      } catch (e) {
        console.log('Machines - deleteMachines' + e);
        alert('Machines - deleteMachines' + e);
      }
        // this.router.navigate(['/itemlist']);
    }

}
