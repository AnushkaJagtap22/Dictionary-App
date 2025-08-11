const input = document.querySelector('input');
const btn = document.querySelector('button');
const dictionary = document.querySelector('.dictionary-app');

async function dictionaryFn(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();

        // Handle "word not found"
        if (data.title && data.title === "No Definitions Found") {
            dictionary.querySelector('.card').innerHTML = `<p style="color:red;">No results found for "${word}"</p>`;
            return;
        }

        // Update DOM elements
        const wordSpan = dictionary.querySelectorAll('.property span')[1];
        const phoneticSpan = dictionary.querySelectorAll('.property span')[3];
        const audioDiv = dictionary.querySelectorAll('.property')[2];
        const definitionSpan = dictionary.querySelectorAll('.property span')[5];
        const exampleDiv = dictionary.querySelectorAll('.property')[4];
        const partOfSpeechDiv = dictionary.querySelectorAll('.property')[5];

        wordSpan.textContent = data[0].word || "N/A";
        phoneticSpan.textContent = data[0].phonetic || "N/A";

        // Audio
        const audioUrl = data[0].phonetics?.find(p => p.audio)?.audio;
        audioDiv.innerHTML = `<span>AUDIO :</span> ${audioUrl ? `<audio controls src="${audioUrl}"></audio>` : "N/A"}`;

        // Definition
        definitionSpan.textContent = data[0].meanings[0]?.definitions[0]?.definition || "N/A";

        // Example
        exampleDiv.innerHTML = `<span>EXAMPLE :</span> ${data[0].meanings[0]?.definitions[0]?.example || "N/A"}`;

        // Part of speech
        partOfSpeechDiv.innerHTML = `<span>PART OF SPEECH :</span> ${data[0].meanings[0]?.partOfSpeech || "N/A"}`;

    } catch (error) {
        console.error("Error fetching data:", error);
        dictionary.querySelector('.card').innerHTML = `<p style="color:red;">Error fetching data</p>`;
    }
}

// Search button click event
btn.addEventListener('click', () => {
    const word = input.value.trim();
    if (word) {
        dictionaryFn(word);
    }
});
