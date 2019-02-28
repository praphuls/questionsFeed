import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowQuestionsFeedComponent } from './feeds/components/show-questions-feed/show-questions-feed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule }  from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule , MatInputModule , MatButtonModule } from '@angular/material';
import { QuestionFilterPipe } from './shared/question-filter.pipe';
import {RouterModule, Routes} from '@angular/router';
import { ShowQuestionComponent } from './feeds/components/show-question/show-question.component';
import { PageNotFoundComponent } from './feeds/components/page-not-found/page-not-found.component';
import {FormsModule} from '@angular/forms';



const routes: Routes = [
  { path: '', redirectTo:'', pathMatch: 'full', component: ShowQuestionsFeedComponent },
  { path: 'ques/:id',  component: ShowQuestionComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ShowQuestionsFeedComponent,
    QuestionFilterPipe,
    ShowQuestionComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
