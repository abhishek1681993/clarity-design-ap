import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from './users/users.component';
import { TodosComponent } from "./todos/todos.component";

import { AppService } from "./app.service";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UsersComponent,
        TodosComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule,
        ROUTING
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
