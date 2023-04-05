import { Component } from '@angular/core';
import { ContainerService,Container } from '../../services/container.service';
import { Observable } from 'rxjs';
import { PicturesService } from '../../services/pictures.service';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.page.html',
  styleUrls: ['./container-list.page.scss'],
})
export class ContainerListPage  {

  containers: Observable<Container[]>;
  containerProfiles: string[]=[];

  constructor(
    public containerService: ContainerService,
    public pictureService: PicturesService,
  ) {}

  ionViewDidEnter() {
    let self=this;
    self.containers=self.containerService.getAllContainers();
    self.containers.subscribe( (containers) => containers.forEach(container => self.loadProfilePicture(container)) );

  }

  loadProfilePicture(container:Container):void{
    //console.log("loading img for "+pet.name);
    let profilePath:string=this.containerService.buildContainerImgPath(container.id);
    let self=this;
    self.pictureService.getImgUrl(profilePath).then( (url:string) => {
      container.profilePic=url;
      self.containerProfiles[container.id]=container.profilePic;
    }),
    (error)=>{};
  }

}
