import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, delay, finalize, map, retryWhen, tap, timeout } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

export const retryCount = 3;
export const retryWaitMilliSeconds = 1000;
export const timeoutMilliSeconds = 10000;
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private loadingController: LoadingController) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        //Commented out loading icon as it was redundant while skeleton text is present on pages. Remains here
        //To demonstrate how an interceptor could be used to provide a loading animation for any call

        // this.loadingController.getTop().then(hasLoading => {
        //     if (!hasLoading) {
        //         this.loadingController.create({
        //             spinner: 'bubbles',
        //             message: 'Loading...'
        //         }).then(loading => loading.present());
        //     }
        // });

        return next.handle(request).pipe(
            timeout(timeoutMilliSeconds),
            retryWhen(error => {
                let retries = 1;
                return error.pipe(
                    delay(retryWaitMilliSeconds),
                    tap(() => {
                        console.log("Retry");
                    }),
                    map(error => {
                        if (retries++ === 3) {
                            throw error;
                        }
                        return error;
                    })
                )

            }),
            catchError(err => {
                console.log("Error in interceptor: " + err);
                throw err;
            }), finalize(() => {
                this.loadingController.getTop().then(hasLoading => {
                    if (hasLoading) {
                        this.loadingController.dismiss();
                    }
                })
                console.log("Finalise");
            })
        );
    }
}


