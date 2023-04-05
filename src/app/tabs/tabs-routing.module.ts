import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
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
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
