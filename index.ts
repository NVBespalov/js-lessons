import 'zone.js';

const myFirstZone = Zone.current.fork({
    name: 'моя первая зона'
});

console.log(myFirstZone.name); // моя первая зона

console.log(myFirstZone.parent === Zone.current); // true