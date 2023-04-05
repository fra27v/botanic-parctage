import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContainerListPageRoutingModule } from './container-list-routing.module';

import { ContainerListPage } from './container-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContainerListPageRoutingModule
  ],
  declarations: [ContainerListPage]
})
export class ContainerListPageModule {}
