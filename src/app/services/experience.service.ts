import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiServerUrl = 'https://portfoliomedina.herokuapp.com';

  constructor(private http: HttpClient) {}

  public getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiServerUrl}/api/experience`);
  }
  public addExperience(education: Experience): Observable<Experience> {
    return this.http.post<Experience>(
      `${this.apiServerUrl}/api/experience`,
      education
    );
  }
  public updateExperience(education: Experience): Observable<Experience> {
    return this.http.put<Experience>(
      `${this.apiServerUrl}/api/experience`,
      education
    );
  }
  public deleteExperience(experienceId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/api/experience/${experienceId}`
    );
  }
}
