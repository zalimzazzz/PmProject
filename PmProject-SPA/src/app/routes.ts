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
import { resolve } from 'dns';
import { CompanyResolver } from './_resolvers/company.resolver';
import { TemplateServiceOrderComponent } from './template-service-order/template-service-order.component';
import { TemplateServiceOrderAddEditComponent } from './template-service-order/template-service-order-add-edit/template-service-order-add-edit.component';
import { ProjectComponent } from './project/project.component';
import { ProjectAddEditComponent } from './project/project-add-edit/project-add-edit.component';
import { ServiceOrderComponent } from './service-order/service-order.component';
import { ServiceOrderAddEditComponent } from './service-order/service-order-add-edit/service-order-add-edit.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
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
                resolve: { company: CompanyResolver }
            },
            { path: 'template', component: TemplateServiceOrderComponent },
            { path: 'template/add', component: TemplateServiceOrderAddEditComponent },
            { path: 'template/edit/:id', component: TemplateServiceOrderAddEditComponent },
            { path: 'project', component: ProjectComponent },
            { path: 'project/add', component: ProjectAddEditComponent },
            { path: 'project/edit/:id', component: ProjectAddEditComponent },
            { path: 'serviceOrder', component: ServiceOrderComponent },
            { path: 'serviceOrder/add', component: ServiceOrderAddEditComponent },
            { path: 'serviceOrder/edit/:id', component: ServiceOrderAddEditComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
