import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-row',
    templateUrl: './row.component.html',
    styleUrls: ['./row.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent implements OnInit {
    @Input() row: number[];
    @Input() index: number;
    @Input() sprites: number[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
