import {createSiteMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/taskEdit.js';
import {createLoadMoreButtonTemplate} from './components/loadMoreButton.js';
import {dataCards, filters} from './components/data.js';

let task = {
  start: 1,
  end: 8,
  step: 8,
};
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filterContainer = document.createElement(`section`);
filterContainer.classList.add(`main__filter`, `filter`, `container`);
siteMainElement.appendChild(filterContainer);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
for (let prop of filters) {
  render(filterContainer, createFilterTemplate(prop), `beforeend`);
}
render(siteMainElement, createBoardTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditTemplate(dataCards[0]), `beforeend`);
let sliceCards = dataCards.slice(task.start, task.end);
for (let card of sliceCards) {
  render(taskListElement, createTaskTemplate(card), `beforeend`);
}

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadButton = document.querySelector(`.load-more`);

const addCards = () => {
  task.start = task.start + task.step;
  task.end = task.start + task.step;
  sliceCards = dataCards.slice(task.start, task.end);
  for (let card of sliceCards) {
    render(taskListElement, createTaskTemplate(card), `beforeend`);
  }
  const cards = document.querySelectorAll(`.card`);
  const cardsLength = Array.from(cards).length;
  if (cardsLength >= dataCards.length - 1) {
    loadButton.remove();
  }
};
loadButton.addEventListener(`click`, addCards);
