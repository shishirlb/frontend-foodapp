import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ProductComponent } from '../dialog/product/product.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'categoryName', 'description', 'price', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    public router: Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.productService.getProduct().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      console.log(error);
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = "850px";
    const dialogReference = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogReference.close();
    })

    const sub = dialogReference.componentInstance.onAddProduct.subscribe((response) =>{
      this.tableData();
    })

  }

  handleEditAction(value:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: value
    }
    dialogConfig.width = "850px";
    const dialogReference = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogReference.close();
    })

    const sub = dialogReference.componentInstance.onEditProduct.subscribe((response) =>{
      this.tableData();
    })
  }

  handleDeleteAction(value:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete '+ value.name
    }
    const dialogReference = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogReference.componentInstance.onEmitStatusChange.subscribe((response) =>{
      this.deleteProduct(value.id);
      dialogReference.close();
    })
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe((response: any) =>{
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error:any)=>{
      console.log(error);
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  onChange(status:any, id:any) {
    var data = {
      status: status.toString(),
      id: id
    }

    this.productService.updateStatus(data).subscribe((response: any) => {
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error:any)=>{
      console.log(error);
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

}
