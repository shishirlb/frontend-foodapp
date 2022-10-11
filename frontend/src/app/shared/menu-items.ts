
import { InjectableCompiler } from "@angular/compiler/src/injectable_compiler";
import { Injectable } from "@angular/core";
import { DashboardComponent } from "../dashboard/dashboard.component";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
    { state:'category', name:'Categories', icon:'category', role:'branchmanager'},
    { state: 'product', name: 'Products', icon: 'inventory_2', role: 'branchmanager' },
    { state: 'order', name: 'Orders', icon: 'list_alt', role: '' },
    { state: 'bill', name: 'Bills', icon: 'import_contacts', role: '' },
    { state: 'user', name: 'Staff', icon: 'people', role: 'branchmanager' },

];


@Injectable()

export class MenuItems {
    getMenuItem(): Menu[] {
        return MENUITEMS;
    }
}