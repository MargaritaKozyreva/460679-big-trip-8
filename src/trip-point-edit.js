import Component from './component.js';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default class TripPointEdit extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._id = data.id;
    this._title = data.title;
    this._icon = data.icon;
    this._offers = [...data.offers].map((item) => {
      return {
        name: item,
        isSelected: true,
        price: 20
      };
    });
    this._description = data.description;
    this._picture = data.picture;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._currencyRate = data.currencyRate;

    this._onSubmit = null;
    this._onReset = null;
    this._dateFlatpickr = null;

    this._state.isFavorite = false;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onResetButtonClick = this._onResetButtonClick.bind(this);
    this._onChangeFavorite = this._onChangeFavorite.bind(this);
  }
  _processForm(formData) {
    const newFields = {
      day: new Date(),
      id: ``,
      timeStart: ``,
      timeEnd: ``,
      price: ``,
      offers: this._offers.map((item) => {
        return {
          name: item.name,
          isSelected: false,
          price: item.price
        };
      })
    };

    const pointEditMapper = TripPointEdit.createMapper(newFields);
    for (const pair of formData.entries()) {
      const [key, value] = pair;
      if (pointEditMapper[key]) {
        pointEditMapper[key](value);
      }
    }
    return newFields;
  }

  static createMapper(target) {
    return {
      'destination': (value) => {
        target.id = value;
      },
      'time': (value) => {
        target.timeStart = value.split(`to`)[0].toString().trim();
        target.timeEnd = value.split(`to`)[1].toString().trim();
      },
      'price': (value) => {
        target.price = value;
      },
      'offer': (value) => {
        target.offers.find((item) => item.name === value).isSelected = true;
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

  _onChangeFavorite() {
    this._state.isFavorite = !this._state.isFavorite;
  }

  _onChangeCursor(evt) {
    evt.preventDefault();
    evt.target.style.cursor = `pointer`;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
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
        <label class="travel-way__label" for="travel-way__toggle">${this._icon}</label>

        <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

        <div class="travel-way__select">
          <div class="travel-way__select-group">
          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi" ${this._type === `Taxi` ? `checked` : ``}>
          <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>

          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus" ${this._type === `Bus` ? `checked` : ``}>
          <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>

          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train" ${this._type === `Train` ? `checked` : ``}>
          <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>

          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="flight"  ${this._type === `Flight` ? `checked` : ``}>
          <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
        </div>

        <div class="travel-way__select-group">
          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in" ${this._type === `Check-in` ? `checked` : ``}>
          <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

          <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing" ${this._type === `Sightseeing` ? `checked` : ``}>
          <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
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
        ${this._offers.map((offer) => `
          <input class="point__offers-input visually-hidden" type="checkbox" id="${offer.name}" name="offer" value="${offer.name}"${offer.isSelected === true ? `checked` : ``}>
          <label for="${offer.name}" class="point__offers-label">
            <span class="point__offer-service">${offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
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
    this.element.querySelector(`.point__time`).addEventListener(`mouseover`, this._onChangeCursor);
    flatpickr(this.element.querySelector(`.point__time .point__input`), {
      mode: `range`,
      noCalendar: false,
      enableTime: true,
      altInput: true,
      altFormat: `h:i`,
      dateFormat: `H:i`,
      time_24hr: true
    });
  }

  unbind() {
    this.element.querySelector(`.point__buttons [type=submit]`).removeEventListener(`click`, this._onSubmitButtonClick);
    this.element.querySelector(`.point__buttons [type=reset]`).removeEventListener(`click`, this._onResetButtonClick);
  }

  update(data) {
    this._id = data.id;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._offers = data.offers;
  }

  _onResetButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onReset === `function`) {
      this._onReset();
    }
  }
}
