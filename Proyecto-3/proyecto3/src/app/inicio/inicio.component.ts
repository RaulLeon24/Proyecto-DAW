import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { JuegoService } from '../servicios/juego.service';
import { Juego } from '../interfaz/juego';
import { ResponseJuego } from '../interfaz/response-juego';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos : Array<Juego> =[];
  categorias =[]

  constructor(private router2: Router, private router: ActivatedRoute , private juegoService: JuegoService) {
   }

  ngOnInit(): void {
    let params = this.router.snapshot.params;
    let categoria = params["categoria"]


    this.juegoService.obtenerCategorias().subscribe(respuesta => {
      this.categorias = respuesta as any;
    })
    this.reloadGames(categoria)

  }

  changeType(e: Event): void {
    const val = ((e.target as HTMLInputElement).value)
    console.log(val)
    this.reloadGames(val)
  }

  reloadGames(categoria: string): void {

    if(categoria == undefined){
      this.juegoService.obtenerJuegos().subscribe(respuesta => {
        const res =respuesta as ResponseJuego;
        this.juegos = res as any
      })

    }else{
    this.juegoService.obtenerJuegoPorCat(categoria).subscribe(respuesta => {
      const res = respuesta as ResponseJuego;
      this.juegos = res as any
    }) }
  }



}


