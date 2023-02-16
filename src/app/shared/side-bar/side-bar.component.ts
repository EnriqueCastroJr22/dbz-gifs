import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor( private gifsService: GifsService) {

  }

  get historial() {
    return this.gifsService.historial;
  }

  buscar( item : string) {
    this.gifsService.buscarGifs(item)
  }
}
