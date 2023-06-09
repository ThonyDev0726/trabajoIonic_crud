import { Component, OnDestroy, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Observable, Subscription, interval } from 'rxjs';
import { Dispositivo } from '../interfaces/dispositivos';
import { Electrovalvulas } from '../interfaces/electrovalvulas';
import { Mediciones } from '../interfaces/mediciones';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit, OnDestroy {

  observable$: Observable<any>
  subscription: Subscription
  
   listadispositivo:Dispositivo[]
   listaelectrovalvulas:Electrovalvulas[]
   listamediciones:Mediciones[]
   
   

  constructor(private dispositivoService: DispositivoService) {
    
    this.listadispositivo = []
    this.listaelectrovalvulas =[]
    this.listamediciones=[]
    
    this.observable$ = interval(1000)

    this.subscription = this.observable$.subscribe((integer) => {
      console.log(integer)
    })
  }
  
  async ngOnInit() {
    this.subscription.unsubscribe()
    //let dispositivos = await this.dispositivoService.getListadoDispositivos()
    //console.log(dispositivos)
    console.log('Me ejecuto primero')
    this.dispositivoService.getListadoDispositivos()
       .then((res) => {
         console.log(res)
         this.listadispositivo =  res
     })
      .catch((error) => {
         console.log(error)
       })

       this.dispositivoService.getListadoElectrovalvulas()
    .then((res) => {
      console.log(res)
      this.listaelectrovalvulas =  res
  })
   .catch((error) => {
      console.log(error)
    })
    this.dispositivoService.getListadoMediciones()
       .then((res) => {
         console.log(res)
         this.listamediciones =  res
     })
      .catch((error) => {
         console.log(error)
       })
  }

  subscribe() {
    this.subscription = this.observable$.subscribe((integer) => {
        console.log(integer)
    })
  }

  unsubscribe() {
    this.subscription.unsubscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
