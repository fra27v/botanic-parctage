/***************
Usage:
import * as Constants from '../../services/constants.service';
Constants.MYVALUE;

**************/
export const DEFAULT_LANG: string = 'en';

export const PICTURES_PATH: string = 'photos';
export const PICTURES_THUMBNAIL_PATH: string = 'thumb';
export const PICTURES_MAXSIZE: number = 15*1024*1024; //if change: also in firebase storage rules and user messages

export const LANDINGPAGE: string = '/app/tabs/home';

export const TOAST_DURATION: number = 2000;
