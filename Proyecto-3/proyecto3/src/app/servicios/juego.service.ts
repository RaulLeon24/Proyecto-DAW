import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  constructor(private http: HttpClient) { }

  obtenerJuegos() {
    return this.http.get('http://localhost:3000/')
    }

  obtenerJuegoPorCat(categoria: string) {
    return this.http.get('http://localhost:3000/juegos-categoria/'+categoria)
    }

  obtenerJuegoPorId(id: number) {
    return this.http.get('http://localhost:3000/juegos-id/'+id)
    }

  obtenerCategorias() {
    return this.http.get('http://localhost:3000/categorias')
    }


}
