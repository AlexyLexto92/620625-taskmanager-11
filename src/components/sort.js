import AbstractComponent from './abstrackt-component.js';

export const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};

const createSortTemplate = () => {
  return (`<div class="board__filter-list">
  <a href="#" class="board__filter" data-sort-type=${SortType.DEFAULT}>SORT BY DEFAULT</a>
      <a href="#" class="board__filter" data-sort-type=${SortType.DATE_UP}>SORT BY DATE UP</a>
      <a href="#" class="board__filter" data-sort-type=${SortType.DATE_DOWN}>SORT BY DATE DOWN</a>
    </div>`
  );
};


export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return createSortTemplate();
  }
  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;


      handler(this._currenSortType);
    });
  }

}
