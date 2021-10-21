import { Component, OnInit } from '@angular/core';
import { Crew } from 'src/app/model/crew';
import { Player } from 'src/app/model/player';
import { Product } from 'src/app/model/product';
import { ProductCrew } from 'src/app/model/product-crew';
import { Spacecraft } from 'src/app/model/spacecraft';
import { PlayerService } from 'src/app/shared/player.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  
  spacecraft: Spacecraft = new Spacecraft(0,"", 0, 0);

  product: Product = new Product(0, "", 0, 0, 0, 0, 0, true, 0, true);
  productCrew: ProductCrew[] = [];
  player: Player = new Player(0, "","", new Crew(0, "", 0, 0, this.spacecraft, this.productCrew));

  chosenPlayer: Player = new Player(0, "","", new Crew(0, "", 0, 0, this.spacecraft, this.productCrew));
  
  players: Player[] = [];
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.findPlayer(18).subscribe(player => this.player = player);

    this.playerService.findAll().subscribe(players => this.players = players);
  }


}
