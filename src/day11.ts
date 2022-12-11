import { readFileSync } from 'fs';

let TEST_INPUT = readFileSync('./inputs/day11.test', 'utf8')
let INPUT = readFileSync('./inputs/day11.in', 'utf8')

interface MonkeyInterface {
    id: number
    items: number[]
    operation: string
    test: number
    targetIfTrue: number
    targetIfFalse: number
    inspectionCounter: number
}

class Monkey implements MonkeyInterface {
    id: number
    items: number[]
    operation: string
    test: number
    targetIfTrue: number
    targetIfFalse: number
    inspectionCounter: number

    constructor(
        id: number,
        items: number[],
        operation: string,
        test: number,
        targetIfTrue: number,
        targetIfFalse: number,
        inspectionCounter: number = 0
    ) {
        this.id = id
        this.items = items
        this.operation = operation
        this.test = test
        this.targetIfTrue = targetIfTrue
        this.targetIfFalse = targetIfFalse
        this.inspectionCounter = inspectionCounter
    }
}

const monkeyParser = (input: Array<string>) => {
    let monkeys: Array<Monkey> = []
    
    input.forEach(element => {
        let monkeyId = Number(/\d/.exec(element.split('\n')[0]))

        let monkeyItems = element
            .split('\n')[1]
            .split(':')[1]
            .trim()
            .split(', ')
            .map(i => Number(i))

        let monkeyOperation = element
            .split('\n')[2]
            .split('=')[1]
            .trim()

        let monkeyTest = Number(/\d+/.exec(element.split('\n')[3]))
        let monkeyTargetIfTrue = Number(/\d/.exec(element.split('\n')[4]))
        let monkeyTargetIfFalse = Number(/\d/.exec(element.split('\n')[5]))
        
        let monkey = new Monkey(
            monkeyId, monkeyItems, monkeyOperation, monkeyTest,
            monkeyTargetIfTrue, monkeyTargetIfFalse
        )

        monkeys.push(monkey)
    });

    return monkeys
}

const solver = (input: string, rounds: number, part: string = 'one') => {
    let monkeys = monkeyParser(input.trim().split('\n\n'));

    // calculate modulus for part two by multiplying all test dividers
    // together to limit the output size without affecting the test parity
    let grandDivider = monkeys.map(m => m.test).reduce((a, b) => a * b);

    for (let round = 0; round < rounds; round++) {
        monkeys.forEach(monkey => {
            while (monkey.items.length) {
                let item = monkey.items[0];

                let operator = monkey.operation.split(' ')[1];
                let factor: number | string = monkey.operation.split(' ')[2];

                if (factor === 'old') {
                    factor = item;
                }

                switch (operator) {
                    case '+':
                        item = item + Number(factor);
                        break;
                    case '*':
                        item = item * Number(factor);
                        break;
                    default:
                        break;
                }

                if (part === 'two') {
                    item = item%grandDivider
                } else {
                    item = Math.floor(item/3)
                }

                if (item%monkey.test === 0) {
                    let targetMonkey = monkeys
                        .filter(i => i.id === monkey.targetIfTrue)[0]

                    targetMonkey.items.push(item)
                } else {
                    let targetMonkey = monkeys
                        .filter(i => i.id === monkey.targetIfFalse)[0]

                    targetMonkey.items.push(item)
                }

                monkey.inspectionCounter++
                monkey.items.shift()
            }
        });
    }

    monkeys.sort((a, b) => b.inspectionCounter - a.inspectionCounter)

    let monkeyBusiness = monkeys.slice(0, 2)
        .map(i => i.inspectionCounter)
        .reduce((a, b) => a * b)

    console.log('Monkey business, part', part, monkeyBusiness)
}

// solver(TEST_INPUT, 20)
solver(INPUT, 20)

// solver(TEST_INPUT, 10000, 'two')
solver(INPUT, 10000, 'two')
