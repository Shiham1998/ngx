import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Itemlist } from 'src/app/models/itemlist';
import { HoneybillService } from 'src/app/services/honeybill.service';


@Component({
 
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  item!: Itemlist[];
  searchitem!: FormGroup;
  currentTutorial: any = null;
  currentIndex = -1;
  name!:any;
  loading: boolean = false;
  itemlistdata: Itemlist[] = [];
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

  constructor(private honeybillService: HoneybillService) { }

  ngOnInit(): void {
    this.searchitem = new FormGroup({
     search_name: new FormControl(''),
    });
    this.getItemlists();
  }
  
  getItemlists() {
    try {
      this.loading = true;
      setTimeout(async () => {
        (await this.honeybillService.getItemlist()).subscribe((itemlist: Itemlist[]) => {
          this.itemlistdata = [];
          this.itemlistdata = itemlist;
          this.loading = false;
        })
      }, 500);
    } catch (e) {
      throw e
    }
  }

  searchName()
  {
    this.itemlistdata = this.itemlistdata.filter(x => (x.item_name)==this.searchitem.controls['search_name'].value  )

  } 

  list()
{
  if(this.searchitem.controls['search_name'].value.length == 0)
  {
    this.getItemlists();
    
  }
}

}
