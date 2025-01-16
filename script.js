document.getElementById('play-button').addEventListener('click', () => {
    const titlePage = document.getElementById('title-page');
    const contextPage = document.getElementById('context');
    const container = document.getElementById('container');
    container.style.background= 'rgba(255, 255, 255, 0.9)';
    container.style.boxShadow= '0px 4px 10px rgba(0, 0, 0, 0.3)';

   
    titlePage.classList.add('hidden');

    container.style.display = 'none';

    setTimeout(() => {
        titlePage.style.display = 'none'; // Ensure title page is gone
        container.style.display = 'block'; // Bring container back when needed
        contextPage.classList.add('active');
    }, 1000); // Match CSS transition duration
});

        const draggables = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');

let completedMatches = 0;

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', draggable.getAttribute('data-term'));
    });
});

dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('active');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('active');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedTerm = e.dataTransfer.getData('text/plain');
        const draggedItem = document.querySelector(`.draggable[data-term="${draggedTerm}"]`);
        const dropMatch = dropZone.getAttribute('data-match');

        if (draggedTerm === dropMatch) {
            dropZone.textContent = draggedItem.textContent; 
            dropZone.classList.add('correct-match');
            draggedItem.style.opacity = 0.5; // Disable further dragging of this term
            draggedItem.draggable = false; // Make it undraggable
            completedMatches++;

            // Check if all matches are completed
            if (completedMatches === dropZones.length) {
                setTimeout(() => {
                    alert('Great job! You got all of them right!');
                    document.getElementById('drag-drop-activity').style.display = 'none';
                    document.getElementById('true-false-quiz').style.display = 'block'; 
                    document.getElementById('container').style.background = "none";
                    document.getElementById('container').style.boxShadow = "none";
                }, 1000); 
            }
        } else {
            // Incorrect match
            dropZone.classList.add('wrong-match'); // Add error styling
            setTimeout(() => dropZone.classList.remove('wrong-match'), 1000); // Remove after 1s
        }

        dropZone.classList.remove('active');
    });
});


function checkMatches() {
    let correctMatches = 0;

    dropZones.forEach(dropZone => {
        const expectedTerm = dropZone.getAttribute('data-term');
        const droppedTerm = dropZone.getAttribute('data-dropped-term');

        if (expectedTerm === droppedTerm) {
            correctMatches++;
        }
    });

    const feedback = document.getElementById('feedback');
    if (correctMatches === dropZones.length) {
        feedback.textContent = 'Well done! All terms matched correctly.';
        feedback.style.color = '#4caf50';
    } else {
        feedback.textContent = 'Some matches are incorrect. Try again!';
        feedback.style.color = '#f44336';
    }
}

const learningPages = [
    { title: 'What is Generative AI?', content: 'Generative AI is a type of artificial intelligence that can create new content like images, music, videos, and even text. It learns patterns from existing data and uses that knowledge to generate original and creative outputs.' },
    { title: 'How Does It Work?', content: 'Generative AI works by using machine learning models, especially neural networks, to analyze large amounts of data. Once trained, it can produce new content by predicting what comes next or filling in gaps. For example, it can complete sentences or design unique artwork based on patterns it has learned.' },
    { title: 'Why is Generative AI Important?', content: 'Generative AI is shaping industries by making content creation faster and more accessible. It helps artists, designers, writers, and developers bring their ideas to life quickly.' },
    { title: 'Limitations', content: 'While Generative AI is powerful, it has limitations. It can sometimes produce inaccurate or biased content because it learns from existing data, which may not always be reliable. It also lacks true understanding and creativity, meaning it generates content based on patterns rather than original thought. Additionally, misuse of Generative AI can lead to plagiarism, misinformation, or harmful content, so it’s important to use it responsibly.' },
    { title: 'Examples of Generative AI', content: 'Generative AI creates different types of content using various tools. ChatGPT generates human-like text for stories, answers, and conversations. DALL·E turns text prompts into unique images, while Jukebox AI produces original music by learning from different genres. These tools show how Generative AI powers creativity in writing, art, and music.' }
];

let currentPageIndex = 0;

function nextLearningPage() {
    if (currentPageIndex < learningPages.length) {
        const { title, content } = learningPages[currentPageIndex];
        const learningContent = document.getElementById('learning-content');
        const progressBar = document.getElementById('progress-bar');
        const learningTitle = document.getElementById('learning-title'); 

     
        learningTitle.textContent = title;

   
        typeText(content, learningContent);


        const progressPercent = ((currentPageIndex + 1) / learningPages.length) * 100;
        progressBar.style.width = `${progressPercent}%`;

        currentPageIndex++;
    } else {
        document.getElementById('learning-page').style.display = 'none';
        document.getElementById('prepare-for-quiz').style.display = 'block';
    }
}


// Typing animation for the text
function typeText(text, element) {
    let index = 0;
    element.textContent = '';  // Clear the text initially
    element.style.opacity = 0;  // Start with text hidden

    // Animate typing with a faster interval
    const typingInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);  // Add one character at a time
            index++;
        } else {
            clearInterval(typingInterval);  // Stop when all text is typed
        }
    }, 20); // Decreased the interval from 50ms to 30ms for faster typing

    // Ensure the opacity is set to 1 after typing starts
    setTimeout(() => {
        element.style.opacity = 1;  // Fade in the text after typing starts
    }, 200);
}



        function preparequiz() {
            const quizElement = document.getElementById('drag-drop-activity');
            const prepareElement = document.getElementById('prepare-for-quiz');
            
            // Add the wipe-out transition to the prepare-for-quiz content
            prepareElement.classList.add('wipe-transition');
            
            // After the wipe-out transition completes (1s), hide the current content and show the next content
            setTimeout(() => {
                prepareElement.style.display = 'none';  // Hide the current screen
                
                // Show the new screen and add the wipe-in effect
                quizElement.style.display = 'block';
                quizElement.classList.add('fade-in-wipe');
            }, 1000); // Ensure this matches the duration of the wipe transition (1s)
        }
        
        
        
        function startLearning() {
            document.getElementById('context').style.display = 'none';
            document.getElementById('learning-page').style.display = 'block';
            nextLearningPage();
        }
        function checkDragDropCompletion() {
            let correctMatches = 0;
            const dropZones = document.querySelectorAll('.drop-zone');
        
            dropZones.forEach(dropZone => {
                const draggedId = dropZone.getAttribute('data-dragged-id');
                const correctId = dropZone.getAttribute('data-correct-id');
        
                if (draggedId === correctId) {
                    correctMatches++;
                    dropZone.classList.add('correct-match');
                    setTimeout(() => {
                        dropZone.classList.remove('correct-match');
                    }, 500);
                }
            });
        
            // If all items are correctly matched
            if (correctMatches === dropZones.length) {
                setTimeout(() => {
                    alert('Great job! You got all of them right!');
        
                    // Trigger the wipe-out transition after the alert is closed
                    triggerWipeTransition(showTrueFalseQuiz);
                }, 500);
            }
        }
        
        
        
        function showTrueFalseQuiz() {
            const trueFalseSection = document.getElementById('true-false-quiz');
        
            // Show the next section
            trueFalseSection.style.display = 'block';
        
            // Optional fade-in effect for a smooth entry
            trueFalseSection.classList.add('fade-in-wipe');
        }
        
        
        function handleDrop(event) {
            event.preventDefault();
            const draggedTerm = event.dataTransfer.getData('text/plain');
            const dropZone = event.target;
        
            if (dropZone.getAttribute('data-match') === draggedTerm) {
                dropZone.textContent = draggedTerm;
                dropZone.classList.add('correct-match');
                const draggedItem = document.querySelector(`[data-term="${draggedTerm}"]`);
                draggedItem.style.opacity = 0.5;
                draggedItem.draggable = false;
        
                // Check for completion after a successful drop
                checkDragDropCompletion();
            } else {
                dropZone.classList.add('wrong-match');
                setTimeout(() => dropZone.classList.remove('wrong-match'), 1000);
            }
        }
        
        function checkAnswer(isTrueSelected) {
            const correctAnswer = false; // Correct answer for True/False
        
            if (isTrueSelected === correctAnswer) {
                alert("Correct!");
                // Hide True/False Quiz and Show MCQ Quiz
                document.getElementById('true-false-quiz').style.display = 'none';
                document.getElementById('mcq-quiz-container').style.display = 'flex';
            } else {
                alert("Incorrect. Try again.");
            }
        }
        
        // MCQ Answer Check
function checkMCQAnswer(selectedOption) {
    const correctAnswer = 'C'; // Correct answer is "Cleaning your room"

    if (selectedOption === correctAnswer) {
        alert("Correct! Generative AI can't clean your room.");
        
        // Transition to the Fill-in-the-Blanks quiz
        document.getElementById('mcq-quiz-container').style.display = 'none';
        document.getElementById('fitb-quiz-container').style.display = 'block';
    } else {
        alert("Incorrect. Try again!");
    }
}

// Drag and Drop Functions
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.target.textContent = document.getElementById(data).textContent;
    event.target.setAttribute("data-answer", data);
}

// Check Fill-in-the-Blanks Answer
function checkFITBAnswer() {
    const blanks = document.querySelectorAll(".blank");
    const correctAnswers = ["inaccurate", "creativity", "harmful"];
    let userAnswers = [];

    blanks.forEach(blank => {
        userAnswers.push(blank.getAttribute("data-answer"));
    });

    if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
        alert("Great job! You filled in the blanks correctly! 🎉");
   // Transition to the closing page
   document.getElementById('fitb-quiz-container').style.display = 'none';
   document.getElementById('closing-page').style.display = 'block';
} else {
   alert("Oops! Try again!");
}
le.pointerEvents = 'auto'; 
    };
    
    