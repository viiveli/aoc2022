import { readFileSync } from 'fs';

let INPUT = readFileSync('./inputs/day06.in', 'utf8')

const solver = (dataStream: string, markerLength: number) => {
    for (let index = 0; index < dataStream.length; index++) {
        const marker = new Set(dataStream.slice(index, index+markerLength));
        
        if (marker.size === markerLength) {
            return index+markerLength
        }
    }

    return null;
}

console.log(solver(INPUT, 4))
console.log(solver(INPUT, 14))
