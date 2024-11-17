import { Routes } from '@angular/router';
import { ProjectlistComponent } from './components/project/projectlist/projectlist.component';
import { ProjectdetailsComponent } from './components/project/projectdetails/projectdetails.component';
import { UserdetailsComponent } from './components/user/userdetails/userdetails.component';

export const routes: Routes = [
    {path: "", redirectTo: "projeto", pathMatch: 'full'},
    {path:"projeto", component: ProjectlistComponent},
    {path:"projeto/new", component: ProjectdetailsComponent},
    {path:"user", component: UserdetailsComponent},
    {path:"user/new", component: UserdetailsComponent},
];
