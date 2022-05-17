import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { HeroeModel } from '../../models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  heroes: HeroeModel [] = [];
  cargando = false;


  constructor(private heroesServise: HeroesService) { }

  ngOnInit() {
    this.cargando=true;
    this.heroesServise.getHeroes()
        .subscribe(resp => {
          console.log(resp);
          this.heroes = resp;
          this.cargando = false;
        })
  }

  borrarHeroe(heroe:any, i: number){

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro de borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if(resp.value){
        this.heroesServise.borrarHeroe(heroe.id).subscribe();
        this.heroes.splice(i,1);
      }
    });
  }

}
