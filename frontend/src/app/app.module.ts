import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { GetDataComponent } from './components/get-data/get-data.component';
import { PostDataComponent } from './components/post-data/post-data.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './components/notification/notification.component';
import { BackendInterceptor } from './services/backend.interceptor';
import { AuthGuard } from './services/auth.guard';
import { WebSocketComponent } from './components/web-socket/web-socket.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    GetDataComponent,
    PostDataComponent,
    NavbarComponent,
    NotificationComponent,
    WebSocketComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
