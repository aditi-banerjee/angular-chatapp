import { Injectable } from '@angular/core';
import { ROUTES } from 'src/app/shared/constants/route.constant';
import { EntityResponse } from 'src/app/shared/model/entity-response.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { Messages } from './message.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getMessagesList(): Observable<EntityResponse<Array<Messages>>> {
    return this.http.get<EntityResponse<Array<Messages>>>(environment.HOST_URL+ROUTES.MESSAGES);
  }

  sendMessage(message: string) {
    return this.http.post(environment.HOST_URL + '/api/rooms', {content: message});
  }
}
