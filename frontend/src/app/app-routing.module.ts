import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './pages/user-auth/user-auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'auth',
    component: UserAuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
