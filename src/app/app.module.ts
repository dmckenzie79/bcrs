/* ============================================
 ; Title:  app.module.ts
 ; Author: Zach Dahir, Jeff Lintel, Diandra McKenzie
 ; Date:   19 October 2020
 ; Description: app module
 ===========================================*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SessionGuard } from './shared/guards/session.guard';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CookieService } from 'ngx-cookie-service';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { UserListComponent } from './pages/user-list/user-list.component';
import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { MatTableModule } from '@angular/material/table';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { ErrorInterceptor } from './shared/interceptor/error.interceptor';
import { RegisterComponent } from './pages/register/register.component';
import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component';
import { VerifyUsernameFormComponent } from './pages/verify-username-form/verify-username-form.component';
import { ResetPasswordFormComponent } from './pages/reset-password-form/reset-password-form.component';
import { ChartModule } from 'primeng/chart';
import { InvoiceSummaryDialogComponent } from './dialog/invoice-summary-dialog/invoice-summary-dialog.component';
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    SignInComponent,
    UserListComponent,
    DeleteRecordDialogComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailsComponent,
    SecurityQuestionListComponent,
    UserCreateComponent,
    UserDetailsComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    ServerErrorComponent,
    RegisterComponent,
    VerifySecurityQuestionsFormComponent,
    VerifyUsernameFormComponent,
    ResetPasswordFormComponent,
    InvoiceSummaryDialogComponent,
    PurchasesByServiceGraphComponent,
    RoleListComponent,
    RoleDetailsComponent,
    RoleCreateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    MatStepperModule,
    MatListModule,
    ChartModule ,
    MatCheckboxModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
