import {createElement} from './utils.js';
export const createTaskEditTemplate = ({color, description, repeatingDays, dueDate, tags}) => {
  return (
    `<article class="card card--edit card--${color} ${Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `card--repeat` : ``}">
    <form class="card__form" method="get">
       <div class="card__inner">
          <div class="card__control">
             <button type="button" class="card__btn card__btn--archive"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
             archive
             </font></font></button>
             <button type="button" class="card__btn card__btn--favorites card__btn--disabled"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
             favorites
             </font></font></button>
          </div>
          <div class="card__color-bar">
             <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
             </svg>
          </div>
          <div class="card__textarea-wrap">
             <label>
             <textarea class="card__text" placeholder="Start typing your text here..." name="text">${description}</textarea>
             </label>
          </div>
          <div class="card__settings">
             <div class="card__details">
                <div class="card__dates">
                   <button class="card__date-deadline-toggle" type="button"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                   дата: </font></font><span class="card__date-status"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">да</font></font></span>
                   </button>
                   <fieldset class="card__date-deadline">
                      <label class="card__input-deadline-wrap">
                      <input class="card__date" type="text" placeholder="" name="date" value="${new Date(dueDate).toDateString()}">
                      </label>
                   </fieldset>
                   <button class="card__repeat-toggle" type="button"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                   повторить: </font></font><span class="card__repeat-status"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                   ${Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `да` : `нет`}</font></font></span>
                   </button>
                   <fieldset class="card__repeat-days">
                      <div class="card__repeat-days-inner">
                         <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-4" name="repeat" value="mo"
                         ${repeatingDays.Mo ? `checked=""` : ``}>
                         <label class="card__repeat-day" for="repeat-mo-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">мо</font></font></label>
                         <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-4" name="repeat" value="tu"
                         ${repeatingDays.Tu ? `checked=""` : ``}>
                         <label class="card__repeat-day" for="repeat-tu-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">вт</font></font></label>
                         <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-4" name="repeat" value="we"
                         ${repeatingDays.We ? `checked=""` : ``}>
                         <label class="card__repeat-day" for="repeat-we-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">мы</font></font></label>
                         <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-4" name="repeat" value="th"
                         ${repeatingDays.Th ? `checked=""` : ``}>
                         <label class="card__repeat-day" for="repeat-th-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">го</font></font></label>
                         <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-4" name="repeat" value="fr"
                         ${repeatingDays.Fr ? `checked=""` : ``}>
                         <label class="card__repeat-day" for="repeat-fr-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">фр</font></font></label>
                         <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-4"
                         ${repeatingDays.Sa ? `checked=""` : ``}>
                         <label class="card__repeat-day" for="repeat-sa-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">са</font></font></label>
                         <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-4" name="repeat" value="su"
                         ${repeatingDays.Su ? `checked=""` : ``}>
                         <label class="card__repeat-day" for="repeat-su-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">су</font></font></label>
                      </div>
                   </fieldset>
                </div>
                <div class="card__hashtag">
                   <div class="card__hashtag-list">
                   ${Array.from(tags).map((tag) => `<span class="card__hashtag-inner">
                         <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
                         <p class="card__hashtag-name"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                            #${tag}
                            </font></font>
                         </p>
                         <button type="button" class="card__hashtag-delete"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                         удалять
                         </font></font></button>
                      </span>`).join(``)}
                   </div>
                   <label>
                   <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
                   </label>
                </div>
             </div>
             <div class="card__colors-inner">
                <h3 class="card__colors-title"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">цвет</font></font></h3>
                <div class="card__colors-wrap">
                   <input type="radio" id="color-black-4" class="card__color-input card__color-input--black visually-hidden" name="color" value="black">
                   <label for="color-black-4" class="card__color card__color--black"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">черный</font></font></label>
                   <input type="radio" id="color-yellow-4" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow" checked="">
                   <label for="color-yellow-4" class="card__color card__color--yellow"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">желтый</font></font></label>
                   <input type="radio" id="color-blue-4" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue">
                   <label for="color-blue-4" class="card__color card__color--blue"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">синий</font></font></label>
                   <input type="radio" id="color-green-4" class="card__color-input card__color-input--green visually-hidden" name="color" value="green">
                   <label for="color-green-4" class="card__color card__color--green"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">зеленый</font></font></label>
                   <input type="radio" id="color-pink-4" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink">
                   <label for="color-pink-4" class="card__color card__color--pink"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">розовый</font></font></label>
                </div>
             </div>
          </div>
          <div class="card__status-btns">
             <button class="card__save" type="submit"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">save</font></font></button>
             <button class="card__delete" type="button"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">delete</font></font></button>
          </div>
       </div>
    </form>
    </article>`
  );
};
export default class TaskEdit {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
