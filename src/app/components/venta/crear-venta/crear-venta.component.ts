import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { VentaService } from 'src/app/services/venta.service';
import { VentaI } from 'src/models/venta';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.css']
})

export class CrearVentaComponent implements OnInit {
  public form:FormGroup = this.formBuilder.group({
      id: [''],
      fechaVenta:  ['', [Validators.required]],
      subtotalVenta: ['', [Validators.required]],
      impuestosVenta: ['', [Validators.required]], 
      descuentosVenta: ['', [Validators.required]], 
      totalVenta: ['', [Validators.required]],
     });constructor(private formBuilder: FormBuilder, private ventaservice: VentaService, private messageService: MessageService, private router:Router) {

     }
     ngOnInit(): void {
  
     }
      onSubmit(): void{
      const formValue: VentaI = this.form.value;
      console.log(formValue);
      this.ventaservice.createVenta(formValue).subscribe(() =>{
        // console.log('Se ha creado correctamente');
        setTimeout(()=>{
          this.messageService.add({severity:'succes', summary:'Notificacion',detail:'venta Creada', life: 5000});
        }, 0);
        this.router.navigateByUrl('ventas');
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
      );
  }
  
  
    cancel(){
      this.router.navigateByUrl('/ventas');
    }

    get fechaVenta() { return this.form.get('fechaVenta'); }
    get subtotalVenta() { return this.form.get('subtotalVenta'); }
    get impuestosVenta() { return this.form.get('impuestosVenta'); }
    get descuentosVenta() { return this.form.get('descuentosVenta'); }
    get totalVenta() { return this.form.get('totalVenta'); }
}


