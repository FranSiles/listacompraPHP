import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from '../../interface/character.interface';
import {ListacompraService} from '../../service/listacompra-service'
@Component({
  selector: 'listacompra-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  public productos:Producto[]=[];
  private suscripcion: Subscription | null = null;

  constructor(private listacompraService: ListacompraService){ };

  ngOnInit() {
    this.suscripcion = this.listacompraService.productos$.subscribe(
      productosActualizados => {
        this.productos = productosActualizados;
      });
  }

  ngOnDestroy() {
    if (this.suscripcion !== null) {
      this.suscripcion.unsubscribe(); // Evita fugas de memoria al destruir el componente
    } 
    // Tambien: this.suscripcion?.unsubscribe();
  }

  enviarId(id:number):void{
    console.log("Desde 'Listado' envio: ", id);
    this.listacompraService.borrarProducto(id);
  }

  enviarProducto(id:number,producto:Producto):void{
    console.log("Desde 'Listado' envio: ",id);
    this.listacompraService.borrarProducto(id);
    this.listacompraService.actualizarProducto(producto);
  }
  enviarProductocomprado(id:number,producto:Producto):void{
    console.log("Desde 'Listado' envio: ",id);
    this.listacompraService.borrarProducto(id);
    this.listacompraService.compradoProducto(producto);
  }
}
