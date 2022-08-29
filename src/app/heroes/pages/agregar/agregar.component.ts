import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    { id:'DC Comics', desc: 'DC - Comics' },
    { id:'Marvel Comics', desc: 'Marvel - Comics' }
  ];

  heroe: Heroe = {
    superhero:  '',
    publisher:  Publisher.DCComics,
    alter_ego:  '',
    first_appearance: '',
    characters: '',
    alt_img:   ''
  };

  constructor(private heroesService: HeroesService, 
              private activatedRoute: ActivatedRoute, 
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Es para saber en que pagina estoy, si en agregar o editar
    // Así evito que se haga la peticion al servicio cuando voy a agregar,
    // esto retornaba undefined
    if(!this.router.url.includes('editar')){
      return
    }
    this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.heroesService.getHeroeById(id))
        )
        .subscribe({
          next: (heroe) => this.heroe = heroe
        })
  }

  guardarHeroe() {
    
    if(this.heroe.superhero.trim().length === 0){
      return
    }
    // Cuando el heroe tenga un id significa que se quiere actualizar
    if (this.heroe.id){
        //Actualizar
        this.heroesService.putActualizarHeroe(this.heroe)
            .subscribe({
              next: (heroe) => this.mostrarSnackBar('Heroe actualizado')
            });
    } else {
      // Insertar
      // En lugar de un console.log puedo usar navigate del Router
      this.heroesService.postAgregarHeroe(this.heroe)
          .subscribe({
            next: (heroe) => this.mostrarSnackBar('Heroe registrado')
          })
    }

  }

  borrar() {
    this.heroesService.eliminarHeroe(this.heroe.id!)
        .subscribe({
          next: (resp) => {
            console.log('Eliminado: ', resp);
            this.router.navigate(['/heroes']);
            this.mostrarSnackBar('Heroe eliminado');
          }
        })
  }

  mostrarSnackBar(msj: string): void {
    this.snackBar.open(msj, 'ok!', {
      duration: 2000
    })
  }

}
