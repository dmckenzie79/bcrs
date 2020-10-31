/* ============================================
 ; Title:  app-routing.module.ts
 ; Author: Zach Dahir, Jeff Lintel, Diandra McKenzie
 ; Date:   19 October 2020
 ; Description: app routing module
 ===========================================*/

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SessionGuard } from './shared/guard/session.guard';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component';
import { VerifyUsernameFormComponent } from './pages/verify-username-form/verify-username-form.component';
import { ResetPasswordFormComponent } from './pages/reset-password-form/reset-password-form.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/create/new',
        component: UserCreateComponent
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      }
    ],
    canActivate: [SessionGuard]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsFormComponent
      },
      {
        path: 'forgot',
        component: VerifyUsernameFormComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent
      },
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: '500',
        component: ServerErrorComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
