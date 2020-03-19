import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { flatMap, take, tap } from 'rxjs/operators';

const getRndInteger = (range) => {
    const min = 0;
    const max = range.length - 1;
    return range[Math.floor(Math.random() * (max - min + 1)) + min];
};

@Injectable({
    providedIn: 'root'
})
export class GameApiService {
    private fieldSubject = new BehaviorSubject([]);
    readonly field$ = this.fieldSubject.asObservable().pipe(tap(console.log));
    private highlightSubject = new BehaviorSubject([]);
    public readonly highlight$ = this.highlightSubject.asObservable().pipe(tap(console.log));
    start = () => {
        this.fieldSubject.next(this.shuffle());
    };
    shuffle = (sx = 9, sy = 9, max = 4) => {
        const available = [...new Array(max + 1).keys()];
        return new Array(sx)
            .fill(new Array(sy).fill(0))
            .reduce((rows, row, rowIndex) => {
                return [...rows, row.reduce((rowAcc, rowItem, index) => {
                    const prevLeft = rowAcc[index - 1];
                    const upperRow = rows[rowIndex - 1];
                    if (upperRow && typeof upperRow[index] === 'number') {
                        return [...rowAcc, getRndInteger(available.filter(a => a !== upperRow[index]).filter(a => a !== prevLeft))];
                    }
                    return [...rowAcc, getRndInteger(available.filter(a => a !== prevLeft))];
                }, [])];
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

    isHighLighted(row, column) {
        return this.highlightSubject.getValue()[0] === row && this.highlightSubject.getValue()[1] === column;
    }

    highlight = (rowIndex, columnIndex) => {

        const [sRowIndex, sColumnIndex] = this.highlightSubject.getValue();
        if (rowIndex === sRowIndex && sColumnIndex === columnIndex) {
            return this.highlightSubject.next([]);
        }
        if (!sColumnIndex && !sRowIndex) {
            return this.highlightSubject.next([rowIndex, columnIndex]);
        }
        if (typeof sRowIndex === 'number' && typeof sColumnIndex === 'number') {
            // this.highlightSubject.next([]);
            const availableRow = sRowIndex - 1 === rowIndex || sRowIndex + 1 === rowIndex || sRowIndex === rowIndex;
            const availableColumn = sColumnIndex - 1 === columnIndex || sColumnIndex + 1 === columnIndex || sColumnIndex === columnIndex;

            const rowChanged = rowIndex !== sRowIndex && sColumnIndex === columnIndex && availableRow;
            const columnChanged = sColumnIndex !== columnIndex && sRowIndex === rowIndex && availableColumn;

            if (columnChanged || rowChanged) {
                // this.detectCollisions();
                this.highlightSubject.next([...this.highlightSubject.getValue(), rowIndex, columnIndex]);

                this.highlightSubject
                    .pipe(take(1))
                    .pipe(flatMap(_ => interval(1200)))
                    .pipe(take(1))
                    .pipe(tap(a => {
                        // const fields = this.fieldSubject.getValue();
                        // const next = fields[rowIndex][columnIndex];
                        // fields[rowIndex][columnIndex] = fields[sRowIndex][sColumnIndex];
                        // fields[sRowIndex][sColumnIndex] = next;
                        // this.fieldSubject.next(fields);
                        this.highlightSubject.next([]);

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
