import SiteMenu from './components/menu.js';
import Filter from './components/filter.js';
import Board from './components/board.js';
import {dataCards, filters} from './components/data.js';
import {render, RenderPosition} from './components/utils.js';
import BoardController from './controllers/board.js';

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenu(), RenderPosition.BEFOREEND);

render(siteMainElement, new Filter(filters), RenderPosition.BEFOREEND);

const boardComponent = new Board();
const boardConroller = new BoardController(boardComponent);
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardConroller.render(dataCards);


