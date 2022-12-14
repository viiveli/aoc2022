import { readFileSync } from 'fs';

let TEST_INPUT = readFileSync('./inputs/day04.test', 'utf8')
let INPUT = readFileSync('./inputs/day04.in', 'utf8')

const solver = (input: string) => {
    let arr = input.trim().split('\n')
    let score = 0;
    let scoreTwo = 0;

    arr.forEach(pair => {
        // slice pairs to arrays of numbers
        let section1 = pair.split(',')[0].split('-').map(i => Number(i));
        let section2 = pair.split(',')[1].split('-').map(i => Number(i));

        // generate sets filled with range
        let section1Area = new Set(
            [...Array(section1[1] - section1[0] + 1).keys()]
            .map(i => i + section1[0])
        );
        let section2Area = new Set(
            [...Array(section2[1] - section2[0] + 1).keys()]
            .map(i => i + section2[0])
        );

        // find the intersection
        let intersect = new Set(
            [...section1Area].filter(i => section2Area.has(i))
        );

        // see if intersection completely overlaps with either area
        [section1Area.size, section2Area.size].includes(intersect.size)
            ? score += 1
            : null
        
        // see if there is an intersection at all
        intersect.size > 0
            ? scoreTwo += 1
            : null
    });

    console.log(score);
    console.log(scoreTwo);
}

// solver(TEST_INPUT)
solver(INPUT)
