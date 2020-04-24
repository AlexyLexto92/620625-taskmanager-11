import Task from '../components/task.js';
import TaskEdit from '../components/taskEdit.js';
import LoadMore from '../components/loadMoreButton.js';
import Sort, {SortType} from '../components/sort.js';
import {dataCards} from '../components/data.js';
import {render, RenderPosition, replace, remove} from '../components/utils.js';
import NoTasks from '../components/no-task.js';

let task = {
  start: 0,
  end: 8,
  step: 8,
};


const renderTask = (taskListElement, card) => {

/*   const taskComponent = new Task(card);
  const taskEditComponent = new TaskEdit(card);


  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  taskComponent.setEditButtonClickHendler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitButtonSave(() => {
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(taskListElement, taskComponent, RenderPosition.BEFOREEND); */
};
const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};


export default class BoardController {
  constructor(container) {

    this._container = container;
    this._taskComponent = new Task();
    this._taskEditComponent = new TaskEdit();
    this._loadMoreButtonComponent = new LoadMore();
    this._noTask = new NoTasks();
    this._sort = new Sort();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((card) => card.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTask, RenderPosition.AFTERBEGIN);
      return;
    }
    render(container, this._sort, RenderPosition.AFTERBEGIN);
    const taskListElement = container.querySelector(`.board__tasks`);
    let sliceCards = tasks.slice(task.start, task.end);
    sliceCards.forEach((card) => {
      renderTask(taskListElement, card);
    });
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
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
        remove(this._loadMoreButtonComponent);
      }
    };
    this._loadMoreButtonComponent.setClickHendler(addCards);

    this._sort.setSortTypeChangeHandler((sortType)=>{
      const sortedTasks = getSortedTasks(tasks, sortType, 0, task.end);
      taskListElement.innerHTML = ``;
      sortedTasks.slice(0, task.end).forEach((card) => {
        renderTask(taskListElement, card);
      });
    });
  }
}
