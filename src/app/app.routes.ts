import { Routes } from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { LoginComponent } from './Components/login/login.component';
import { RealLogComponent } from './Components/real-log/real-log.component';
import { LandingpageComponent } from './Components/landingpage/landingpage.component';
import { AboutComponent } from './Components/about/about.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './app/Admindash/admin/admin.component';
import { UserComponent } from './app/UserDash/user/user.component';
import { RoleGuard } from './role-guard.guard';

import { AddRoutesComponent } from './app/Admindash/add-routes/add-routes.component';
import { AddBusComponent } from './app/Admindash/addbus/addbus.component';
import { UsersComponent } from './app/Admindash/users/users.component';
import { SearchComponent } from './app/UserDash/search/search.component';
import { BookingsComponent } from './app/UserDash/bookings/bookings.component';
import { ChatUserComponent } from './app/UserDash/chat-user/chat-user.component';
import { ChatAdminComponent } from './app/Admindash/chat-admin/chat-admin.component';


export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomePageComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Create', component: CreateAccountComponent },
  { path: 'Login/RealLogin', component: RealLogComponent },
  { path: 'landing', component: LandingpageComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], children: [
    { path: 'addbus', component: AddBusComponent },
    {path:'addroutes',component:AddRoutesComponent},
    {path:'', component: AddBusComponent },{
        path:'Users',component:UsersComponent},
        {
          path:'chatadmin',component:ChatAdminComponent
        }
        
    
  ]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], children:[
    {path:'find',component:SearchComponent},
    {path:'bookings',component:BookingsComponent},
    {
      path:'find/chatuser',component:ChatUserComponent
    }

  ]}
];