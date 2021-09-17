const IGNORED_CHARS = [',', '.', '\n', '\t'];

const inputPoem = document.querySelector('#input-poem');
const outputPoem = document.querySelector('#output-poem');
const jumbleButton = document.querySelector('#jumble-button');

jumbleButton.addEventListener('click', () => {
    const rawPoem = inputPoem.value;
    const parsedPoem = parsePoem(rawPoem);

    let wordArr = parsedPoem.split(' ');
    wordArr = shuffle(wordArr);
    wordArr = insertLineCuts(wordArr, wordArr.length);

    let randomPoem = buildPoemStrFromArr(wordArr);
    outputPoem.value = randomPoem;
});

const parsePoem = (poem) => {
    let parsedPoem = '';
    for (let i = 0; i < poem.length; i++) {
        if (IGNORED_CHARS.includes(poem[i])) {
            parsedPoem = parsedPoem + ' ';
        } else {
            parsedPoem = parsedPoem + poem[i].toLowerCase();
        }
    }
    return parsedPoem;
};

// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (arr) => {
    let array = arr;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const insertLineCuts = (wordArr, wordCount) => {
    let wordArrCopy = wordArr;
    nthWord = 0;
    lineCut = Math.floor(Math.random() * 8) + 1;

    while (nthWord + lineCut < wordCount) {
        wordArrCopy[nthWord + lineCut] = wordArrCopy[nthWord + lineCut] + '\n';
        lineCut = Math.floor(Math.random() * 8) + 1;
        nthWord = nthWord + lineCut;
    }

    return wordArrCopy;
};

const buildPoemStrFromArr = (wordArr) => {
    let poemStr = '';
    wordArr.forEach((word) => {
        if (word.slice(-1) === '\n') {
            poemStr = poemStr + word;
        } else {
            poemStr = poemStr + word + ' ';
        }
    });
    return poemStr;
};
