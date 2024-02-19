import { Component } from '@angular/core';
import{ListacompraService} from '../service/listacompra-service';

@Component({
  selector: 'app-main-page',
  templateUrl: 'main-page.component.html'
})
export class MainPageComponent {
  
  constructor(public listacompraService: ListacompraService){}
}
