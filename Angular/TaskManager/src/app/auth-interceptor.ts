import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import 'rxjs/add/operator/do';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public authToken;
    public changedReq;
    constructor(private router: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authToken = sessionStorage.getItem("OAUTH_KEY");
        if (req.url.indexOf('/tm/') != -1) {
            this.changedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.authToken) });
        } else {
            this.changedReq = req;
        }
        return next.handle(this.changedReq).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // successful responses
           }
        }, (error: any) => {
            console.log(error);
            if (error instanceof HttpErrorResponse) {
               // if (error.status === 401) {
                    this.router.navigate(['login']);
               // }
            }
        });
    }
}