
import { InjectableCompiler } from "@angular/compiler/src/injectable_compiler";
import { Injectable } from "@angular/core";
import { DashboardComponent } from "../dashboard/dashboard.component";

export interface Menu{


import { Injectable } from "@angular/core";

export interface Menu{

    state:string;
    name:string;
    icon:string;
    role:string;
}


const MENUITEMS = [
    {state:'dashboard',name:'Dashboard',icon:'dashboard',role:''},
    {state:'dashboard',name:'Manage Category',icon:'category',role:'branchmanager'}
];


@Injectable()
export class MenuItems{
    getMenuitem():Menu[]{

const MENUITEMS=[
    {state: 'dashboard',name: 'Dashboard',icon: 'dashboard',role:''}
];

@Injectable()
export class MenuItems{
    getMenuItem():Menu[]{

        return MENUITEMS;
    }
}