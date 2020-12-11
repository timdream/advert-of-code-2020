let volts = `133
157
39
74
108
136
92
55
86
46
111
58
80
115
84
67
98
30
40
61
71
114
17
9
123
142
49
158
107
139
104
132
155
96
91
15
11
23
54
6
63
126
3
10
116
87
68
72
109
62
134
103
1
16
101
117
35
120
151
102
85
145
135
79
2
147
33
41
93
52
48
64
81
29
20
110
129
43
148
36
53
26
42
156
154
77
88
73
27
34
12
146
78
47
28
97`.split("\n").map(s => parseInt(s, 10)).sort((a, b) => a - b);

volts.unshift(0);
volts.push(volts[volts.length - 1] + 3);

let diff1 = 0;
let diff2 = 0;
let diff3 = 0;

for (let i = 1; i < volts.length; i++) {
    let diff = volts[i] - volts[i - 1];
console.log(volts[i], diff);
    switch (diff) {
        case 1:
            diff1++;
            break;
        case 2:
            diff2++;
            break;
        case 3:
            diff3++;
            break;
        default:
            throw new Error(`diff ${diff}`);
    }
}

console.log("part 1", diff1 * diff3);

// For continuous 1s we can take out the first two so three 1s -> x3
// 1: 1 x 1 1 x 1 x
// 2: 1 2 x 1 x x 2
// 3: 1 1 2 x 3 x x
// 6: 3 3 3 4 6 5 4
//    o o o x x x x

// two 1s -> x2
// 1: 1 x 1
// 2: 1 2 x
// 5: 3 3 4
//    o o x

// four 1s ->
// 1: 1 x 1 1 1 x 1 1 x 1 x x 1
// 2: 1 2 x 1 1 x x 1 2 x 2 x x
// 3: 1 1 2 x 1 3 x x x 2 1 x x
// 4: 1 1 1 1 x 1 3 x 2 x x 4 x
// 7: 3 3 3 3 4 3 3 5 3 4 4 3 6
//    o o o o x o o x o x x x x

// let str = diffs.join("");
// let count3 = (str.match(/111/g) || []).length;
// str = str.replace(/111/g, "");
// let count2 = (str.match(/11/g) || []).length;

// volts.shift();

// function calc(vts, prevDiff) {
//     console.log(vts, prevDiff);
//     if (!vts[1]) {
//         return 1;
//     }
//     let diff = vts[1] - vts[0];

//     let newVolts = [...vts];
//     newVolts.shift();

//     if (prevDiff + diff <= 3) {
//         return 2 * calc(newVolts, prevDiff + diff);
//     }

//     while (newVolts[1] && newVolts[1] - newVolts[0] === 3) {
//         newVolts.shift();
//     }
//     diff = newVolts[1] - newVolts[0];
//     newVolts.shift();

//     return calc(newVolts, diff);
// }

// 1 1
// 2 1
// 5 3
// 8 3
// 9 1
// [1, 2, 5, 8, 9] 1
// [2, 5, 8, 9] 2


// let comb = calc(volts, 1);
// console.log("part 2", comb);

let example1 = `16
10
15
5
1
11
7
19
6
12
4`.split("\n").map(s => parseInt(s, 10)).sort((a, b) => a - b);

example1.unshift(0);
example1.push(example1[example1.length - 1] + 3);

function calc(v, s) {
    console.log("calc", v.join("|"), s);
    // console.log(s);
    let count = 1;
    for (let i = s; i < v.length - 1; i++) {
        if ((v[i + 1] - v[i - 1]) <= 3) {
            let nv = [...v];
            nv.splice(i, 1);
            count += calc(nv, i);
        }
    }
    return count;
}

console.log(calc(example1, 1));

function findCalc(v) {
    let count = 1;
    let s = 0;
    for (let i = 1; i < v.length; i++) {
        if ((v[i] - v[i - 1]) === 3) {
            count *= calc(v.slice(s, i), 1);
            s = i;
        }
    }
    return count;
}

console.log(findCalc(example1, 1));
console.log(findCalc(volts, 1));

// calc(volts, 1);

// let s = 0;
// let p = 0;
// let ccount = 0;

// let diffs = [];
// for (let i = 1; i < volts.length; i++) {
//     diffs.push(volts[i] - volts[i - 1]);
// }

// while (p < diffs.length) {
//     if (diffs[p] !== 3) {
//         p++;
//         continue;
//     }
//     console.log(volts.slice(s, p + 1));
//     ccount += calc(volts.slice(s, p + 1));
// }

// calc([0, 1, 2, 3, 6, 7, 8, 9], 0);
// console.log(count, 2 ** count);
