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
  calificacion: string = '';
  estadoAR: string = '';
  estado: string = '';
  idActualizar: any|number = 0;
  error: boolean = false;

  constructor(private CalificacionService: CalificacionService) { }

  ngOnInit() {
    this.CalificacionService.setCalificaciones([
      {id:1, materia: 'Algebra Lineal', calificacion: '65', estadoAR:'Reprobado'},
      {id:2, materia: 'Aplicaciones Moviles', calificacion: '100', estadoAR:'Aprobado'},
      {id:3, materia: 'Base de Datos', calificacion: '95', estadoAR:'Aprobado'},
      {id:4, materia: 'Circuitos Digitales', calificacion: '68', estadoAR:'Reprobado'}
    ]);

    this.calificaciones = this.CalificacionService.getCalificaciones();
    this.estado ='guardar';
  }

  public guardar(){
    if((Number(this.calificacion)<0 || Number(this.calificacion)>100)){
      this.error = true;
      return;
    }
    if((this.materia == undefined || this.materia == '' ) ||
      (this.calificacion == undefined || this.calificacion == '') ||
      (this.estadoAR == undefined || this.estadoAR == '') ) {
      this.error = true;
      return;
    }
    let calificacion: Calificacion={
      materia: this.materia,
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
    this.materia = calificacion.materia;
    this.calificacion = calificacion.calificacion;
    this.estadoAR = calificacion.estadoAR;
    this.idActualizar = calificacion.id;
  }
}
