import AbstractComponent from './abstrackt-component.js';
export const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMore extends AbstractComponent {

  getTemplate() {
    return createLoadMoreButtonTemplate();
  }
  setClickHendler(hendler) {
    this.getElement().addEventListener(`click`, hendler);
  }
}
