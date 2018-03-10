'use strict';

var log = console.log.bind(console);

var a1 = [1,4,9,16];

var a2 = a1.map(Math.sqrt);
log(a2); //[1, 2, 3, 4]

var a3 = a2.filter((x) => {return x % 2 == 0;});
log(a3); //[2,4]
