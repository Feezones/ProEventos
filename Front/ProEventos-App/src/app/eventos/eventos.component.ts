import { Component, OnInit } from '@angular/core';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/Evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  widthImg: number= 150;
  marginImg: number = 2;
  showImg: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(){
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos; //verifica se this.filtroListra tem valor, se tiver add ao this.filtrarEventos, se nao, retorna this.eventos
  }

  filtrarEventos(filtrarPor: string):Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.Tema.toLocaleLowerCase().indexOf(filtrarPor)!== -1 ||
      evento.Local.toLocaleLowerCase().indexOf(filtrarPor)!== -1
    )
  }

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    this.getEventos();
  }

  altImg(){
    this.showImg = !this.showImg;
  }

  public getEventos(): void{
    this.eventoService.getEvento().subscribe(
      (eventos:Evento[]) =>
      {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos
      },
      error=>console.log(error),
    )
  }
}
