import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { flatMap, take, tap, toArray } from 'rxjs/operators';

const getRndInteger = (range) => {
    const min = 0;
    const max = range.length - 1;
    return range[Math.floor(Math.random() * (max - min + 1)) + min];
};

@Injectable({
    providedIn: 'root'
})
export class GameApiService {
    sx = 9;
    sy = 9;
    private fieldSubject = new BehaviorSubject([]);
    readonly field$ = this.fieldSubject.asObservable().pipe(tap(console.log));
    private highlightSubject = new BehaviorSubject([]);
    public readonly highlight$ = this.highlightSubject.asObservable().pipe(tap(console.log));

    sprites$: Observable<number[]>;

    start = () => {
        this.fieldSubject.next(this.shuffle(this.sx, this.sy));
    };
    shuffle = (sx = 9, sy = 9, max = 4) => {
        const available = [...new Array(max + 1).keys()];
        return new Array(sx * sy)
            .fill(0)
            .reduce((rows, cookieName, cookieIndex) => {
                const prevLeft = cookieIndex - sy * Math.floor(cookieIndex / sy) > 0 && rows[cookieIndex - 1];
                const upper = rows[cookieIndex - sy];
                if (typeof upper === 'number') {
                    return [...rows, getRndInteger(available.filter(a => a !== upper).filter(a => a !== prevLeft))];
                }
                return [...rows, getRndInteger(available.filter(a => a !== prevLeft))];
            }, []);
    };

    getAnimationState(row, column) {

        const [aR, aC, bR, bC] = this.highlightSubject.getValue();
        const isACookie = aR === row && aC === column;
        const isBCookie = bR === row && bC === column;
        const direction = this.getMoveDirection();
        if (isACookie && direction === 'right') {
            return 'right';
        }
        if (isBCookie && direction === 'right') {
            return 'left';
        }
        if (isACookie && direction === 'left') {
            return 'left';
        }
        if (isBCookie && direction === 'left') {
            return 'right';
        }

        if (isACookie && direction === 'up') {
            return 'up';
        }
        if (isBCookie && direction === 'up') {
            return 'down';
        }
        if (isACookie && direction === 'down') {
            return 'down';
        }
        if (isBCookie && direction === 'down') {
            return 'up';
        }
    }

    getCookieAssetName = (name: number, highlighted: boolean) => {
        let result = ['', '@2x.png'];
        switch (name) {
            case 0:
                result = ['Croissant', ...result];
                break;
            case 1:
                result = ['Cupcake', ...result];
                break;
            case 2:
                result = ['Danish', ...result];
                break;
            case 3:
                result = ['Donut', ...result];
                break;
            case 4:
                result = ['SugarCookie', ...result];
        }
        if (highlighted) {
            result[1] = '-Highlighted';
        }
        return ['assets/cookies/', ...result].join('');
    };

    isHighLighted(row) {
        return this.highlightSubject.getValue()[0] === row;
    }

    highlight = (index) => {
debugger
        const [aIndex, bIndex] = this.highlightSubject.getValue();
        if (index === aIndex) {
            return this.highlightSubject.next([]);
        }
        if (!aIndex && !bIndex) {
            return this.highlightSubject.next([index]);
        }
        if (typeof aIndex === 'number') {

            const columnChanged = aIndex - this.sy === index || aIndex + this.sy === index;
            const rowChanged = aIndex + 1 === index || aIndex - 1 === index;


            // const rowChanged = aIndex ;
            // const columnChanged = sColumnIndex !== columnIndex && sRowIndex === rowIndex && availableColumn;

            if (columnChanged || rowChanged) {

                // this.detectCollisions();

                this.highlightSubject.next([aIndex, index]);
                //
                this.highlightSubject
                    .pipe(take(1))
                    // .pipe(flatMap(_ => interval(1200)))
                    // .pipe(take(1))
                    .pipe(tap(a => {
                        const fields = [...this.fieldSubject.getValue()];
                        const bCookie = fields[index];
                        const aCookie = fields[aIndex];
                        // const next = bCookie;
                        // const aCookie = fields[sRowIndex][sColumnIndex];
                        fields[aIndex] = bCookie;
                        fields[index] = aCookie;
                        // fields[sRowIndex][sColumnIndex] = next;
                        this.fieldSubject.next(fields);
                        // this.highlightSubject.next([]);
                        // this.highlightSubject.next([]);

                    })).subscribe();


            }

        }

    };

    // @TBD
    private detectCollisions() {
        const direction = this.getMoveDirection();
        const [aR, aC, bR, bC] = this.highlightSubject.getValue();
        const cookies = this.fieldSubject.getValue();
        const aCookie = cookies[aR][aC];
        const bCookie = cookies[bR][bC];

        // a => down
        const aleft = cookies[bR][bC - 1];
        const aright = cookies[bR][bC + 1];
        const adown = cookies[bR - 1][bC];
        const ahit = aCookie === aleft && aCookie === aright;
        // b => up
        const bleft = cookies[aR][aC - 1];
        const bright = cookies[aR][aC + 1];
        const bup = cookies[aR + 1][aC];
        const bhit = bCookie === bleft && bCookie === bright;
        // debugger;
    }

    private getMoveDirection() {
        let [aR, aC, bR, bC] = this.highlightSubject.getValue();
        if (aR !== bR) {
            if (aR < bR) {
                return 'down';
            }
            if (aR > bR) {
                return 'up';
            }
        }
        if (aR === bR && aC !== bC) {
            if (aC > bC) {
                return 'left';
            }
            if (aC < bC) {
                return 'right';
            }
        }
    }
}
