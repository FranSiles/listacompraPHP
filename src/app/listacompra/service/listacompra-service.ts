import { Injectable } from '@angular/core';
import { Producto } from '../interface/character.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from './php.service';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListacompraService {

  private _productos: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]); // Lista de productos
  private _comprados: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]); //Lista de productos ya comprados
  private _producto = new Subject<Producto>();
  productos$ = this._productos.asObservable();
  producto$ = this._producto.asObservable();
  comprados$=this._comprados.asObservable();

  constructor(private apiService: ApiService) { 
    this.cargarProductos();
  }

  cargarProductos(){
    this.apiService.obtenerProductos().pipe(
      tap((productos: Producto[]) => {
        this._productos.next(productos);
      })
    ).subscribe();
    console.log("La Consulta a la BD devuelve: ", this._productos);
  }
  anadirProducto(producto:Producto){
    console.log("Uso servicio 'Añadir producto' para enviar: ",producto)
    this.apiService.anadirProducto(producto).subscribe({
      next: () => {
        this.cargarProductos(); // Recargar la lista completa desde el servidor
      },
      error: (error: any) => {
        console.error("Error al añadir personaje:", error);
      }
    });
  }
  borrarProducto(id:number){
    console.log("Uso servicio 'Borrar producto' para borrar: ",id);
    this.apiService.borrarProducto(id).subscribe({
      next: () =>{
        this.cargarProductos();
      },
      error: (error: any)=>{
        console.error("Error al borrar producto:",error);
      }
    })
  }
  actualizarProducto(producto:Producto){
    this._producto.next(producto);
  }

  compradoProducto(producto:Producto){
    console.log("uso servicio 'comprado producto' para añadir este producto en la lista de comprado: ",producto);
    const productosComprados = this._comprados.getValue();
    this._comprados.next([...productosComprados,producto]);
  }
}
