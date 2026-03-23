import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {QualificationType} from '../enums/QualificationType';
import {Observable} from 'rxjs';
import {PartnerResponseDto} from './dto/PartnerResponseDto';
import {PartnerRequestDto} from './dto/PartnerRequestDto';
import {PartnerDetailDto} from './dto/PartnerDetailDto';

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

  getDetailsById(partnerId: number): Observable<PartnerDetailDto> {
    return this.http.get<PartnerDetailDto>(`${this.baseUrl}/${partnerId}`);
  }

  create(request: PartnerRequestDto): Observable<PartnerResponseDto> {
    return this.http.post<PartnerResponseDto>(this.baseUrl, request);
  }

  update(id: number, request: PartnerRequestDto): Observable<PartnerResponseDto> {
    return this.http.put<PartnerResponseDto>(
      `${this.baseUrl}/${id}`,
      request
    );
  }

  delete(id: number) {
    return this.http.delete(
      `${this.baseUrl}/${id}`
    );
  }
}
