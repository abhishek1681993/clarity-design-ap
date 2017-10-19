/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from "@angular/core";

//import service
import { AppService } from "../app.service";

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    private usersInformation: any [] = [];
    constructor(private appService: AppService ) {
    }

    ngOnInit() {
        this.appService.getUsers()
        .subscribe((userInformation) => {
            this.usersInformation = userInformation;
        }, error => {
            console.log(error)
        })
    }
}
