import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private toastr: ToastrService) {
    }

    intercept(req, next) {
        const superHeaders = {
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        };

        // if auth token available add Bearer
        /*if (this.authService.getToken()) {
            superHeaders['Authorization'] = `Bearer ${this.authService.getToken()}`;
        }*/

        const clonedReq = req.clone({
            setHeaders: superHeaders
        });

        return next.handle(clonedReq).pipe(tap(
            event => {
            },
            err => {
                if (err instanceof HttpErrorResponse) {
                    // if (this.authService.isLoggedIn() && err.status === 401) {
                    if (err.status === 401) {
                        console.log(err);
                        // this.authService.logoutUser();
                    } else if (err.status === 403) {
                        console.log(err);
                        const msg = 'You are not authorized to access ' + err.url;
                        /*this.toastr.error(msg, 'Unauthorized', {
                            closeButton: true
                        });
                        this.router.navigate(['']);*/
                    } else {
                        /*this.toastr.error(err.message, 'An error occurred', {
                            closeButton: true
                        });*/
                    }
                }
            })
        );
    }
}
