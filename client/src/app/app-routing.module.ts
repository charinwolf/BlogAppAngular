import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', component: HomeComponent },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'create', component: CreatePostComponent },
        { path: 'post/:id', component: PostPageComponent },
        { path: 'edit/:id', component: EditPostComponent },
    ]}
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}











