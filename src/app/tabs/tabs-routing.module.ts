import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import * as Constants from '../services/constants.service';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'qr-read',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../qr-read/qr-read.module').then(m => m.QrReadPageModule)
          }
        ]
      },
      {
        path: 'container-list',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/container-list/container-list.module').then( m => m.ContainerListPageModule)
          }
        ]
      },
      {
        path: 'container-details',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/container-details/container-details.module').then(m => m.ContainerDetailsPageModule)
          }
        ]
      },
      {
        path: 'container-details/:containerId',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/container-details/container-details.module').then(m => m.ContainerDetailsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: Constants.LANDINGPAGE,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: Constants.LANDINGPAGE,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
