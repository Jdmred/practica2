import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import { VentaI } from 'src/models/venta';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-actualizar-venta',
  templateUrl: './actualizar-venta.component.html',
  styleUrls: ['./actualizar-venta.component.css']
})
export class ActualizarVentaComponent implements OnInit{
  public id: number=0;
  public form:FormGroup = this.formBuilder.group({
    id: [''],
    fechaVenta:  ['', [Validators.required]],
    subtotalVenta: ['', [Validators.required]],
    impuestosVenta: ['', [Validators.required]], 
    descuentosVenta: ['', [Validators.required]], 
    totalVenta: ['', [Validators.required]],


  });constructor(private formBuilder: FormBuilder,
    private ventaService: VentaService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getVenta(this.id);
  }

  getVenta(id: number){
    this.ventaService.getOneVenta(id).subscribe({next: (data)=>{
      this.form.setValue(data.venta)
    }})
  }

  onSubmit(){
    const formValue: VentaI = this.form.value;
    const id: number = this.form.value.id;
    this.ventaService.updateVenta(id, formValue).subscribe(()=>{
      setTimeout(()=>{
        this.messageService.add({severity: 'success', summary: 'Notificacion',detail: 'Venta Actualizada', life:5000});
      }, 0);
      this.router.navigateByUrl('ventas');
    })
  }


  cancel() {
    this.router.navigateByUrl('/ventas');
  }

  get fechaVenta() { return this.form.get('fechaVenta'); }
  get subtotalVenta() { return this.form.get('subtotalVenta'); }
  get impuestosVenta() { return this.form.get('impuestosVenta'); }
  get descuentosVenta() { return this.form.get('descuentosVenta'); }
  get totalVenta() { return this.form.get('totalVenta'); }
}
