import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../app.service";
import * as _ from "lodash";
@Component({
    selector: 'todos',
    styleUrls: ['./todos.component.scss'],
    templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {
    private todos: any[];
    private userId: string = ''

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService) {
        this.todos = this.todos || [];
    }

    ngOnInit() {
        this.userId = this.activatedRoute.snapshot.params['id']
        if (this.userId) {
            this.getUserTodo()
        }
    }

    private getUserTodo() {
        this.appService.getUserTodos(this.userId)
            .subscribe((result) => {
                this.todos = result;
            }, error => console.log(error))
    }

    saveTodos() {
        this.appService.updateTodo(this.todos[0]['userId'], this.todos)
            .subscribe((result) => {
                this.router.navigate(['/home'])
                // this.todos = [];
                // delete result['id']
                // for (let key in result) {
                //     if (result.hasOwnProperty(key)) {
                //         this.todos.push(result[key]);
                //     }
                // }
            }, error => {
                console.log(error)
            })
    }

    removeTodo(item) {
        _.remove(this.todos,(element ) =>{
            return element['id'] == item['id']
        })
        this.appService.deleteTodo(item['id'])
            .subscribe((result) => {
                console.log(result)
                this.getUserTodo()
            })
    }
}
