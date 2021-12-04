let values = [];
let w = 0.8;

let states = [];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = (canvas.height / values.length) * i;
        states[i] = -1;
    }
    for (let i = 0; i < values.length; i++) {
        let secondElementIndex = getRandomInt(i + 1, values.length - 1);
        let firstElement = values[i]
        let secondElement = values[secondElementIndex]
        values[secondElementIndex] = firstElement;
        values[i] = secondElement;
    }
    quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }
    let index = await partition(arr, start, end);
    states[index] = -1;

    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end)
    ]);
}

async function partition(arr, start, end) {
    for (let i = start; i < end; i++) {
        states[i] = 1;
    }

    let pivotValue = arr[end];
    let pivotIndex = start;
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            await swap(arr, i, pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }
    await swap(arr, pivotIndex, end);

    for (let i = start; i < end; i++) {
        if (i != pivotIndex) {
            states[i] = -1;
        }
    }

    return pivotIndex;
}

function draw() {
    background(0);

    for (let i = 0; i < values.length; i++) {
        noStroke();
        if (states[i] == 0) {
            fill('#E0777D');
        } else if (states[i] == 1) {
            fill('#D6FFB7');
        } else {
            fill(255);
        }
        rect(i * w, height - values[i], w, values[i]);
    }
}

async function swap(arr, a, b) {
    await sleep(-1)
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}