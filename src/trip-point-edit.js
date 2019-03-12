import * as constant from './constants.js';
import {createElement} from './create-element.js';

export class TripPointEdit {
  constructor(data) {
    this._id = data.id;
    this._title = data.title;
    this._icons = data.icons;
    this._element = null;
    this._onSubmit = null;
    this._onReset = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onResetButtonClick = this._onResetButtonClick.bind(this);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  _onResetButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onReset === `function`) {
      this._onReset();
    }
  }

  get _offers() {
    return constant.getRandomParam(constant.OFFERS, constant.OFFERS_COUNT);
  }

  get _desc() {
    return constant.getRandomParam(constant.DESCRIPTION, constant.DESCRIPTIONS_COUNT, `.`);
  }

  get _pic() {
    return constant.getRandomPicture();
  }

  get _timeStart() {
    return constant.getRandomParam(constant.TIME_START, constant.TIME_COUNT).join(``);
  }

  get _timeEnd() {
    return constant.getRandomParam(constant.TIME_END, constant.TIME_COUNT).join(``);
  }

  get _price() {
    return `${constant.getRandomParam(constant.PRICE, constant.PRICE_COUNT)}`;
  }

  get _getDuration() {
    return constant.getDuration(this._timeStart, this._timeEnd);
  }

  set onReset(fn) {
    this._onReset = fn;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  bind() {
    this._element.addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.addEventListener(`reset`, this._onResetButtonClick);
  }

  unbind() {
    this._element.removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.removeEventListener(`reset`, this._onResetButtonClick);
  }

  get template() {
    return `
    <article class="point">
  <form action="" method="get">
    <header class="point__header">
      <label class="point__date">
        choose day
        <input class="point__input" type="text" placeholder="MAR 18" name="day">
      </label>

      <div class="travel-way">
        <label class="travel-way__label" for="travel-way__toggle">${this._icons.icon}</label>

        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

        <div class="travel-way__select">
          <div class="travel-way__select-group">
          ${(Array.from(this._icons).map((icon) => `
            <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${icon.title.toLowerCase()}" name="travel-way" value="${icon.title.toLowerCase()}">
            <label class="travel-way__select-label" for="travel-way-${icon.title.toLowerCase()}">${icon.icon} ${icon.title.toLowerCase()}</label>
            `.trim()))}
          </div>
        </div>
      </div>

      <div class="point__destination-wrap">
        <label class="point__destination-label" for="destination">${this._title}</label>
        <input class="point__destination-input" list="destination-select" id="destination" value="${this._id}" name="destination">
        <datalist id="destination-select">
          <option value="airport"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="hotel"></option>
        </datalist>
      </div>

      <label class="point__time">
        choose time
        <input class="point__input" type="text" value="${this._timeStart} — ${this._timeEnd}" name="time" placeholder=${this._timeStart} — ${this._timeEnd}>
      </label>

      <label class="point__price">
        write price
        <span class="point__price-currency">€</span>
        <input class="point__input" type="text" value="${this._price}" name="price">
      </label>

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
        <h3 class="point__details-title">offers</h3>

        <div class="point__offers-wrap">
        ${this._offers.map((offer) => `
          <input class="point__offers-input visually-hidden" type="checkbox" id="${offer}" name="offer" value="${offer}">
          <label for="${offer}" class="point__offers-label">
            <span class="point__offer-service">${offer}</span> + €<span class="point__offer-price">${this._price}</span>
          </label>`.trim()).join(``)}
        </div>

      </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">${this._desc}</p>
        <div class="point__destination-images">
        <img src= "${this._pic}" alt="picture from place" class="point__destination-image">
        </div>
      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form>
</article>
    `.trim();
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}

