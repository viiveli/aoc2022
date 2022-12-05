import { readFileSync } from 'fs';

let TEST_INPUT = readFileSync('./inputs/day05.test', 'utf8')
let INPUT = readFileSync('./inputs/day05.in', 'utf8')

// let arr = TEST_INPUT.split('\n\n')
let arr = INPUT.split('\n\n')

let rawStacks = arr[0].split('\n');
let rawInstructions = arr[1].split('\n');

const generateStacks = (rawStacks: string[]) => {
    let stacks: Array<string[]> = [];
    
    // slice stacks
    rawStacks.forEach(element => {
        let stack: string[] = []
    
        for (let index = 1; index < element.length; index+=4) {
            stack.push(element[index])
        }
    
        stacks.push(stack);
    });

    // transpose & filter
    stacks = stacks[0].map((_, colIndex) => stacks.map(row => row[colIndex]));
    stacks = stacks.map(i => i.filter(s => s.trim().length > 0));

    return stacks
}

const generateSequence = (rawInstructions: string[]) => {
    let sequence: Array<number[]> = [];

    rawInstructions.forEach(element => {
        let instructions: number[] = [];
        let arr = element.split(' ');

        for (let index = 1; index < arr.length; index+=2) {
            instructions.push(Number(arr[index]));
        }

        sequence.push(instructions)
    });

    return sequence
}

const roundOne = () => {
    let stacks = generateStacks(rawStacks)
    let sequence = generateSequence(rawInstructions)
    
    sequence.forEach(phase => {
        let count = phase[0];
        let from = phase[1] - 1;
        let to = phase[2] - 1;
    
        for (let index = 0; index < count; index++) {
            let item = stacks[from].shift()
            item !== undefined
                ? stacks[to].unshift(item)
                : null
        }
    });
    
    console.log(stacks.map(i => i[0]).join(''));
}

const roundTwo = () => {
    let stacks = generateStacks(rawStacks)
    let sequence = generateSequence(rawInstructions)
    
    sequence.forEach(phase => {
        let count = phase[0];
        let from = phase[1] - 1;
        let to = phase[2] - 1;
    
        let items = stacks[from]?.splice(0, count)
        items !== undefined
            ? stacks[to] = items.concat(stacks[to])
            : null
    });
    
    console.log(stacks.map(i => i[0]).join(''));
}

roundOne()
roundTwo()
