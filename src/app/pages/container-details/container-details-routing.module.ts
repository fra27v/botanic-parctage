import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerDetailsPage } from './container-details.page';

const routes: Routes = [
  {
    path: '',
    component: ContainerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContainerDetailsPageRoutingModule {}
