import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageChatComponent } from './component/page-chat/page-chat.component';

const routes: Routes = [
  { path: '**', component: PageChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
