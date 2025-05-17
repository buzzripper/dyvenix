import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent
{
    message: string;

    constructor(private route: ActivatedRoute)
    {
        this.route.queryParamMap.subscribe(params => {
            const msg = params.get('msg');

            if (!msg)
                this.message = "Hello!";
            else {
                this.message = decodeURIComponent(msg);
            }
        });
    }
}
