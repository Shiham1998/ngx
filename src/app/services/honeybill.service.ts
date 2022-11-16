import {  HttpClient} from '@angular/common/http';
import {  Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {  environment} from 'src/environments/environment';
import { Billingdetails } from '../models/billingdetails';
import { Masters } from '../models/Masters';
import { Itemlist } from '../models/itemlist';
import { Outlet } from '../models/outlet';
import { Company } from '../models/company';
import { Group } from '../models/group';
import { Clients } from '../models/client';
import { Hsn } from '../models/hsn';
import { Supplier } from '../models/supplier';



const baseUrl = `${environment.apiUrl}/api`;
@Injectable({providedIn: 'root'})
  
export class HoneybillService {

  constructor(private http: HttpClient) {}
 
  //For Outlet

  async getOutlet() : Promise<Observable<Outlet[]>>{
    return this.http.get<Outlet[]>(`${baseUrl}/outlet/outletlist`);
}

getByOutletId(id: string) {
    return this.http.get<Outlet>(`${baseUrl}/outlet/${id}`);
}
createOutlet(params: any) {
  return this.http.post(`${baseUrl}/outlet/add`, params);
}

updateOutlet(id: string, params: any) {
    return this.http.put(`${baseUrl}/outlet/update/${id}`,params);
}

deleteOutlet(id: string) {
    return this.http.delete(`${baseUrl}/outlet/delete/${id}`);
}

  //For Company

  async getCompany() : Promise<Observable<Company[]>>{
    return this.http.get<Company[]>(`${baseUrl}/companylist`);
}

getByCompanyId(id: string) {
    return this.http.get<Company>(`${baseUrl}/company/${id}`);
}
createCompany(params: any) {
  return this.http.post(`${baseUrl}/company/add`, params);
}

updateCompany(id: string, params: any) {
    return this.http.put(`${baseUrl}/company/update/${id}`,params);
}

deleteCompany(id: string) {
    return this.http.delete(`${baseUrl}/company/delete/${id}`);
}

  //For Itemlist

async getItemlist() : Promise<Observable<Itemlist[]>>{
    return this.http.get<Itemlist[]>(`${baseUrl}/itemlist/itemlist`);
}

getByItemlistId(id: string) {
    return this.http.get<Itemlist>(`${baseUrl}/itemlist/${id}`);
}
createItemlist(params: any) {
  return this.http.post(`${baseUrl}/itemlist/add`, params);
}

updateItemlist(id: string, params: any) {
    return this.http.put(`${baseUrl}/itemlist/update/${id}`,params);
}

deleteItemlist(id: string) {
    return this.http.delete(`${baseUrl}/itemlist/delete/${id}`);
}




  //For Billing details

async getBillingdetails() : Promise<Observable<Billingdetails[]>>{
    return this.http.get<Billingdetails[]>(`${baseUrl}/billingdetails/billingdetailslist`);
}

getByBillingdetailsId(id: string) {
    return this.http.get<Billingdetails>(`${baseUrl}/billingdetails/${id}`);
}
createBillingdetails(params: any) {
  return this.http.post(`${baseUrl}/billingdetails/add`, params);
}

updateBillingdetails(id: string, params: any) {
    return this.http.put(`${baseUrl}/billingdetails/update/${id}`,params);
}

async getBillnumberdetails() : Promise<Observable<Billingdetails[]>>{
  return this.http.get<Billingdetails[]>(`${baseUrl}/billingdetails/getBillNumber`);
}

// Brand Master
savebrandmaster(data:any){
  return this.http.post(`${baseUrl}/masters/add`,data);
}
getByBrandId(id: string) {
  return this.http.get<Masters >(`${baseUrl}/masters/${id}`);
}
async getbrandmasterlist(_type:string) : Promise<Observable<Masters []>>{
  return this.http.get<Masters []>(`${baseUrl}/masters/masterslist/${_type}`);
}
deletebrandmasteritem(id: string) {
  return this.http.delete(`${baseUrl}/masters/delete/${id}`);
}
updateBrandmasterid(id:string,params:any){
  return this.http.put(`${baseUrl}/masters/update/${id}`,params);
}

//for department
SaveDepartment(data:any){
  return this.http.post(`${baseUrl}/masters/add`,data);
}
getdeptByid(id: string){
return this.http.get<Masters >(`${baseUrl}/masters/${id}`);
}
async getDepartmentList(_type:string):Promise<Observable<Masters []>>{
  return this.http.get<Masters []>(`${baseUrl}/masters/masterslist/${_type}`);
}
deletedeptitem(id: string) {
  return this.http.delete(`${baseUrl}/masters/delete/${id}`);
}
updateDepartmentid(id:string,params:any){
  return this.http.put(`${baseUrl}/masters/update/${id}`,params);
}

// For Designation
savedesignation(data:any){
  return this.http.post(`${baseUrl}/masters/add`,data);
}
getBydesignationId(id: string) {
  return this.http.get<Masters>(`${baseUrl}/masters/${id}`);
}
async getdesignationlist(_type:string):Promise<Observable<Masters[]>>{
  return this.http.get<Masters[]>(`${baseUrl}/masters/masterslist/${_type}`);
}
deletedesignationitem(id: string) {
  return this.http.delete(`${baseUrl}/masters/delete/${id}`);
}
updateDesignationid(id:string,params:any){
  return this.http.put(`${baseUrl}/masters/update/${id}`,params);
}




// For Unit
saveunitmaster(data:any){
  return this.http.post(`${baseUrl}/masters/add`,data);
}
getByunitId(id: string) {
  return this.http.get<Masters>(`${baseUrl}/masters/${id}`);
}
async getunitmasterlist(_type:string):Promise<Observable<Masters[]>>{
  return this.http.get<Masters[]>(`${baseUrl}/masters/masterslist/${_type}`);
}
deleteunitmasteritem(id: string) {
  return this.http.delete(`${baseUrl}/masters/delete/${id}`);
}
updateUnitmasterid(id:string,params:any){
  return this.http.put(`${baseUrl}/masters/update/${id}`,params);
}

//For Group
savegroupmaster(data:any){
  return this.http.post(`${baseUrl}/group/add`,data);
}
getBygroupId(id: string) {
  return this.http.get<Group>(`${baseUrl}/group/${id}`);
}
async getgroupmasterlist():Promise<Observable<Group[]>>{
  return this.http.get<Group[]>(`${baseUrl}/group/grouplist`);
}
deletegroupmasteritem(id: string) {
  return this.http.delete(`${baseUrl}/group/delete/${id}`);
}
updateGroupmasterid(id:string,params:any){
  return this.http.put(`${baseUrl}/group/update/${id}`,params);
}
getHsnValues(HSNName:any){
  return this.http.get<Hsn[]>(`${baseUrl}/group/gstvalues/${HSNName}`);
}
//for Holiday
SaveHoliday(data:any){
  return this.http.post(`${baseUrl}/masters/add`,data);
}
async getHolidayList(_type:string):Promise<Observable<Masters []>>{
  return this.http.get<Masters []>(`${baseUrl}/masters/masterslist/${_type}`);
}
deleteHolidayList(id: string) {
  return this.http.delete(`${baseUrl}/masters/delete/${id}`);
}
getHolidayByid(id: string) {
  return this.http.get<Masters>(`${baseUrl}/masters/${id}`);
}
UpdateHolidayList(id:string,params:any){
  return this.http.put(`${baseUrl}/masters/update/${id}`,params);
}
//for clientinformation
SaveClient(data:any){
  return this.http.post(`${baseUrl}/clientinfo/add`,data);
}
async getClientList():Promise<Observable<Clients[]>>{
  return this.http.get<Clients[]>(`${baseUrl}/clientinfolist`);
}
UpdateClientList(id:string,data:any){
  return this.http.put(`${baseUrl}/clientinfo/update/${id}`,data);
}
getClientById(id:string){
return this.http.get<Clients>(`${baseUrl}/clientinfo/${id}`);
}
deleteClientList(id:string){
  return this.http.delete(`${baseUrl}/clientinfo/delete/${id}`);
}

//For HSN
savehsnmaster(data:any){
  return this.http.post(`${baseUrl}/hsndet/add`,data);
}
getByhsnId(id: string) {
  return this.http.get<Hsn>(`${baseUrl}/hsndet/${id}`);
}
async gethsnmasterlist():Promise<Observable<Hsn[]>>{
  return this.http.get<Hsn[]>(`${baseUrl}/hsndetlist`);
}
deletehsnmasteritem(id: string) {
  return this.http.delete(`${baseUrl}/hsndet/delete/${id}`);
}
updateHsnmasterid(id:string,params:any){
  return this.http.put(`${baseUrl}/hsndet/update/${id}`,params);
}
 //For Supplier
 SaveSupplier(data:any){
  return this.http.post(`${baseUrl}/supplier/add`,data);
}
async getSupplierList():Promise<Observable<Supplier[]>>{
  return this.http.get<Supplier[]>(`${baseUrl}/supplierlist`);
}
UpdateSupplierList(id:string,data:any){
  return this.http.put(`${baseUrl}/supplier/update/${id}`,data);
}
getSupplierById(id:string){
return this.http.get<Supplier>(`${baseUrl}/supplier/${id}`);
}
deleteSupplierList(id:string){
  return this.http.delete(`${baseUrl}/supplier/delete/${id}`);
}
}

