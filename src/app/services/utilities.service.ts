import { Injectable } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import * as Constants from './constants.service';


@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    private toastCtrl: ToastController,
    private modalController: ModalController,
    public alertController: AlertController,
  ) { 

  }

  public dismissModal(success?: Object, error?: any) {
    this.modalController.dismiss({
      'success': success,
      'error': error
    });
  }

  public async showToast(msg: string):Promise<any> {
    return this.toastCtrl
      .create({
        message: msg,
        duration: Constants.TOAST_DURATION,
      })
      .then((toast) => toast.present());
  }

  public showConfirm(title: string,body: string,callback: Function,buttonYes:string,buttonNo:string) {
    this.alertController.create({
      header: title,
      message: body,
      cssClass:'alertdesign-class',
      buttons: [
        {
          text: buttonYes,
          handler: () => {
            callback();
          }
        },
        {
          text: buttonNo,
          handler: () => {
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  public showAlertCallback(title: string,body: string,buttonText: string,callback: Function) {
    this.alertController.create({
      header: title,
      message: body,
      cssClass:'alertdesign-class',
      buttons: [
        {
          text: buttonText,
          handler: () => {
            callback();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  public getLanguage():string{
    let browserLang:string = navigator.language;//get navigator language and country
    return browserLang.substring(0,2);//get the language only
  }

}
