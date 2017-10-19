import { Injectable } from "@angular/core";
import { Http , RequestOptions, URLSearchParams} from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
@Injectable()
export class AppService {
    constructor(private http: Http) {
    }
    //#region api call
    private getUsersApi(): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/users')
            .map(this.extractData)
            .catch(this.handleError)
    }

    private getUserTodosApi(userId:string): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', userId);
        return this.http.get('https://jsonplaceholder.typicode.com/todos',{search: params})
            .map(this.extractData)
            .catch(this.handleError)
    }

    private updateTodoApi(todoId:string, data: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        let url = "https://jsonplaceholder.typicode.com/todos/" + encodeURIComponent(todoId)
        return this.http.put(url,data)
            .map(this.extractData)
            .catch(this.handleError)
    }

    private deleteTodoApi(todoId:string): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        let url = "https://jsonplaceholder.typicode.com/todos/" + encodeURIComponent(todoId)
        return this.http.delete(url)
            .map(this.extractData)
            .catch(this.handleError)
    }

    private extractData = (res: any) => {
        let body = res['_body'];
        body = body ? JSON.parse(body) : {};
        if (body.hasOwnProperty('message') && body.hasOwnProperty('name') && body.hasOwnProperty('code')) { // error from server
            throw body;
        } else {
            return body;
        }
    }
    private handleError = (error: Response | any) => {
        let errMsg: string;
        if (error instanceof Response) {
            const body: any = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || err || ''}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    //#endregion

    //#region consume api call
    public getUsers():Observable<any> {
        return this.getUsersApi()
    }

    public getUserTodos(userId: string):Observable<any> {
        return this.getUserTodosApi(userId)
    }

    public updateTodo(todoId: string, data: any): Observable<any> {
        return this.updateTodoApi(todoId, data)
    }

    public deleteTodo(todoId: string) {
        return this.deleteTodoApi(todoId);
    }
    //#endregion
}