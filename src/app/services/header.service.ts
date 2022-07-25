import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Info } from '../models/info';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private apiServerUrl = 'https://portfoliomedina.herokuapp.com';

  constructor(private http: HttpClient) {}

  public getInfo(): Observable<Info> {
    return this.http.get<Info>(`${this.apiServerUrl}/api/info/1`);
  }
  public updateInfo(info: Info): Observable<Info> {
    return this.http.put<Info>(`${this.apiServerUrl}/api/info`, info);
  }
}
