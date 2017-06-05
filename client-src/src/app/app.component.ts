import { Component, OnInit } from '@angular/core';
import { AppContext, PlayerService } from './core'
import { Player } from './playing/views';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(
    private appContext: AppContext, // initialize app context
    public playerService: PlayerService,
  ) { }

  ngOnInit() { }
}
