import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interface/character.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080'; // Asegúrate de cambiar esto por tu URL real

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/leer.php`);
  }

  anadirProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}/grabar.php`, producto);
  }

  borrarProducto(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/borrar.php`, { id });
  }
}