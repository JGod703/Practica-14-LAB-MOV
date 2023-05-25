import { Component, OnInit } from '@angular/core';
import { Calificacion } from '../interface/calificacion';
import { CalificacionService } from '../service/calificacion.service';


@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.page.html',
  styleUrls: ['./calificaciones.page.scss'],
})
export class CalificacionesPage implements OnInit {

  calificaciones: Calificacion[]=[];
  materia: string ='';
  matricula: string = '';
  calificacion: string = '';
  estadoAR: string = '';
  estado: string = '';
  idActualizar: any|number = 0;
  error: boolean = false;
  


  constructor(private CalificacionService: CalificacionService) { }

  ngOnInit() {
    this.CalificacionService.setCalificaciones([
      {id:1, materia: 'Algebra Lineal',
      matricula: '1934843', calificacion: '65', estadoAR:'Reprobado'},
      {id:2, materia: 'Aplicaciones Moviles',
      matricula: '1946342', calificacion: '100', estadoAR:'Aprobado'},
      {id:2, materia: 'Base de Datos',
      matricula: '1927432', calificacion: '95', estadoAR:'Aprobado'},
    ]);

    this.calificaciones = this.CalificacionService.getCalificaciones();
    this.estado ='guardar';
  }

  public guardar(){
    if((this.materia == undefined || this.materia == '' ) ||
      (this.matricula == undefined || this.matricula == '') ||
      (this.calificacion == undefined || this.calificacion == '') ||
      (this.estadoAR == undefined || this.estadoAR == '') ) {
      this.error = true;
      return;
    }
    let calificacion: Calificacion={
      materia: this.materia,
      matricula: this.matricula,
      calificacion: this.calificacion,
      estadoAR: this.estadoAR
    };
    if (this.estado ==='actualizar'){
      calificacion.id = this.idActualizar;
      this.calificaciones = this.CalificacionService.actualiza(calificacion);
    }
    if(this.estado === 'guardar'){
      this.CalificacionService.agregarCalificacion(calificacion);
      this.calificaciones = this.CalificacionService.getCalificaciones();
    }
    this.cancelar();
  }

  public cancelar(){
    this.estado = 'guardar';
    this.matricula = '';
    this.materia = '';
    this.calificacion = '';
    this.estadoAR = '';
    this.error = false;
  }

  public eliminar(id:number){
    this.CalificacionService.borrarCalificacion(id);
    this.calificaciones = this.CalificacionService.getCalificaciones();
  }

  public editar(calificacion:Calificacion){
    this.estado = 'actualizar';
    this.matricula = calificacion.matricula;
    this.materia = calificacion.materia;
    this.calificacion = calificacion.calificacion;
    this.estadoAR = calificacion.estadoAR;
    this.idActualizar = calificacion.id;
  }
}
