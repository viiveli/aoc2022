import { readFileSync } from 'fs';

let TEST_INPUT = readFileSync('./inputs/day03.test', 'utf8')
let INPUT = readFileSync('./inputs/day03.in', 'utf8')

let priorities = '_abcdefghijklmnopqrstuvwxyz';

const partOne = (input: string) => {
    let score = 0;
    let arr = input.trim().split('\n')

    arr.forEach(ruckSack => {
        let comp1 = ruckSack.slice(0, ruckSack.length/2).split('');
        let comp2 = ruckSack.slice(ruckSack.length/2, ruckSack.length).split('');

        // find a common element of arrays
        let [common] = new Set(comp1.filter(v => comp2.includes(v)));

        score += priorities.indexOf(common.toLowerCase());

        if (common.toUpperCase() === common) {
            score += 26;
        }
    });

    console.log(score);
}

const partTwo = (input: string) => {
    let score = 0;
    let arr = input.trim().split('\n')

    for (let i = 0; i < arr.length; i+=3) {
        // slice a group of three elements from input
        let group = arr.slice(i, i+3);

        let ruckSack1 = group[0].split('');
        let ruckSack2 = group[1].split('');
        let ruckSack3 = group[2].split('');
        
        // find a common element of three arrays
        let preFilter = ruckSack1.filter(v => ruckSack2.includes(v));
        let [common] = new Set(preFilter.filter(v => ruckSack3.includes(v)));

        score += priorities.indexOf(common.toLowerCase());

        if (common.toUpperCase() === common) {
            score += 26;
        }
    }

    console.log(score)
}

partOne(INPUT)
partTwo(INPUT)
