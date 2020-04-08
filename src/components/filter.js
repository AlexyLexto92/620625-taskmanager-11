export const createFilterTemplate = ({title, count}) => (`
          <input type="radio" id="filter__archive" class="filter__input visually-hidden" name="filter">
          <label for="filter__archive" class="filter__label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"></font>${title}</font><span class="filter__archive-count"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${count}</font></font></span></label>`);
