import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  //http://localhost:8080/player/17
  constructor(private http: HttpClient) {}

  findPlayer(id: number): Observable<Player>{
    return this.http.get<Player>("http://localhost:8080/player/" + id);
  }

  findAll(): Observable<Player[]>{
    return this.http.get<Player[]>("http://localhost:8080/players");
  }
  getCrewPlayer(playerid: number): Observable<number>{
    return this.http.get<number>("http://localhost:8080/crewPlayer/" + playerid);
  }
}
