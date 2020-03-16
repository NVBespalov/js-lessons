const {tap, flatMap, map, pluck, share, take, mapTo, skip, toArray} = rxjs.operators;
const {from, combineLatest, of, fromEvent, BehaviorSubject} = rxjs;
const shuffle = (sx = 9, sy = 9, max = 6) => {
    return new Array(sx).fill(new Array(sy).fill(1)).reduce((rows, row, rowIndex) => {
        return [...rows, row.reduce((acc, it, index) => {
            if (acc[index - 1] === it) {
                return [...acc, getRndInteger(it === max ? 1 : it + 1, (it === max ? max - 1 : max))];
            }
            if (rows[rowIndex - 1] && rows[rowIndex - 1][index] === it) {
                return [...acc, getRndInteger(it === max ? 1 : it + 1, (it === max ? max - 1 : max))];
            }
            return [...acc, it];
        }, [])];
    }, [])
};
const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getCookieSprite = (number = 1, highlighted) => {
    const highlight = highlighted ? 'Highlighted' : '';
    switch (number) {
        case 1:
            return `Croissant${highlight}@2x.png`;
        case 2:
            return `Cupcake${highlight}@2x.png`;
        case 3:
            return `Danish${highlight}@2x.png`;
        case 4:
            return `Donut${highlight}@2x.png`;
        case 5:
            return `Macaroon${highlight}@2x.png`;
        case 6:
            return `SugarCookie${highlight}@2x.png`;
    }
};
let selectedCookie = [];
const selectedSubj = new BehaviorSubject([]);
const selectCookie = (row, column) => {
    if (selectedCookie) {
        selectedCookie
    }
};


const selected$ = selectedSubj.asObservable();

const sprites = shuffle();

console.log(sprites);

const domReady$ = fromEvent(document, 'DOMContentLoaded').pipe(take(1)).pipe(share());
const sprites$ = domReady$.pipe(flatMap(_ => from(sprites))).pipe(share());

const createDOMElementWithParams = (tagName, {attributes = [], classes = []}) => {
    const htmlElement = document.createElement(tagName);
    attributes.forEach(([name, value]) => htmlElement.setAttribute(name, value));
    classes.forEach(className => htmlElement.classList.add(className));
    return htmlElement;
};

const spriteRowsElements$ = sprites$.pipe(map((_, rowIndex) => createDOMElementWithParams('div', {
    attributes: [['id', rowIndex]],
    classes: ['row']
}))).pipe(share());

const levelElement$ = domReady$.pipe(mapTo(createDOMElementWithParams('div', {classes: ['level']})))
    .pipe(tap($level => document.body.appendChild($level)))
    .pipe(share());


combineLatest([levelElement$, spriteRowsElements$]).pipe(tap(([levelElement, rowElement]) => levelElement.appendChild(rowElement))).subscribe();

const rowElements$ = selected$.pipe(flatMap(([sRow, sCol]) => sprites$
    .pipe(flatMap((row, rowIndex) => from(row).pipe(map((rowItem, itemIndex) => createDOMElementWithParams('img', {
        attributes: [['src', `assets/sprites/${getCookieSprite(rowItem, sRow === rowIndex && sCol === itemIndex)}`]],
        classes: ['sprite']
    })))))))
.pipe(share());

spriteRowsElements$.pipe(flatMap((rowElement, rowIndex) => {
    return rowElements$.pipe(skip(rowIndex * 9)).pipe(take(9)).pipe(tap((rowItemEl) => {
        rowElement.append(rowItemEl);
    }));
})).subscribe();
rowElements$.pipe(take(9 * 9)).pipe(toArray()).pipe(pluck('length')).pipe(tap(console.log)).subscribe();
rowElements$.pipe(tap(console.log)).subscribe();
// domReady$.pipe(flatMap(_ => sprites$))
//     .pipe(flatMap((row, rowIndex) => combineLatest([
//         of(document.createElement('div')).pipe(tap($div => $div.setAttribute('tile'))),
//         of(document.createElement('img')).pipe(tap($div => $div.setAttribute('src', getCookieSprite(rowItem, selectedCookie[0] === rowIndex && selectedCookie[1] === itemIndex)))),
//         of(rowIndex),
//         selected$,
//         from(row)
//     ])))
//     .pipe(map((a, index) => {
//         debugger;
//
//     })).subscribe();

// document.write(sprites.reduce((acc, row, rowIndex) => `${acc}
// <div class="row">
//     ${row.reduce((acc, rowItem, itemIndex) => `${acc}
//     <div class="tile" onclick="selectedSubj.next([${[rowIndex, itemIndex]}])">
//         <img src="assets/sprites/${getCookieSprite(rowItem, selectedCookie[0] === rowIndex && selectedCookie[1] === itemIndex)}">
//     </div>`, '')}
// </div>`, ''));
