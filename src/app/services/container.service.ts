import { Injectable } from '@angular/core';
import { getDoc, where,Firestore,query,docData, collectionData,CollectionReference, collection,doc, addDoc,DocumentReference, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { traceUntilFirst } from '@angular/fire/performance';
import * as Constants from './constants.service';

export interface Container {
  id?: string,
  name: string,
  description?: string,
  watering?: string,
  profilePic?: string,
}

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  public containerCollection:CollectionReference<Container>;
  public lookedContainers: Observable<Container[]>;

  constructor(
    public firestore: Firestore
  ) { 
    this.containerCollection = collection(firestore, Constants.CONTAINER_COLLECTION).withConverter<Container>({
      fromFirestore: snapshot => {
        const  {name, description,watering,profilePic} = snapshot.data();
        const { id } = snapshot;
        return { id, name, description,watering,profilePic };
      },
      toFirestore: (it: any) => it,
    });
  }

  newContainerStructure():Container{
    return {name:"",description:"",watering:null,profilePic:null};
  }

  getContainer(containerId:string):Observable<Container>{
    let docRef=doc(this.containerCollection,containerId);
    return docData(docRef);
  }

  async doesContainerExist(containerId:string):Promise<boolean>{
    let docRef=doc(this.containerCollection,containerId);
    return getDoc(docRef).then( (doc) => {
      if(doc.exists){
        return true;
      }
      return false;
    }
    );
  }

  getAllContainers():Observable<Container[]>{
    let containersQuery = query(this.containerCollection);
    this.lookedContainers = collectionData(containersQuery).pipe(
      traceUntilFirst(Constants.CONTAINER_COLLECTION)
    );
    return this.lookedContainers;
  }

  saveContainer(container:Container):Promise<void>{
    return setDoc(doc(this.containerCollection,container.id),container);
  }

  newContainer(container:Container):Promise<DocumentReference>{
    return addDoc(this.containerCollection,container);
  }

  buildContainerImgPath(containerId:string):string{
    return this.buildContainerImgFolderPath(containerId)+"/"+Constants.PROFILE_IMG_FILENAME;
  }
  buildContainerImgFolderPath(containerId:string):string{
    return Constants.PICTURES_PATH+"/"+containerId;
  }
}
