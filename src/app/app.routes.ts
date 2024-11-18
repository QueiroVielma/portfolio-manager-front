import { Routes } from '@angular/router';
import { ProjectlistComponent } from './components/project/projectlist/projectlist.component';
import { ProjectdetailsComponent } from './components/project/projectdetails/projectdetails.component';
import { UserdetailsComponent } from './components/user/userdetails/userdetails.component';
import { ProjectupdateComponent } from './components/projectupdate/projectupdate.component';
import { ProjectinfoComponent } from './components/projectinfo/projectinfo.component';

export const routes: Routes = [
    {path: "", redirectTo: "projeto", pathMatch: 'full'},
    {path:"projeto", component: ProjectlistComponent},
    {path:"projeto/update", component: ProjectupdateComponent},
    {path:"projeto/info", component: ProjectinfoComponent},
    {path:"projeto/new", component: ProjectdetailsComponent},
    {path:"user", component: UserdetailsComponent},
    {path:"user/new", component: UserdetailsComponent},
];
