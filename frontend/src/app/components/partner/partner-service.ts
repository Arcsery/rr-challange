import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {QualificationType} from '../enums/QualificationType';
import {Observable} from 'rxjs';
import {PartnerResponseDto} from './dto/PartnerResponseDto';
import {PartnerRequestDto} from './dto/PartnerRequestDto';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/partners';

  getAll(qualifications?: QualificationType[]): Observable<PartnerResponseDto[]> {
    let params = new HttpParams();

    qualifications?.forEach(qualification => {
      params = params.append('qualification', qualification);
    })
    return this.http.get<PartnerResponseDto[]>(this.baseUrl, { params });
  }

  create(request: PartnerRequestDto): Observable<PartnerResponseDto> {
    return this.http.post<PartnerResponseDto>(this.baseUrl, request);
  }
}
