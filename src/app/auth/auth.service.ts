import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://wifi.telit.com/one-edge-api/';
  constructor(private http: HttpClient, private messageService: MessageService) { }
  /** Post tags from the server */
  userLogin (model:any): Observable<any> {
    return this.http.post<any>(this.authUrl+"login", model.toString(), httpOptions)
      .pipe(
        tap(_ => this.log('Login Authentication')),
        catchError(this.handleError<any>('login', ""))
      );
  }
  logout(){
	  const modelParam = new HttpParams()
	  .set("sessionId", localStorage.sessionId);
	  return this.http.post<any>(this.authUrl+"logout", modelParam.toString(), httpOptions).pipe(
        tap(_ => this.log('Logout')),
        catchError(this.handleError<any>('Logout', ""))
      );
  }
  authenticate(){
	  const modelParam = new HttpParams()
	  .set("sessionId", localStorage.sessionId);
	  return this.http.post<any>(this.authUrl+"authenticate", modelParam.toString(), httpOptions).pipe(
        tap(_ => this.log('Authenticate User')),
        catchError(this.handleError<any>('Authenticate User', ""))
      );
  }
  register (model:any): Observable<any> {
    return this.http.post<any>(this.authUrl+"register", model.toString(), httpOptions)
      .pipe(
        tap(_ => this.log('Registration')),
        catchError(this.handleError<any>('Registration', ""))
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`Authentication: ${message}`);
  }
}
