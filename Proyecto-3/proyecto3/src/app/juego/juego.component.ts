import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoService } from '../servicios/juego.service';
import { Juego } from '../interfaz/juego';
import { ResponseJuego } from '../interfaz/response-juego';
import {Location} from '@angular/common'

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  juego : Juego= {
  idJuego: 0,
  idPlataforma: 0,
  nombre: "",
  precio: 0,
  categoria: "",
  score: 0,
  url_imagenes: "",
  description: ""
  }

  constructor(private _location: Location, private router: ActivatedRoute , private juegoService: JuegoService) { }

  ngOnInit(): void {
    let params = this.router.snapshot.params;
    let id = params["idJuego"]
    this.juegoService.obtenerJuegoPorId(id).subscribe(respuesta => {
      const resp = respuesta as Array<Juego>
      this.juego = resp[0]
      console.log(this.juego)
    })
  }

  save(): void {
    let carritoSring = localStorage.getItem("carrito") || ""
    let carrito = []
    if(carritoSring!==""){
      carrito = JSON.parse(carritoSring)
    }
    carrito.push(this.juego)
    carritoSring = JSON.stringify(carrito);
    localStorage.setItem("carrito",carritoSring)
    this._location.back();
  }

}

