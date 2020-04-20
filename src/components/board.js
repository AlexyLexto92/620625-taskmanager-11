import AbstractComponent from './abstrackt-component.js';

export const createBoardTemplate = () => {
  return (
    `<section class="board container">
      <div class="board__tasks"></div>
    </section>`
  );
};

export default class Board extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createBoardTemplate();
  }
}
