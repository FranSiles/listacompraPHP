import { Component, OnDestroy,OnInit } from '@angular/core';
import { Producto } from '../../interface/character.interface';
import { Subscription } from 'rxjs';
import { ListacompraService } from '../../service/listacompra-service';

@Component({
  selector: 'app-comprado',
  templateUrl: './comprado.component.html',
  styleUrls: ['./comprado.component.css']
})
export class CompradoComponent {
    public comprados: Producto[] = [];
    private suscripcion: Subscription | null = null;

  constructor(private listacompraService: ListacompraService){ };

  ngOnInit() {
    this.suscripcion = this.listacompraService.comprados$.subscribe(
      productosYacomprados => {
        this.comprados = productosYacomprados;
      }
    );
  }
  ngOnDestroy() {
    if (this.suscripcion !== null) {
      this.suscripcion.unsubscribe(); // Evita fugas de memoria al destruir el componente
    } 
    // Tambien: this.suscripcion?.unsubscribe();
  }
}
