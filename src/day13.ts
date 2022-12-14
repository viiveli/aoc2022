import { readFileSync } from 'fs';

let TEST_INPUT = readFileSync('./inputs/day13.test', 'utf8')
let INPUT = readFileSync('./inputs/day13.in', 'utf8')

const compare = (left: any[], right: any[]): number => {
    let result = 0;

    while ((left.length || right.length) && result === 0) {
        let l = left.shift();
        let r = right.shift();

        if (l === undefined) {
            return 1;
        }

        if (r === undefined) {
            return -1;
        }

        if (typeof l === 'number' && typeof r === 'number') {
            if (l < r) {
                return 1
            }

            if (r < l) {
                return -1
            }
        } else {
            result = compare(
                Array.isArray(l) ? l : [l],
                Array.isArray(r) ? r : [r]
            );
        }
    }
    return result
}

const solver = (input: string) => {
    let signal = input
        .trim()
        .split('\n\n')
        .map(i => i.split('\n'));
    let sum = 0;

    signal.forEach(pair => {
        let inOrder = compare(JSON.parse(pair[0]), JSON.parse(pair[1]));

        inOrder === 1
            ? sum += signal.indexOf(pair) + 1
            : null
    });

    console.log('Part one:', sum);  

    let dividers = ['[[2]]', '[[6]]'];
    let all = [...signal.flat(), ...dividers];
    all.sort((a, b) => compare(JSON.parse(b), JSON.parse(a)))
    
    console.log(
        'Part two:', (all.indexOf(dividers[0])+1) * (all.indexOf(dividers[1])+1)
    )
}


// solver(TEST_INPUT)
solver(INPUT)
