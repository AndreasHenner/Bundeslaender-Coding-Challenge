let bundeslaender = [];
let letters = [];

async function init() {
  let response = await fetch("./bundesland.json");
  bundeslaender = await response.json();
  render();
}

function render(filter) {
  let content = document.getElementById(`content`);
  content.innerHTML = ``;

  for (let i = 0; i < bundeslaender.length; i++) {
    const land = bundeslaender[i];
    let name = land[`name`];
    let population = land[`population`];
    let firstLetter = land[`name`].charAt(0);

    if(!letters.includes(firstLetter)){
    letters.push(firstLetter);
    }

    if(!filter || filter == firstLetter){
    content.innerHTML += showStates(land, name, population);
    }
  }
  renderLetters(letters);
}

function showStates(land, name, population){
    return ` 
    <a class="states" href="${land[`url`]}" target="_blank">
      <div>${name}</div>
      <div>${population}</div>
      </a>
    `;
}

function renderLetters(letters){
    let letterBox = document.getElementById(`letterBox`);
    letterBox.innerHTML = ``;

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        letterBox.innerHTML += `<div onclick="filterStates('${letter}')" class="letters">${letter}</div>`;
    }
}

function filterStates(letter){
    render(letter);
}