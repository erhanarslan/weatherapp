import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../../models/weather.model';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService){}

  isLoading:boolean=false;
  cityName:string ='Istanbul';
  weatherData? : WeatherData;
iconUrl: string = ''
  
 
  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }


  onSubmit(){
    this.isLoading=false;
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(cityName: string){
    this.weatherService.getWeatherData(cityName).subscribe({
      next : (response) => {
        this.isLoading=true;
        this.weatherData = response;
        console.log(response);
        this.iconUrl = "http://openweathermap.org/img/w/" + this.weatherData.weather[0].icon + ".png";
        },
      error:(e) => {
        console.log(e);
        alert(e.message)
      }
    })
  }
}
