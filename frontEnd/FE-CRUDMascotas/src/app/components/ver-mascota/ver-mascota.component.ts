import { Observable, Subscription } from 'rxjs';
import { Mascota } from './../../interface/mascota';
import { MascotaService } from './../../services/mascota.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit, OnDestroy {
  id!: number;
  mascota!: Mascota;
  loading: boolean = false;
  routeSub!: Subscription;//Almacenar la suscripcion 
  // mascota$!: Observable<Mascota>; PIPE ASYNC

  constructor(private _mascotaService: MascotaService,
    private aRoute: ActivatedRoute) {
    // const id = +this.aRoute.snapshot.paramMap.get('id')!; formas de convertit string to int
    // const id = parseInt(this.aRoute.snapshot.paramMap.get('id')!);
    // this.id = Number(this.aRoute.snapshot.paramMap.get('id')); Una opción de capturar el ID de una ruta
  }

  ngOnInit(): void {
    // this.mascota$ = this._mascotaService.getMascota(this.id); PIPE ASYNC
    this.routeSub = this.aRoute.params.subscribe(data =>{ //crear una suscripción para peticiones http
      this.id = data['id'];
      this.obtenerMascota();
    });
    // this.obtenerMascota(); Una opción de capturar el ID de una ruta
  }

  //Desubsiscribir la peticion http
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  obtenerMascota() {
    this.loading = true;
    this._mascotaService.getMascota(this.id).subscribe(data => {
      this.mascota = data;
      this.loading = false;
    })
  }

}
