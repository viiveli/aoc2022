import { readFileSync } from 'fs';

let input = readFileSync('./inputs/day01/input.txt', 'utf8')

let input_arr = input.split('\n\n');
let cal_array: number[] = [];

input_arr.forEach(element => {
    let elf_inventory = element.split('\n').map(i => Number(i));
    let elf_calories = elf_inventory.reduce((a, c) => {return a + c})

    cal_array.push(elf_calories);
});

cal_array = cal_array.sort((a, b) => b - a);
let sum_of_top_three = cal_array.slice(undefined, 3).reduce((a, c) => a + c);

console.log(`Calories carried by the Elf with most calories: ${cal_array[0]}`)
console.log(`Total calories carried by the three Elves with the most calories: ${sum_of_top_three}`)
