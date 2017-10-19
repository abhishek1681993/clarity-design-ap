/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component,Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector:'user-info',
    styleUrls: ['./users.component.scss'],
    templateUrl: './users.component.html'
})
export class UsersComponent {
    @Input('userInformation') userInformation : any;
    open: Boolean = false;

    constructor(private router: Router) {
        this.userInformation = this.userInformation || {}
    }

    navigateTo(navigateTo: any){
        this.router.navigate(['users/'+ navigateTo['id']])
    }

}
