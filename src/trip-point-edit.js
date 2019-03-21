import Component from './component.js';

export default class TripPointEdit extends Component {
  constructor(data) {
    super();

    this._id = data.id;
    this._title = data.title;
    this._icons = data.icons;
    this._offers = data.offers;
    this._description = data.description;
    this._picture = data.picture;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._currencyRate = data.currencyRate;

    this._onSubmit = null;
    this._onReset = null;

    this._state.isFavorite = false;
    this._state.isSelectedOffer = this._getStateFromOffers();

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onResetButtonClick = this._onResetButtonClick.bind(this);
    this._onChangeFavorite = this._onChangeFavorite.bind(this);
    this._onChangeOffer = this._onChangeOffer.bind(this);
  }
  _processForm(formData) {
    const newFields = {
      day: new Date(),
      id: ``,
      timeStart: ``,
      timeEnd: ``,
      price: ``,
      offers: new Map(Object.entries(this._state.isSelectedOffer)), // 3. Присваиваем в поле offers наш созданный объект
    };

    const pointEditMapper = TripPointEdit.createMapper(newFields);
    for (const pair of formData.entries()) {
      const [key, value] = pair;
      if (pointEditMapper[key]) {
        pointEditMapper[key](value);
      }
    }
    newFields.offers = [...newFields.offers];
    return newFields;
  }
  _onChangeFavorite() {
    this._state.isFavorite = !this._state.isFavorite;
  }

  _onChangeOffer(evt) { // 2. Если по клику текущий элемент равен ключу в созданном объекте _offersObj -> меняем его value
    const currentItem = evt.target.value;
    for (const [key] of Object.entries(this._state.isSelectedOffer)) {
      if (key === currentItem) {
        this._state.isSelectedOffer[key] = !this._state.isSelectedOffer[key];
      }
    }
  }

  _onChangeCursor(evt) {
    evt.preventDefault();
    evt.target.style.cursor = `pointer`;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  // get _getStateFromOffers() { // 1. создаем объект по массиву offers, изначально value каждого поля false
  //   const offers = {};
  //   for (const pair of this._offers.entries()) {
  //     const key = pair[1];
  //     offers[key] = false;
  //   }
  //   return offers;
  // }

  _getStateFromOffers() {
    return this._offers.reduce(function (obj, key) {
      obj[key] = false;
      return obj;
    }, {});
  }

  set onReset(fn) {
    this._onReset = fn;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
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
        <input class="point__input" type="text" value="${this._timeStart} — ${this._timeEnd}" name="time" placeholder="00:00 — 00:00" >
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
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._state.isFavorite ? `checked` : ``}>
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>

    <section class="point__details">
      <section class="point__offers">
        <h3 class="point__details-title">offers</h3>

        <div class="point__offers-wrap">
        ${Object.entries(this._state.isSelectedOffer).map((offer) => `
          <input class="point__offers-input visually-hidden" type="checkbox" id="${offer[0]}" name="offer" value="${offer[0]}" ${offer[1] ? `checked` : ``}>
          <label for="${offer[0]}" class="point__offers-label">
            <span class="point__offer-service">${offer[0]}</span> + €<span class="point__offer-price">${this._price}</span>
          </label>`.trim()).join(``)}
        </div>

      </section>
      <section class="point__destination">
        <h3 class="point__details-title">Destination</h3>
        <p class="point__destination-text">${this._description}</p>
        <div class="point__destination-images">
        <img src= "${this._picture}" alt="picture from place" class="point__destination-image">
        </div>
      </section>
      <input type="hidden" class="point__total-price" name="total-price" value="">
    </section>
  </form>
</article>
    `.trim();
  }

  bind() {
    this.element.querySelector(`.point__buttons [type=submit]`).addEventListener(`click`, this._onSubmitButtonClick);
    this.element.querySelector(`.point__buttons [type=reset]`).addEventListener(`click`, this._onResetButtonClick);
    this.element.querySelector(`.point__favorite-input`).addEventListener(`click`, this._onChangeFavorite);
    Array.from(this.element.querySelectorAll(`.point__offers-input`)).forEach((it) => it.addEventListener(`click`, this._onChangeOffer));
    this.element.querySelector(`.point__time`).addEventListener(`mouseover`, this._onChangeCursor);
  }

  unbind() {
    this.element.querySelector(`.point__buttons [type=submit]`).removeEventListener(`click`, this._onSubmitButtonClick);
    this.element.querySelector(`.point__buttons [type=reset]`).removeEventListener(`click`, this._onResetButtonClick);
    Array.from(this.element.querySelectorAll(`.point__offers-input`)).forEach((it) => it.removeEventListener(`click`, this._onChangeOffer));
  }

  update(data) {
    this._id = data.id;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._offers = this._state.isSelectedOffer;
  }

  static createMapper(target) {
    return {
      'destination': (value) => {
        target.id = value;
      },
      'time': (value) => {
        target.timeStart = value.split(`—`)[0].trim();
        target.timeEnd = value.split(`—`)[1].trim();
      },
      'price': (value) => {
        target.price = value;
      },
      'offers': (value) => {
        target.offers[value] = true;
      },
    };
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point form`));
    const newData = this._processForm(formData);
    this.update(newData);
    return typeof this._onSubmit === `function` && this._onSubmit(newData);
  }

  _onResetButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onReset === `function`) {
      this._onReset();
    }
  }
}
