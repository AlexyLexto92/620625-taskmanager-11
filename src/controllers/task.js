import Task from '../components/task.js';
import TaskEdit from '../components/taskEdit.js';
import { render, RenderPosition, replace, remove } from '../components/utils.js';
export default class TaskController {
  constructor(container) {
    this._taskComponent = new Task();
    this._taskEditComponent = new TaskEdit();
    this._container = container;
  }
  render(task) {

  }
}