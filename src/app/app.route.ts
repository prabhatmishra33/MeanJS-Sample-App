import { NgModule } from "@angular/core";
import { Route, Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { GroupsComponent } from "./groups/groups.component";



const appRoute : Routes = [
    { path :'' ,component : AppComponent , pathMatch:'full' }
    // { path : '' , redirectTo : 'groups' , pathMatch:'full'  },  
    // { path :'groups' ,component : GroupsComponent , pathMatch:'full' },

]

@NgModule({
 imports : [
     RouterModule.forRoot(appRoute)
 ],
 exports : [RouterModule]
})

export class AppRouter{

}