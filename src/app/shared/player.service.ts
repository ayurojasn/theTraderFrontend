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
    return this.http.get<Player>("http://localhost:8080/player/" + id, {
      withCredentials: true
    });
  }

  findAll(): Observable<Player[]>{
    return this.http.get<Player[]>("http://localhost:8080/players", {
      withCredentials: true
    });
  }
  getCrewPlayer(playerid: number): Observable<number>{
    return this.http.get<number>("http://localhost:8080/crewPlayer/" + playerid, {
      withCredentials: true
    });
  }

  getPlayerByName(playername: String): Observable<Player>{
    return this.http.get<Player>("http://localhost:8080/playerName/" + playername, {
    });
  }
}
