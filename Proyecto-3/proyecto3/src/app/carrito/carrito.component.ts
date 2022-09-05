import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Juego } from '../interfaz/juego';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  juegos : Array<Juego> =[];
  subtotal= 0;
  iva= 0;
  tarifa= 0;
  total= 0

  constructor( private router: Router) { }

  ngOnInit(): void {
      const carritoString = localStorage.getItem("carrito") || "[]"
      const carrito = JSON.parse(carritoString)
      this.juegos = carrito as Array<Juego>
      this.subtotal = this.juegos.reduce(
        (previousValue, currentValue) => previousValue + currentValue.precio,
        this.subtotal
      );
      this.iva= this.subtotal*0.12
      this.tarifa = this.subtotal*0.05
      this.total= this.iva+this.subtotal+this.tarifa
  }

  save(): void {
    let carritoSring = localStorage.removeItem("carrito")
    this.router.navigate(['/inicio']);

  }

}
