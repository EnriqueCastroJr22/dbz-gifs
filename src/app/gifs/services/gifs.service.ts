import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private serviceURL: string = 'https://api.giphy.com/v1/gifs'
  private apiKey    : string = 'JAa0ukt5CKGHrKRmDfvyHvJI2ZwH5FMZ';

  public resultados: Gif[] = [];
  

  constructor( private _httpClientModule: HttpClient) {

      this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
      this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];
   }

  get historial() {
    return [...this._historial];
  } 

  buscarGifs( query: string) {
    query = query.trim().toLocaleLowerCase();
    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );
    }
    
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', 10)
          .set('q', query)
    
    this._httpClientModule.get<SearchGIFResponse>( `${ this.serviceURL }/search`, { params } )
      .subscribe( ( response ) => {
        this.resultados = response.data;
        localStorage.setItem( 'resultados', JSON.stringify( this.resultados) );
      })
  }
}