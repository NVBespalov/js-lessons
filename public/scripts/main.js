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
const getCookieSprite = (number = 1, rowIndex, columnIndex) => {
    const highlighted = selectedCookie[0] === rowIndex && selectedCookie[1] === columnIndex;
    const highlight = highlighted ? '-Highlighted' : '';
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

const isValidNewRow = row => selectedCookie[0] + 1 === row || selectedCookie[0] - 1 === row;

const isValidNewColumn = column => selectedCookie[1] + 1 === column || selectedCookie[1] - 1 === column;

const selectCookie = (row, column) => {
    const rowChanged = selectedCookie[0] !== row;
    const columnChanged = selectedCookie[1] !== column;
    if (selectedCookie.length === 0) {
        selectedCookie = [row, column];
    } else if (selectedCookie.length === 2 && (!columnChanged && rowChanged && isValidNewRow(row)) || (!rowChanged && columnChanged && isValidNewColumn(column))) {
        const a = level[selectedCookie[0]][selectedCookie[1]];
        const b = level[row][column];
        level[selectedCookie[0]][selectedCookie[1]] = b;
        level[row][column] = a;
        selectedCookie = [];
    }
    render();
};

let level = shuffle();

function render() {
    document.querySelector('.app').innerHTML = level.reduce((acc, row, rowIndex) => `${acc}
<div class="row">
    ${row.reduce((acc, rowItem, cellIndex) => `${acc}
    <div class="tile" onclick="selectCookie(${rowIndex}, ${cellIndex})">
        <img src="assets/sprites/${getCookieSprite(rowItem, rowIndex, cellIndex)}">
    </div>`, '')}
</div>`, '');
}

document.addEventListener('DOMContentLoaded', render);
