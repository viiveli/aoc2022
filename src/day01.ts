import { readFileSync } from 'fs';

let INPUT = readFileSync('./inputs/day01.in', 'utf8')

const solver = (input: string) => {
    let arr = input.split('\n\n');
    let calArray: number[] = [];
    
    arr.forEach(element => {
        // convert input to numbers & count sum
        let elfInventory = element.split('\n').map(i => Number(i));
        let elfCalories = elfInventory.reduce((a, c) => a + c)
    
        calArray.push(elfCalories);
    });
    
    // sort from largest to smallest
    calArray = calArray.sort((a, b) => b - a);
    let topThree = calArray.slice(undefined, 3).reduce((a, c) => a + c);
    
    console.log(calArray[0])
    console.log(topThree)
}

solver(INPUT)
