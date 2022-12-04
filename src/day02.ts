import { readFileSync } from 'fs';

let TEST_INPUT = readFileSync('./inputs/day02.in', 'utf8')
let INPUT = readFileSync('./inputs/day02.test', 'utf8')

const solver = (input: string, part: string = 'one') => {
    let matchPairs = input.trim().split('\n');

    let playerTotalScore = 0;
    let opponentTotalScore = 0;
    
    let elfShapes = '_ABC';
    let playerShapes = '_XYZ';
    
    matchPairs.forEach(pair => {
        let elf = pair.split(' ')[0]
        let player = pair.split(' ')[1]

        if (part == 'two') {
            switch (player) {
                case 'X': // lose
                    if (elf === 'A') {
                        pair = pair.replace(player, 'Z')
                    } else if (elf === 'B') {
                        pair = pair.replace(player, 'X')
                    } else if (elf === 'C') {
                        pair = pair.replace(player, 'Y')
                    }
                    break;
                case 'Y': // draw
                    pair = pair.replace(
                        player,
                        playerShapes[elfShapes.indexOf(elf)]
                    )
                    break;
                case 'Z': // win
                    if (elf === 'A') {
                        pair = pair.replace(player, 'Y')
                    } else if (elf === 'B') {
                        pair = pair.replace(player, 'Z')
                    } else if (elf === 'C') {
                        pair = pair.replace(player, 'X')
                    }
                    break;
                default:
                    break;
            }

            player = pair.split(' ')[1]
        }
        
        let elfRoundScore = elfShapes.indexOf(elf);
        let playerRoundScore = playerShapes.indexOf(player);
        
        switch (pair) {
            case 'A X':
                elfRoundScore += 3;
                playerRoundScore += 3;
                break;
            case 'A Y':
                elfRoundScore += 0;
                playerRoundScore += 6;
                break;
            case 'A Z':
                elfRoundScore += 6;
                playerRoundScore += 0;
                break;
            case 'B X':
                elfRoundScore += 6;
                playerRoundScore += 0;
                break;
            case 'B Y':
                elfRoundScore += 3;
                playerRoundScore += 3;
                break;
            case 'B Z':
                elfRoundScore += 0;
                playerRoundScore += 6;
                break;
            case 'C X':
                elfRoundScore += 0;
                playerRoundScore += 6;
                break;
            case 'C Y':
                elfRoundScore += 6;
                playerRoundScore += 0;
                break;
            case 'C Z':
                elfRoundScore += 3;
                playerRoundScore += 3;
                break;
            default:
                break;
        }

        opponentTotalScore += elfRoundScore;
        playerTotalScore += playerRoundScore;
    });

    console.log('Opponent score: %d', opponentTotalScore);
    console.log('Player score: %d', playerTotalScore);
}


// solver(TEST_INPUT)
solver(INPUT)

// solver(TEST_INPUT, 'two')
solver(INPUT, 'two')
