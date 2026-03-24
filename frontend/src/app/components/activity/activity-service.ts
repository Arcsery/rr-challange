import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivityResponseDto} from './dto/ActivityResponseDto';
import {ActivityRequestDto} from './dto/ActivityRequestDto';
import {ActivityResponsibleReportDto} from './dto/ActivityResponsibleReportDto';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/activities';

  create(request: ActivityRequestDto): Observable<ActivityResponseDto> {
    return this.http.post<ActivityResponseDto>(this.baseUrl, request);
  }

  update(id: number, request: ActivityRequestDto): Observable<ActivityResponseDto> {
    return this.http.put<ActivityResponseDto>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getResponsibleActivityReport(): Observable<ActivityResponsibleReportDto[]> {
    return this.http.get<ActivityResponsibleReportDto[]>(`${this.baseUrl}/responsible-report`);
  }
}
