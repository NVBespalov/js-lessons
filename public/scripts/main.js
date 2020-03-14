const shuffle = (sx = 9, sy = 9, max = 6) => {
    return new Array(sx).fill(new Array(sy).fill(1)).reduce((rows, row, rowIndex) => {
        return [...rows, row.reduce((acc, it, index) => {
            debugger;
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
    switch (number) {
        case 1:
            const highlight = highlighted ? 'Highlighted' : '';
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
const selectCookie = (row, column) => {
    if(selectedCookie) {
        selectedCookie
    }
}
document.write(shuffle().reduce((acc, row, rowIndex) => `${acc}
<div class="row">
    ${row.reduce((acc, rowItem, itemIndex) => `${acc}
    <div class="tile" onclick="this.style">
        <img src="assets/sprites/${getCookieSprite(rowItem, ${selectedCookie[0] === rowIndex && selectedCookie[1] === itemIndex})}">
    </div>`, '')}
</div>`, ''));
