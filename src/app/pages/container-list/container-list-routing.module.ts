import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerListPage } from './container-list.page';

const routes: Routes = [
  {
    path: '',
    component: ContainerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContainerListPageRoutingModule {}
