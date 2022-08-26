import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TitleStrategy } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];

  heroeSelected: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim()) 
        .subscribe({
          next: heroes => this.heroes = heroes
        })
  }

  opcionSelecionada(event: MatAutocompleteSelectedEvent) {
    if(!event.option.value) {
      this.heroeSelected = undefined;
      return
    }
    const heroe: Heroe = event.option.value;
    const {id} = heroe;

    this.termino = heroe.superhero;

    this.heroesService.getHeroeById(id!)
        .subscribe({
          next: heroe => this.heroeSelected = heroe
        })
  }

}
