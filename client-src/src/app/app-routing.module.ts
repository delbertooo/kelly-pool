import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { CurrentPlayerLoadedGuard } from './core';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/play', pathMatch: 'full' },
      { path: 'play', loadChildren: './playing/playing.module#PlayingModule' },
      { path: '**', component: PageNotFoundComponent },
    ], { useHash: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }