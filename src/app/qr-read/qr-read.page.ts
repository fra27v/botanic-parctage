import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import jsQR from 'jsqr';
import { UtilitiesService } from '../services/utilities.service';
import { Router, NavigationExtras  } from '@angular/router';
import { ContainerService } from '../services/container.service';


@Component({
  selector: 'app-qr-read',
  templateUrl: 'qr-read.page.html',
  styleUrls: ['qr-read.page.scss']
})
export class QrReadPage {
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult = null;
  loading: HTMLIonLoadingElement = null;

  constructor(
    private loadingCtrl: LoadingController,
    private plt: Platform,
    public utilities: UtilitiesService,
    private route:Router,
    private containerService:ContainerService,
  ) {
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }


  reset() {
    this.scanResult = null;
  }

  stopScan() {
    this.scanActive = false;
  }

  async startScan() {
    // Not working on iOS standalone mode!
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
  
    this.videoElement.srcObject = stream;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);
  
    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
  
    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }
  
  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
  
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
  
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
  
      if (code) {
        this.scanActive = false;
        let searchRegExp = new RegExp("[\\\/\\\?\\\\:\\\&\\\\]", 'g'); // Throws SyntaxError
        this.scanResult = code.data.replace(searchRegExp,"");
        this.containerService.doesContainerExist(this.scanResult).then( (bExists) => {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              new: bExists
            }
          };
          this.utilities.showConfirm(
            "Plante non enregistrée",
            "Voulez-vous enregistrer une nouvelle plante?",
            () => { 
              this.route.navigate(['/tabs/container-details/'+this.scanResult], navigationExtras); 
            },
            "Créer",
            "Annuler");
        } );

      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

}
