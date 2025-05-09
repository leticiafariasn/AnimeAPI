const quoteContainer = document.getElementById('quote-container');
const quoteContent = document.getElementById('quote-content');
const animeName = document.getElementById('anime-name');
const animeAltName = document.getElementById('anime-alt-name');
const characterName = document.getElementById('character-name');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const newQuoteButton = document.getElementById('new-quote');

function fetchQuote() {
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    quoteContainer.style.display = 'none';

    fetch('https://api.animechan.io/v1/quotes/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao buscar citação. Por favor, tente novamente.');
            }
            return response.json();
        })
        .then(data => {

            if (data.status === 'success' && data.data) {
                displayQuote({
                    quote: data.data.content,
                    anime: data.data.anime.name,
                    altName: data.data.anime.altName,
                    character: data.data.character.name
                });
            } else if (data.anime && data.character && data.quote) {
                displayQuote({
                    quote: data.quote,
                    anime: data.anime,
                    altName: '',
                    character: data.character
                });
            } else {
                throw new Error('Formato de resposta inesperado');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            errorElement.textContent = error.message;
            errorElement.style.display = 'block';
            loadingElement.style.display = 'none';

            displayQuote({
                quote: 'The final door is about to open! And I am the one opening it! Then the world that we know of will come to an end! This world of insatiable desires will end!',
                anime: 'Mobile Suit Gundam SEED',
                altName: 'Kidou Senshi Gundam SEED',
                character: 'Rau Le Creuset'
            });
        });
}

function displayQuote(quoteData) {
    quoteContent.textContent = quoteData.quote;
    animeName.textContent = quoteData.anime;

    if (quoteData.altName && quoteData.altName !== quoteData.anime) {
        animeAltName.textContent = quoteData.altName;
        animeAltName.style.display = 'block';
    } else {
        animeAltName.style.display = 'none';
    }

    characterName.textContent = quoteData.character;

    loadingElement.style.display = 'none';
    quoteContainer.style.display = 'block';
}

newQuoteButton.addEventListener('click', fetchQuote);

document.addEventListener('DOMContentLoaded', fetchQuote);