let [time, buses] = `1002461
29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,521,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,x,x,601,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,19`.split("\n");

time = parseInt(time, 10);
buses = buses.split(",").map(n => parseInt(n, 10));

// buses = "7,13,x,x,59,x,31,19".split(",").map(n => parseInt(n, 10));

let busNo;
let depart = Infinity;

buses.forEach(n => {
    if (isNaN(n)) {
        return;
    }

    let d = n - time % n;
    if (depart > d) {
        depart = d;
        busNo = n;
    }
});

console.log("part 1>", busNo, depart, busNo * depart);

// t % 7 = 0
// t % 13 = 1
// ...

// t % 59 = 4
// t = x * 59 + 4

let numbers = buses.map((n, i) => [n, i]).filter(p => !isNaN(p[0])).sort((a, b) => b[0] - a[0]);

console.log(numbers);

// let t0 = 100000000000000;
// let x = Math.floor((t0 - numbers[0][1]) / numbers[0][0]);
// // let x = numbers[6][0] * 100000000000000 / numbers[0][0] + numbers[6][1];
// out: while (true) {
//     let t = numbers[0][0] * x + numbers[0][1];
//     console.log(t);
//     for (let k = 1; k < numbers.length; k++) {
//         if ((t + numbers[k][1]) % numbers[k][0] !== 0) {
//             x += numbers[0][0];
//             continue out;
//         }
//     }

//     console.log("part 2>", t);
//     for (let k = 0; k < numbers.length; k++) {
//         console.log(numbers[k][0], (t + numbers[k][1]) % numbers[k][0]);
//     }
//     break;
// }

// [
//     [ 29, 0 ],   [ 41, 19 ],
//     [ 521, 29 ], [ 23, 37 ],
//     [ 13, 42 ],  [ 17, 46 ],
//     [ 601, 60 ], [ 37, 66 ],
//     [ 19, 79 ]
//   ]

// t = 29 * x
// t + 60 = 601 * y
// (89 + x) = 601 + y
// x = 601 + y - 89 = (512 + y)
// t = 14848 + 29 * y

// t + 60 = 601 * y
// t + 29 = 521 * z

// t = 601 * y - 60
// t = 521 * z - 29
// (t - 29) / 521 = z

// t = 59 * x + 4
// t = 31 * y + 6

let period = 1n;
let t = 0n;
for (let i = 0; i < numbers.length; i++) {
    while ((t + BigInt(numbers[i][1])) % BigInt(numbers[i][0]) !== 0n) {
        console.log("t=", t, "period=", period, "mod=", (t + BigInt(numbers[i][1])) % BigInt(numbers[i][0]));
        t += period;
    }
    period *= BigInt(numbers[i][0]);
}

console.log("part 2", t);
console.log(numbers);
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i][0], (t + BigInt(numbers[i][1])) % BigInt(numbers[i][0]));
}

