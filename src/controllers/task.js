import Task from '../components/task.js';
import TaskEdit from '../components/taskEdit.js';
import {render, RenderPosition, replace} from '../components/utils.js';
export default class TaskController {
  constructor(container, onDataChange) {
    this._taskComponent = null;
    this._taskEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(task) {
    this._taskComponent = new Task(task);
    this._taskEditComponent = new TaskEdit(task);


    this._taskComponent.setEditButtonClickHendler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);

    });
    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskEditComponent.setSubmitButtonSave(() => {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
    
    render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
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
