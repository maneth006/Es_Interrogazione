import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Root } from '../models/generic.models';
@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.css']
})
export class GenericComponent {
  someInf!: any;
  apiObservable!: Observable<Root>;
  constructor(public route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(this.getparams);
  }

  getparams = (params: any,) => {
    console.log(params['food']);
    let foodCategory = params['food'];
    this.apiCall(foodCategory);
  };

  
  apiCall = (foodCategory : string) => {
    //Richiama le API a te assegnate aggiungendo il nome della categoria passato come parametro
    const apiUrl = `https://emojihub.yurace.pro/api/all/category/${foodCategory}`;
    this.apiObservable = this.http.get<Root>(`${apiUrl}`); //Aggiungi un tipo di dati alla chiamata http.get
    this.apiObservable.subscribe(
      {
        next: this.handleApiResponse, //IF OK
        error: this.handleApiError    //IF ERROR
    }
    );
  }

  handleApiResponse = (response: any) => {
    console.log(response);
    this.someInf = response;
  };

  handleApiError = (error: any) => {
    console.log(error);
    alert('Si è verificato un errore nel caricamento dei dati.');
  };
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}