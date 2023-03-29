import { ListadoMascotaComponent } from './../listado-mascota/listado-mascota.component';
import { MascotaService } from './../../services/mascota.service';
import { Mascota } from './../../interface/mascota';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {
  loading: boolean = false;//inicializar una variable
  form: FormGroup;
  id!: number;
  operacion: string = 'Agregar';

  //Tambien se puede inicializar la variable desde el constructor
  constructor(private fb:FormBuilder, 
    private _snackBar: MatSnackBar,
    private _mascotaService: MascotaService,
    private router: Router,
    private aRoute: ActivatedRoute){
    //this.loading = false; 
    this.form = this.fb.group({
      nombre:['',Validators.required],
      raza:['',Validators.required],
      color:['',Validators.required],
      edad:['',Validators.required],
      peso:['' , Validators.required],
    });    

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    if(this.id != 0){
      this.operacion = 'Editar';
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id: number){
    this._mascotaService.getMascota(id).subscribe(data =>{
      this.form.patchValue({
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso
      })
      this.loading = false;
    })
  }

  agregarEditarMascota(){
    // const nombre = this.form.get('nombre')?.value;
    const nombre = this.form.value.nombre;
    
    //armar objeto
    const mascota: Mascota = {
      nombre: nombre,
      raza: this.form.value.raza,
      color: this.form.value.color,
      edad: this.form.value.edad,
      peso: this.form.value.peso
    }  
    
    if(this.id != 0){
      mascota.id = this.id;
      this.editarMascota(this.id, mascota);
    }else{
      this.agregarMascota(mascota);
    }
  }

  agregarMascota(mascota: Mascota){
    //Enviar objeto al BackEnd
    const msn = 'La mascota fue registrada con éxito!';
    this._mascotaService.addMascota(mascota).subscribe(data => {
      this.mensajeExito(msn);
      this.router.navigate(['/listaMascotas']);
    });  
  }

  editarMascota(id: number, mascota: Mascota){
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe(() =>{
      const msn = 'La mascota fue actualizada con éxito!';
      this.mensajeExito(msn);
      this.router.navigate(['/listaMascotas']);
    });
  }

  mensajeExito(msn: string){
    this.loading = false;
      this._snackBar.open(msn, '', {
        duration: 4000,
        horizontalPosition: 'right'
      });
  }
}
