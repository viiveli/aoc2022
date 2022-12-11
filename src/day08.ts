import { readFileSync } from 'fs';

let TEST_INPUT = readFileSync('./inputs/day08.test', 'utf8')
let INPUT = readFileSync('./inputs/day08.in', 'utf8')

const solver = (input: string) => {
    let forest = input.trim().split('\n').map(i => i.split('').map(x => Number(x)));
    let indexes: Array<number[]> = [];

    forest.forEach(row => {
        let height = 0;

        for (let index = 0; index <= row.length; index++) {
            if (index === 0 || index === row.length-1) {
                indexes.push([forest.indexOf(row), index])
            }

            if (row[index] > height) {
                indexes.push([forest.indexOf(row), index]);
                height = row[index];
                continue;
            }
        }

        height = 0;

        for (let index = row.length; index >= 0; index--) {
            if (row[index] > height) {
                indexes.push([forest.indexOf(row), index]);
                height = row[index];
                continue;
            }
        }
    });

    let transposedForest = forest[0].map(
        (_, colIndex) => forest.map(row => row[colIndex])
    );

    transposedForest.forEach(row => {
        let height = 0;

        for (let index = 0; index <= row.length; index++) {
            if (index === 0 || index === row.length-1) {
                indexes.push([index, transposedForest.indexOf(row)])
            }

            if (row[index] > height) {
                indexes.push([index, transposedForest.indexOf(row)]);
                height = row[index];
                continue;
            }
        }

        height = 0;

        for (let index = row.length; index >= 0; index--) {
            if (row[index] > height) {
                indexes.push([index, transposedForest.indexOf(row)]);
                height = row[index];
                continue;
            }
        }
    });

    let indexSet = new Set(indexes.map(i => String(i)));
    console.log('Part one:', indexSet.size);
}

// solver(TEST_INPUT)
solver(INPUT)
