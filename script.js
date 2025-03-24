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
let wrongGuess = 0
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
