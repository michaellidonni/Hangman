const wordList = [
    'gold',
    'luck',
    'clover',
    'rain',
    'charm',
    'parade',
    'leprechaun',
    'treasure',
    'celebration',
    'greenery',
    'shenanigans',
    'tradition'
]

// Setting Game Variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

function startGame(level) {
    selectedWord = getRandomWord(level)

    // Update difficulty display div
    updateDifficultyDisplay(level)

    //Create the placeholder for the selected word
    displayedWord = '_'.repeat(selectedWord.length)
    //Display the update word
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')


    // Hide difficulty selection and show game area & difficulty box

    //Add d-none to the difficultySelection div
    document.getElementById('difficultySelection').classList.add('d-none')
    //remove d-none from diificultyBox & gameArea
    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('gameArea').classList.remove('d-none')
    //Add d-block to difficultyBox & gameArea 
    document.getElementById('gameArea').classList.add('d-block')
    document.getElementById('difficultyBox').classList.add('d-block')
}

function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length >= 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8
    })
    return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')

    //Remove any difficulty classes (easy, medium, hard)
    difficultyBox.classList.remove('easy', 'medium', 'hard')

    //Set text & apply class dynamically using template literals
    difficultyBox.textContent = `Difficulty ${level.charAt(0).toUpperCase() + level.slice(1)}`

    //Apply the appropriate CSS style for chosen difficulty
    difficultyBox.classList.add(level)
}


function guessLetter() {
    let inputField = document.getElementById('letterInput')
    let guessedLetter = inputField.value.toLowerCase()

    // Check if input is a valid letter (a-z)
    if (!guessedLetter.match(/^[a-z]$/)) {
        alert('Please enter a valid letter (A-Z)!')
        inputField.value = ''
        return
    }

    //Check if letter was already guessed using .includes()
    if (guessedLetters.includes(guessedLetter)) {
        alert(`You already gussed '${guessedLetter}'. Try a different letter!`)
        inputField.value = ''
        return
    } else {
        guessedLetters.push(guessedLetter)
    }

    if (selectedWord.includes(guessedLetter)) {
        correctGuess(guessedLetter)
    } else {
        wrongGuess(guessedLetter)
    }

    inputField.value = ''
    document.getElementById('letterInput').focus()

}

function wrongGuess(guessedLetter) {
    wrongGuesses++ //increment the num of wrong guesses
    document.getElementById('wrongLetters').textContent += ` ${guessedLetter}` //add the guessed letter to HTML div

    document.getElementById('shamrock').src = `imgs/shamrock${6 - wrongGuesses
        }.jpg`

    if (wrongGuesses === maxMistakes) {
        endGame(false)
    } // check to see if  wrongGuesses === the maxMistakes if it is, call endGame(false)
}

function correctGuess(guessedLetter) {
    let newDisplayWord = ''
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            newDisplayWord += guessedLetter
        } else {
            newDisplayWord += displayedWord[i]
        }
    }

    displayedWord = newDisplayWord
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')

    if (!displayedWord.includes('_')) {
        endGame(true)
    }
}

function endGame(won) {
    if (won === true) {
        setTimeout(() => alert('Yay! You Won!'), 100)
    } else {
        alert('You Lost! You Suck!')
    }
}

function restartGame() {
    selectedWord = ''
    displayedWord = ''
    wrongGuesses = 0
    guessedLetters = []
    document.getElementById('wrongLetters').textContent = `Wrong Guesses: `

    document.getElementById('difficultySelection').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.add('d-none')
    document.getElementById('gameArea').classList.add('d-none')
    document.getElementById('gameArea').classList.remove('d-block')
    document.getElementById('difficultyBox').classList.remove('d-block')
}

document.getElementById('letterInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});