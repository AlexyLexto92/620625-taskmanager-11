import Task from '../components/task.js';
import TaskEdit from '../components/taskEdit.js';
import {render, RenderPosition, replace, remove} from '../components/utils.js';
export default class TaskController {
  constructor(container) {
    this._taskComponent = null;
    this._taskEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._container = container;
  }

  render(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);


    taskComponent.setEditButtonClickHendler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);

    });

    taskEditComponent.setSubmitButtonSave(() => {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
    render(this.container,this._taskComponent, RenderPosition.BEFOREEND);
  }
  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _replaceEditToTask() {
    replace(this._taskComponent, this._taskEditComponent);
  }
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
