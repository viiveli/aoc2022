import { readFileSync } from 'fs';

let INPUT = readFileSync('./inputs/day06.in', 'utf8')

const partOne = (dataStream: string) => {
    // find the first occurrence of four characters that are all different
    for (let index = 0; index < dataStream.length; index++) {
        const startOfPacket = new Set(dataStream.slice(index, index+4));
        
        if (startOfPacket.size === 4) {
            console.log(index+4);
            break;
        }
    }
}

const partTwo = (dataStream: string) => {
    // find the first occurrence of 14 characters that are all different
    for (let index = 0; index < dataStream.length; index++) {
        const startOfMessage = new Set(dataStream.slice(index, index+14));
        
        if (startOfMessage.size === 14) {
            console.log(index+14);
            break;
        }
    }
}

partOne(INPUT)
partTwo(INPUT)
