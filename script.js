//sorting code 
let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    barsArray = [],
    bars = 1920,
    barWidth = 0,
    bubbleSort, fastSort,
    genBars = () => {
        barWidth = canvas.width / bars + 1;
        barsArray = [];
        for (let i = 0; i < bars; i++) {
            barsArray.push(i + 1)
        }
    },
    scrambleBars = () => {
        for (let i = 0; i < barsArray.length; i++) {
            let secondElementIndex = getRandomInt(i + 1, barsArray.length - 1),
                firstElement = barsArray[i],
                secondElement = barsArray[secondElementIndex];
            barsArray[secondElementIndex] = firstElement;
            barsArray[i] = secondElement;
        }
    },
    drawBars = (j) => {
        let x = 0;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < barsArray.length; i++) {
            if (i <= j) {
                ctx.fillStyle = "lime";
                if (i == j) {
                    ctx.fillStyle = "red";
                }
            } else {
                ctx.fillStyle = "white";
            }
            ctx.fillRect(x, canvas.height, barWidth, -1 * (Math.round(((canvas.height / barsArray.length) * (barsArray[i]) + Number.EPSILON) * 100) / 100));
            x += Math.floor(canvas.width / bars);
        }
    },
    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    },
    scramble = () => {
        clearInterval(fastSort)
        clearInterval(bubbleSort)
        bars = 0;
        let barsInput = document.getElementById("barsAmount").value;
        if (barsInput == undefined || barsInput == null || barsInput == "") {
            bars = 1920;
        } else {
            if (parseInt(barsInput) > 1900 || parseInt(barsInput) < 0) {
                bars = 1920;
            } else {
                bars = barsInput
            }
        }
        genBars()
        scrambleBars()
        drawBars()
    }
scramble()

document.getElementById("scramble").addEventListener("click", () => {
    scramble()
})
document.getElementById("fastSort").addEventListener("click", () => {
    let j = 0;
    clearInterval(bubbleSort)
    fastSort = setInterval(() => {
        //while (j != -1) {
        if (j < barsArray.length) {
            for (let i = 1; i < barsArray.length; i++) {
                if (barsArray[j] > barsArray[j + i]) {
                    [barsArray[j], barsArray[j + i]] = [barsArray[j + i], barsArray[j]];
                }
            }
            j++
        } else {
            j = -1;
            drawBars();
            clearInterval(fastSort);
        }
        drawBars(j);
        //}
    }, );
})
document.getElementById("bubbleSort").addEventListener("click", () => {
    let j = 0;
    clearInterval(fastSort)
    bubbleSort = setInterval(() => {
        //while (j != -1) {
        if (j < barsArray.length) {
            if (barsArray[j] > barsArray[j + 1]) {
                [barsArray[j], barsArray[j + 1]] = [barsArray[j + 1], barsArray[j]];
            }
            j++
        } else {
            j = 0;
            drawBars();
        }
        drawBars();
        //}
    }, );
})