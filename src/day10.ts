import { readFileSync } from 'fs';

let TEST_INPUT = readFileSync('./inputs/day10.test', 'utf8')
let INPUT = readFileSync('./inputs/day10.in', 'utf8')

let X = 1;
let cycleIndex = 0;
let sum: number = 0;
let crtScreen: Array<string[]> = [];

const solver = (input: string) => {
    let signal = input.trim().split('\n').filter(i => i.length > 0)
    let cycles: string[] = [];
    let pixelPosition = 0;
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
        cycleIndex++;
        
        if ([20, 60, 100, 140, 180, 220].includes(cycleIndex)) {
            sum += cycleIndex * X;
        }

        if ([X - 1, X, X + 1].includes(pixelPosition)) {
            pixelRow.push('#')
        } else {
            pixelRow.push('.')
        }
        
        pixelPosition++;
        
        if (pixelRow.length === 40) {
            crtScreen.push(pixelRow);
            pixelRow = [];
            pixelPosition = 0;
        }
        
        if (cycle.split(' ')[0] === 'addx') {
            X += Number(cycle.split(' ')[1])
        }
    });

    console.log('Part one:', sum)
    console.log('Part two:\n', crtScreen.map(i => i.join('')))
}

// solver(TEST_INPUT)
solver(INPUT)
