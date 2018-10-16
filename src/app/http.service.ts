import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConfigService } from './config.service';


@Injectable()
export class HttpService {

    constructor(
        protected http: Http,    //A PROTECTED elérhetővé teszi kívűlről ezeket a változókat
        protected config: ConfigService) { }

    baseRequest(url, type, data?) {
        return new Promise((resolve, reject) => {
            if (data) {
                try {
                    data = JSON.stringify(data)
                } catch (err) {
                    reject("Hibás objeltum")
                }
            } else {
                data = {};
            }

            if (['put', 'post'].indexOf(type)> -1){
                this.http[type](url, data)//A kulcsot változóként is meg tudom adni.
                .forEach(
                    (response: Response) => {
                        resolve(response);
                    }
                )
            }else{
                this.http[type](url)
                .forEach(
                    (response: Response) => {
                        resolve(response);
                    }
                )
            }

        });
    }

    create(url: string, data: any) {
        return this.baseRequest(url, 'put',data)
    }

    read(url: string) {
        return this.baseRequest(url, 'get')
    }

    update(url: string, data: any) {
        return this.baseRequest(url, 'post',data)
    }

    delete(url: string ) {
        return this.baseRequest(url, 'delete')
    }
}
