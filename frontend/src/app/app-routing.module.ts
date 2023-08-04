import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PostDataComponent } from './components/post-data/post-data.component';
import { GetDataComponent } from './components/get-data/get-data.component';
import { AuthGuard } from './services/auth.guard';

/**
 * This is the routes constant. It contains all the routes of the application.
 */
const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'post-data',
    component: PostDataComponent,
    canActivate: [AuthGuard],
  },
  { path: 'get-data', component: GetDataComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
