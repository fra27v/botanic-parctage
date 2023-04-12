import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ContainerService,Container } from '../../services/container.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Subscription } from 'rxjs';
import { PicturesService } from '../../services/pictures.service';
import * as Constants from '../../services/constants.service';

@Component({
  selector: 'app-container-details',
  templateUrl: './container-details.page.html',
  styleUrls: ['./container-details.page.scss'],
})
export class ContainerDetailsPage {

  //input element for profile img upload
  @ViewChild('profileImgInput') profileImgInputViewChild: ElementRef;
  public profileImgInputElement: HTMLInputElement;

  container: Container;
  name:string;
  containerSubrscription:Subscription;
  profileImgUrl: string="";
  isPopoverOpen:boolean = false;

  //messages
  msgSaved:string="Data saved";
  msgGenericError:string="Something went wrong";

  constructor(
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public containerService: ContainerService,
    public utilities: UtilitiesService,
    public pictureService: PicturesService,
  ) {
    this.container=this.containerService.newContainerStructure();
  }

  updateImgUrl(){
    let path:string=this.containerService.buildContainerImgPath(this.container.id);
    let self=this;
    this.pictureService.getImgUrl(path).then(
      (newUrl)=> {
       self.profileImgUrl=newUrl; 
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  ionViewWillEnter() {
    const containerId = this.route.snapshot.paramMap.get('containerId');
    let isNew=null;
    this.route.queryParams.subscribe(params => {
      if (params && params.new) {
        isNew = JSON.parse(params.new);
      }
    });
    //console.log("isNew="+isNew);
    if(containerId)
    {
      this.container=this.containerService.newContainerStructure();
      
      if(!isNew){
      //existing one
        let self=this;
        this.containerSubrscription=this.containerService.getContainer(containerId).subscribe({
          next(container) {
            self.container=container;
            self.updateImgUrl();
          },
        });
      }
      else{
        this.container.id=containerId;
      }

    }
  }

  ngAfterViewInit() {
    this.profileImgInputElement = this.profileImgInputViewChild.nativeElement;
  };

  ionViewDidLeave(){
    if(this.containerSubrscription){
      this.containerSubrscription.unsubscribe();
    }
  }

  loadImageFromDevice(event) {
    //check ID exists; otherwise save, getID, then push file
    if(this.container.id){
      this.uploadProfileImg(event);
    }
    else{
      this.recordContainerDetails().then(
        () => {
          this.uploadProfileImg(event);
        },
        (error) => {
          this.utilities.showToast(this.msgGenericError);
          console.log(error);          
        }
      );
    }
  };

  uploadProfileImg(event){
    let path:string=this.containerService.buildContainerImgFolderPath(this.container.id);
    let filename:string=Constants.PROFILE_IMG_FILENAME;
    this.pictureService.resizeImage(event.target.files[0],Constants.PROFILE_IMG_MAXPX,filename).then(
      (reducedImg) => {
        this.pictureService.pushFileToStorage(reducedImg,path,filename).then(
          (uploadResults) => {
            //console.log(uploadResults);
            this.utilities.showToast(this.msgSaved);
            this.updateImgUrl();
            //save the container, to avoir orphans images
            this.save();
          },
          (error) => {
            this.utilities.showToast(this.msgGenericError);
            console.log(error);
          }
        );
      },
      (error) =>{
        this.utilities.showToast(this.msgGenericError);
        console.log(error);        
      }
    );
  }

  logData(){
    console.log(this.container);
  }

  openModal():void{
    //console.log("open modal");
    this.isPopoverOpen=true;
  }

  formatDate(value: string |string[]) {
    let dateStr:string=value as string;
    let selectedDate:Date=new Date(dateStr);
    return selectedDate.toLocaleDateString();
  }

  save():void{
    this.recordContainerDetails().then(() => {
        this.utilities.showToast(this.msgSaved);
      }, err => {
        this.utilities.showToast(this.msgGenericError);
        console.log(err);
    });
  }

  recordContainerDetails():Promise<any>{
    if(this.container.id){
      return this.containerService.saveContainer(this.container);
    }
    else{
        return this.containerService.newContainer(this.container).then(
          (result) => {
            this.container.id=result.id;
            return (result)
          },
          (error) =>{
            return(error);
          }
        );
			;
    }
  }

}
