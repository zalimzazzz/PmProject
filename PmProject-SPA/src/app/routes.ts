import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { ListsResolver } from './_resolvers/lists.resolver';
import { CompanyComponent } from './company/company.component';
import { TemplateServiceOrderComponent } from './template-service-order/template-service-order.component';
import { TemplateServiceOrderAddEditComponent } from './template-service-order/template-service-order-add-edit/template-service-order-add-edit.component';
import { ProjectComponent } from './project/project.component';
import { ProjectAddEditComponent } from './project/project-add-edit/project-add-edit.component';
import { ServiceOrderComponent } from './service-order/service-order.component';
import { ServiceOrderAddEditComponent } from './service-order/service-order-add-edit/service-order-add-edit.component';
import { ExportComponent } from './project/export/export.component';
import { ServiceOrderTechnicianComponent } from './service-order-technician/service-order-technician.component';
import { ServiceOrderTechnicianEditComponent } from './service-order-technician/service-order-technician-edit/service-order-technician-edit.component';
import { LoginComponent } from './login/login.component';
import { AppRootComponent } from './app-root/app-root.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
    // { path: '', component: AppRootComponent },
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        component: AppRootComponent,
        children: [
            {
                path: 'members', component: MemberListComponent,
                resolve: { users: MemberListResolver }
            },
            {
                path: 'members/:id', component: MemberDetailComponent,
                resolve: { user: MemberDetailResolver }
            },
            {
                path: 'member/edit', component: MemberEditComponent,
                resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChanges]
            },
            { path: 'messages', component: MessagesComponent },
            {
                path: 'lists', component: ListsComponent,
                resolve: { users: ListsResolver }
            },
            {
                path: 'company', component: CompanyComponent,
            },
            { path: 'template', component: TemplateServiceOrderComponent },
            { path: 'template/add', component: TemplateServiceOrderAddEditComponent },
            { path: 'template/edit/:id', component: TemplateServiceOrderAddEditComponent },
            { path: 'project', component: ProjectComponent },
            { path: 'project/add', component: ProjectAddEditComponent },
            { path: 'project/edit/:id', component: ProjectAddEditComponent },
            { path: 'project/export/:id', component: ExportComponent },
            { path: 'serviceOrder', component: ServiceOrderComponent },
            { path: 'serviceOrder/:mode/:projecid', component: ServiceOrderAddEditComponent },
            { path: 'serviceOrder/edit/:id/:projecid', component: ServiceOrderAddEditComponent },
            { path: 'service-order/technician', component: ServiceOrderTechnicianComponent },
            { path: 'service-order/technician/:id/:projecid', component: ServiceOrderTechnicianEditComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
