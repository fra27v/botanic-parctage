import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage,uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(
    private storage: Storage
  ) { }


  pushFileToStorage(fileUpload: File,path:string,filename:string): Promise<any> {
    let filePath:string = `${path}/${filename}`;
    const storageRef = ref(this.storage,filePath);
    return uploadBytes(storageRef,fileUpload);
  }

  async resizeImage(file: File,maxDim:number,fileName:string):Promise<File> {
    return this.resizeImageBlob(file,maxDim).then(
      blob =>{
        return( this.blobToFile(blob,fileName));
      }
    );
  }

  getImgUrl(path: string):Promise<string>{
    const storageRef = ref(this.storage,path);
    return getDownloadURL(storageRef);
  }


  private blobToFile(theBlob: Blob, fileName:string): File{
    let b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    Object.defineProperties(b, {
      lastModified: {
        writable: true
      },
      name: {
        writable: true
      }
    });
    b.lastModified = new Date().getUTCMilliseconds();
    b.name = fileName;
    //Cast to a File() type
    return <File>theBlob;
  }

  private resizeImageBlob(file: File,maxDim:number):Promise<Blob> {
    let maxWidth=maxDim;
    let maxHeight=maxDim;
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
          let width = image.width;
          let height = image.height;
          
          if (width <= maxWidth && height <= maxHeight) {
              resolve(file);
          }

          let newWidth;
          let newHeight;

          if (width > height) {
              newHeight = height * (maxWidth / width);
              newWidth = maxWidth;
          } else {
              newWidth = width * (maxHeight / height);
              newHeight = maxHeight;
          }

          let canvas = document.createElement('canvas');
          canvas.width = newWidth;
          canvas.height = newHeight;
          //console.log("new dim: "+newWidth+"x"+newHeight);
          let context = canvas.getContext('2d');

          context.drawImage(image, 0, 0, newWidth, newHeight);

          canvas.toBlob(resolve, file.type);
      };
      image.onerror = reject;
    });
  }

}
