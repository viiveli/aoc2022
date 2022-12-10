import { readFileSync } from 'fs';

let TEST_INPUT = readFileSync('./inputs/day10.test', 'utf8')
let INPUT = readFileSync('./inputs/day10.in', 'utf8')

let X = 1;
let idx = 0;
let sum: number = 0;
let crtScreen: Array<string[]> = [];

const solver = (input: string) => {
    let signal = input.trim().split('\n').filter(i => i.length > 0)
    let cycles: string[] = [];
    let pixelIndex = 0;
    let pixelRow: string[] = [];

    signal.forEach(line => {
        switch (line.split(' ')[0]) {
            case 'addx':
                cycles = cycles.concat(...['noop', line]);
                break;
            case 'noop':
                cycles = cycles.concat(...[line]);
                break;
            default:
                break;
        }
    });
    
    cycles.forEach(cycle => {
        idx += 1;
        
        if ([20, 60, 100, 140, 180, 220].includes(idx)) {
            sum += idx * X;
        }

        [X - 1, X, X + 1].includes(pixelIndex)
            ? pixelRow.push('#')
            : pixelRow.push('.')
        
        pixelIndex += 1;
        
        if (pixelRow.length == 40) {
            crtScreen.push(pixelRow);
            pixelRow = [];
            pixelIndex = 0;
        }
        
        switch (cycle.split(' ')[0]) {
            case 'addx':
                X += Number(cycle.split(' ')[1])
                break;
            default:
                break;
        }

    });

    console.log('Part one:', sum)
    console.log('Part two:\n', crtScreen.map(i => i.join('')))
}

// solver(TEST_INPUT)
solver(INPUT)
