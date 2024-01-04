const imagePaths = ['Letter_I.svg', 'Letter_B.svg', 'Letter_R.svg', 'Letter_A.svg', 'Letter_H.svg', 'Letter_I.svg', 'Letter_M.svg'];
const correctSequence = ['Letter_I.svg', 'Letter_B.svg', 'Letter_R.svg', 'Letter_A.svg', 'Letter_H.svg', 'Letter_I.svg', 'Letter_M.svg'];

let shuffledImages = [];
let selectedImages = [];
let score = 0;
let gameStarted = false;

function startGame() {
    selectedImages = [];
    score = 0;
    gameStarted = true;

    shuffledImages = shuffle(imagePaths.slice());

    displayImages();
    setTimeout(coverImages, 2000);
}

function displayImages() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card, index) => {
        card.src = shuffledImages[index];
        card.classList.remove('flipped');
        card.onclick = () => selectCard(index);
    });
}

function resetGame() {
    selectedImages = [];
    gameStarted = false;

    setTimeout(() => {
        displayImages();
        setTimeout(coverImages, 2000);
    }, 2000);

    document.getElementById('score-display').textContent = 'Score: 0';
}

function coverImages() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card, index) => {
        card.src = 'cover.jpg'; 
        card.classList.remove('flipped');
        card.onclick = () => selectCard(index);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function arraysMatch(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function uncoverCard(index) {
    const card = document.querySelectorAll('.memory-card')[index];

    card.src = shuffledImages[index];
    selectedImages.push(shuffledImages[index]);

    if (arraysMatch(selectedImages, correctSequence)) {
        score += 20;
        document.getElementById('score-display').textContent = `Score: ${score}`;

        if (selectedImages.length === correctSequence.length) {
            document.getElementById('score-display').textContent = `Score: ${score}`;
            setTimeout(() => {
                alert(`You Win! You Guessed The Correct Order! Your score is ${score}`); 
                resetGame();
            }, 1);
        }
        
    } else {
        setTimeout(() => {
            alert(`Game Over! You Chose the Wrong Order! Your score is ${score}`);
            resetGame();
        }, 1);
    }
}


  function restartGame() {
    score = 0; 
    document.getElementById('score-display').textContent = 'Score: 0'; 
    startGame(); 
  }

function selectCard(index) {
    if (!gameStarted) 
            return;
    uncoverCard(index);
}

function resetCards() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card) => {
        card.classList.remove('flipped');
    });
}

function resetGame() {
    selectedImages = [];
    gameStarted = false;

    resetCards();

    document.getElementById('score-display').textContent = 'Score: 0';

    const cards = document.querySelectorAll('.memory-card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].src = imagePaths[i];
    }
}
