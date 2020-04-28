import Task from '../components/task.js';
import TaskEdit from '../components/taskEdit.js';
import LoadMore from '../components/loadMoreButton.js';
import Sort, { SortType } from '../components/sort.js';
import { dataCards } from '../components/data.js';
import { render, RenderPosition, remove } from '../components/utils.js';
import NoTasks from '../components/no-task.js';
import TaskController from '../controllers/task.js';

let task = {
  start: 0,
  end: 8,
  step: 8,
};


const renderTask = (taskListElement, tasks, onDataChange) => {
  return tasks.map((card) => {
    const taskController = new TaskController(taskListElement, onDataChange);
    taskController.render(card);
    return taskController;
  });
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
    this._tasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = 8;
    this._container = container;
    this._taskComponent = new Task();
    this._taskEditComponent = new TaskEdit();
    this._onDataChange = this._onDataChange.bind(this);
    this._loadMoreButtonComponent = new LoadMore();
    this._noTask = new NoTasks();
    this._sort = new Sort();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sort.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;
    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((card) => card.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTask, RenderPosition.AFTERBEGIN);
      return;
    }
    render(container, this._sort, RenderPosition.AFTERBEGIN);
    const taskListElement = container.querySelector(`.board__tasks`);
    let sliceCards = this._tasks.slice(task.start, task.end);



    const newTasks = renderTask(taskListElement, sliceCards, this._onDataChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._renderLoadMoreButton();
  }
  _renderLoadMoreButton() {
    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    const taskListElement = container.querySelector(`.board__tasks`);

    this._loadMoreButtonComponent.setClickHendler(() => {
      task.start = task.start + task.step;
      task.end = task.start + task.step;
      let sliceCards = dataCards.slice(task.start, task.end);


      const newTasks = renderTask(taskListElement, sliceCards, this._onDataChange);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      const cards = document.querySelectorAll(`.card`);
      const cardsLength = Array.from(cards).length;
      if (cardsLength >= this._tasks.length - 1) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
  _onSortTypeChange(sortType) {
    this._showingTasks = 8;
    const taskListElement = this._container.getElement().querySelector(`.board__tasks`);
    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, task.end);
    taskListElement.innerHTML = ``;


    const newTasks = renderTask(taskListElement, sortedTasks, this._onDataChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
  }
  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }
}
