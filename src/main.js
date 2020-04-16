import SiteMenu from './components/menu.js';
import Filter from './components/filter.js';
import Board from './components/board.js';
import Task from './components/task.js';
import TaskEdit from './components/taskEdit.js';
import LoadMore from './components/loadMoreButton.js';
import Sort from './components/sort.js';
import {dataCards, filters} from './components/data.js';
import {render, RenderPosition} from './components/utils.js';

let task = {
  start: 0,
  end: 8,
  step: 8,
};


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenu().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new Filter(filters).getElement(), RenderPosition.BEFOREEND);


const renderTask = (taskListElement, card) => {

  const taskComponent = new Task(card).getElement();
  const taskEditComponent = new TaskEdit(card).getElement();


  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditComponent, taskComponent);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent, taskEditComponent);
  };


  taskComponent.querySelector(`.card__btn--edit`).addEventListener(`click`, onEditButtonClick);

  taskEditComponent.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new Sort().getElement(), RenderPosition.AFTERBEGIN);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let sliceCards = tasks.slice(task.start, task.end);
  sliceCards.forEach((card) => {
    renderTask(taskListElement, card);
  });

  const loadMoreButtonComponent = new LoadMore();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  const addCards = () => {
    task.start = task.start + task.step;
    task.end = task.start + task.step;
    sliceCards = dataCards.slice(task.start, task.end);
    for (let card of sliceCards) {
      renderTask(taskListElement, card);
    }
    const cards = document.querySelectorAll(`.card`);
    const cardsLength = Array.from(cards).length;
    if (cardsLength >= dataCards.length - 1) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  };
  loadMoreButtonComponent.getElement().addEventListener(`click`, addCards);
};
const boardComponent = new Board();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderBoard(boardComponent, dataCards);


