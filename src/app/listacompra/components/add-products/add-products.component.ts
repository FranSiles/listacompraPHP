/*import { CommonModule } from '@angular/core';*/
import { Component, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from '../../interface/character.interface';
import{ListacompraService} from '../../service/listacompra-service';
@Component({
  selector: 'listacompra-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent{
  public producto: Producto = { nombre: '', cantidad: 0 }; // Objeto vinculado al .html
  private suscripcion: Subscription | null = null;

  constructor(private listacompraService: ListacompraService){ }

  ngOnInit() {
    this.suscripcion = this.listacompraService.producto$.subscribe(producto => {
      this.producto = producto;
    });
  }

  ngOnDestroy() {
    if (this.suscripcion !== null) {
      this.suscripcion.unsubscribe(); // Evita fugas de memoria al destruir el componente
    }
  }

  envioProducto():void{
    console.log("Desde 'agregar producto' envio",this.producto);
    this.listacompraService.anadirProducto(this.producto);
    this.producto={nombre:'',cantidad: 0};
  }
}
