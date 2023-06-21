import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from "@angular/router";
import { MatTableModule} from "@angular/material/table";
import { SafePipe } from './pipes/safe.pipe';
import { MatPaginatorModule} from "@angular/material/paginator";
import { NoopAnimationsModule} from "@angular/platform-browser/animations";
import { ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatIconModule} from "@angular/material/icon";
import { HeaderComponent } from './components/core/header/header.component';
import { MatMenuModule} from "@angular/material/menu";
import { MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewsListComponent,
    SafePipe,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
