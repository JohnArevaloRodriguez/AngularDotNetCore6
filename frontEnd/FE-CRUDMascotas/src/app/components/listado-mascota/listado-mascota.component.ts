import { MascotaService } from './../../services/mascota.service';
import { Mascota } from './../../interface/mascota'; //importa la interface que se creo en la carpeta interface
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';


//Se crea una variable que va contener la información que se va enviar a la interface
// const ListMascotas: Mascota[] = [
//   { nombre: 'Ciro', edad: 3, raza: 'Golden', color: 'Dorado', peso: 13 }, //Crea elementos para renderizar
//   { nombre: 'Sirius', edad: 4, raza: 'Pitbull', color: 'Negro', peso: 23 }, //Crea elementos para renderizar
//   { nombre: 'Mateo', edad: 1, raza: 'Beatle', color: 'Cafe', peso: 16 }, //Crea elementos para renderizar
//   { nombre: 'Black', edad: 5, raza: 'Pator aleman', color: 'negro', peso: 23 }, //Crea elementos para renderizar
//   { nombre: 'Akira', edad: 4, raza: 'Labrador', color: 'Cafe', peso: 13 }, //Crea elementos para renderizar
//   { nombre: 'Tomas', edad: 3, raza: 'Golden', color: 'Dorado', peso: 13 } //Crea elementos para renderizar
// ];

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];//determina el nombre de las columnas a mostrar
  dataSource = new MatTableDataSource<Mascota>(); //Itera los datos que se van a mostrar
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar,
    private _mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pag.';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // obtenerMascotas(){
  //   this.loading = true;
  //   this._mascotaService.getMascotas().subscribe(data => {
  //     this.loading = false;
  //     this.dataSource.data = data;
  //   }, error => {
  //     this.loading = false;
  //     this._snackBar.open('Lo sentimos tenemos problemas :(', 'X', {
  //       horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //     });
  //   })
  // }

  obtenerMascotas() {
    this.loading = true;
    this._mascotaService.getMascotas().subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource.data = data;
      },
      error: (e) => {
        this.loading = false;
        this._snackBar.open('Lo sentimos tenemos problemas :(', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      complete: () => console.info('Complete')
    })
  }

  eliminarMascota(id: number) {
    this.loading = true;

    this._mascotaService.deleteMascota(id).subscribe(()=>{
      this.mensajeExito();
      this.loading = false;
      this.obtenerMascotas();
    });
  }

  mensajeExito(){
    this.loading = false;
      this._snackBar.open('La mascota se elimino con exito!', '', {
        duration: 2000,
        horizontalPosition: 'right'
      });
  }
}
