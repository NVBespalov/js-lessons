import { Injectable } from '@angular/core';
import { BehaviorSubject, from, interval, Observable } from 'rxjs';
import { flatMap, take, tap, toArray } from 'rxjs/operators';

const getRndInteger = (range) => {
    const min = 0;
    const max = range.length - 1;
    return range[Math.floor(Math.random() * (max - min + 1)) + min];
};

const take2ElementsRowLeft = (list, sY: number, cookieIndex) => {
    const prevLeft = cookieIndex - sY * Math.floor(cookieIndex / sY) > 0 && list[cookieIndex - 1];
    const prev2Left = cookieIndex - sY * Math.floor(cookieIndex / sY) > 1 && list[cookieIndex - 2];
    const result = [];
    typeof prevLeft === 'number' && result.push(prevLeft);
    typeof prev2Left === 'number' && result.push(prev2Left);
    return result;
};

const take2ElementsRowRight = (list, sY: number, cookieIndex) => {
    const cookieRowPosition = sY * Math.floor(cookieIndex / sY);
    const prevRight = cookieIndex - cookieRowPosition < sY - 1 && list[cookieIndex + 1];
    const prev2Right = cookieIndex - cookieRowPosition < sY - 2 && list[cookieIndex + 2];
    const result = [];
    typeof prevRight === 'number' && result.push(prevRight);
    typeof prev2Right === 'number' && result.push(prev2Right);
    return result;
};

const take2ElementsRowTop = (list, sY: number, cookieIndex) => {

    const prevTop = list[cookieIndex - sY];
    const prev2Top = list[cookieIndex - sY * 2];
    const result = [];
    typeof prevTop === 'number' && result.push(prevTop);
    typeof prev2Top === 'number' && result.push(prev2Top);
    return result;
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

    getAnimationState(index) {

        const [aIndex, bIndex] = this.highlightSubject.getValue();

        const direction = this.getMoveDirection();
        const isACookie = index === aIndex;
        const isBCookie = bIndex === index;

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

            if (columnChanged || rowChanged) {

                // this.detectCollisions();

                this.highlightSubject.next([aIndex, index]);
                //
                this.highlightSubject
                    .pipe(take(1))
                    .pipe(flatMap(_ => interval(1200)))
                    .pipe(take(1))
                    .pipe(tap(a => {
                        const fields = [...this.fieldSubject.getValue()];
                        const bCookie = fields[index];
                        const aCookie = fields[aIndex];
                        // const next = bCookie;
                        // const aCookie = fields[sRowIndex][sColumnIndex];
                        fields[aIndex] = bCookie;
                        fields[index] = aCookie;
                        this.detectCollisions(fields)
                        // // fields[sRowIndex][sColumnIndex] = next;
                        // this.fieldSubject.next(fields);
                        // this.highlightSubject.next([]);
                        // this.highlightSubject.next([]);

                    })).subscribe();


            }

        }

    };

    // @TBD
    private detectCollisions(fields) {
        const direction = this.getMoveDirection();
        const [aIndex, bIndex] = this.highlightSubject.getValue();

        const aCookie = fields[aIndex];
        const bCookie = fields[bIndex];

        if (direction === 'up' || direction === 'down') {
            const upperLeft = take2ElementsRowLeft(fields, this.sy, aIndex > bIndex ? bIndex : aIndex);
            const upperRight = take2ElementsRowRight(fields, this.sy, aIndex > bIndex ? bIndex : aIndex);
            const upperTop = take2ElementsRowTop(fields, this.sy, aIndex > bIndex ? bIndex : aIndex);
            debugger
        }
    }

    private getMoveDirection() {
        let [aIndex, bIndex] = this.highlightSubject.getValue();
        if (aIndex - this.sy === bIndex) {
            return 'up';
        }
        if (aIndex + this.sy === bIndex) {
            return 'down';
        }
        if (aIndex + 1 === bIndex) {
            return 'right';
        }
        if (aIndex - 1 === bIndex) {
            return 'left';
        }

    }
}
