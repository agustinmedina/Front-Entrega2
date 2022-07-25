import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private apiServerUrl = 'https://portfoliomedina.herokuapp.com';

  constructor(private http: HttpClient) {}

  public getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiServerUrl}/api/education`);
  }
  public addEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(
      `${this.apiServerUrl}/api/education`,
      education
    );
  }
  public updateEducation(education: Education): Observable<Education> {
    return this.http.put<Education>(
      `${this.apiServerUrl}/api/education`,
      education
    );
  }
  public deleteEducation(educationId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/api/education/${educationId}`
    );
  }
}
