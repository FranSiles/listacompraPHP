import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListacompraModule } from './listacompra/listacompra.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ListacompraModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
