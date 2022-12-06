import { readFileSync } from 'fs';

let INPUT = readFileSync('./inputs/day06.in', 'utf8')

const solver = (dataStream: string, length: number) => {
    for (let index = 0; index < dataStream.length; index++) {
        const marker = new Set(dataStream.slice(index, index+length));
        
        if (marker.size === length) {
            return index+length
        }
    }

    return null;
}

console.log(solver(INPUT, 4))
console.log(solver(INPUT, 14))
