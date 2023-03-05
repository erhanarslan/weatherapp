import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { WeatherData } from '../models/weather.model';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseUrl :string ='https://api.openweathermap.org/data/2.5/weather?q='
  APIkey :string ='a568ec3b41906815971b2837b34eaf33'
  unit:string='metric'
  formatmode:string='json'

  constructor(private http: HttpClient) { }

  getWeatherData(cityName: string):Observable<WeatherData>{
    return this.http.get<WeatherData>(this.baseUrl + cityName + '&appid=' + this.APIkey +'&units=' +this.unit +'&mode=' +this.formatmode).pipe(
      catchError(this.handleError)
    )
  }
   // Handle API errors
   handleError(error: HttpErrorResponse) {
    return throwError(
      error.error);
  };

}


