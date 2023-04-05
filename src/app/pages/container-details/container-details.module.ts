import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContainerDetailsPageRoutingModule } from './container-details-routing.module';

import { ContainerDetailsPage } from './container-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContainerDetailsPageRoutingModule
  ],
  declarations: [ContainerDetailsPage]
})
export class ContainerDetailsPageModule {}
