import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import{HttpClient} from '@angular/common/http';
import { map, delay} from 'rxjs/operators';

// Servicios Rest con Firestore

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private url = 'https://fir-proy-e8245-default-rtdb.firebaseio.com'
  constructor(private http: HttpClient) {
  }
    crearHeroe(heroe: HeroeModel){

      const heroeTemp = {
        ...heroe
      };

      delete heroeTemp['id'];
      return this.http.post(`${this.url}/heroes/.json`,heroeTemp)
                  .pipe(
                    map((resp: any) => {
                      heroe.id = resp.name;
                      return heroe;
                    })
                    );
    }

    actualizarHeroe(heroe: HeroeModel){

      const heroeTemp = {
        ...heroe
      };

      delete heroeTemp['id'];

      return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp)
    }
    getHeroe(id:string){
      return this.http.get(`${this.url}/heroes/${id}.json`);
    }

    borrarHeroe(id:string){
      return this.http.delete(`${this.url}/heroes/${id}.json`);
    }
   
    getHeroes(){
      return this.http.get(`${this.url}/heroes.json`)
                 .pipe(
                   map(resp => { return this.crearArreglo(resp)

                   }), delay(1500)
                 );
    }
    private crearArreglo(heroesObj : any){
      const heroes : HeroeModel[] = [];
      if (heroesObj === null){ return []; }
      for(let registro in heroesObj){
        heroesObj[registro].id = registro;
        heroes.push(heroesObj[registro]);
      }
      console.log(heroes);
      return heroes;
    }


}
