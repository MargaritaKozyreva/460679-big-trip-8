import {
  getDuration
} from './constants.js';
import Component from './component.js';

export default class TripPoint extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._id = data.id;
    this._title = data.title;
    this._icon = data.icon;
    this._offers = [...data.offers].map((item) => {
      return {
        name: item,
        isSelected: false,
        price: 20
      };
    });
    this._description = data.description;
    this._picture = data.picture;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._currencyRate = data.currencyRate;

    this._onClick = null;
    this._onPointClick = this._onPointClick.bind(this);
  }

  get _getDuration() {
    return getDuration(this._timeStart, this._timeEnd);
  }

  get template() {
    return `
<article class="trip-point">
  <i class="trip-icon">${this._icon}</i>
  <h3 class="trip-point__title">${this._title} ${this._id}</h3>
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${this._timeStart} — ${this._timeEnd}</span>
    <span class="trip-point__duration">${this._getDuration}</span>
  </p>
  <p class="trip-point__price">${this._price} ${this._currencyRate}</p>
  <ul class="trip-point__offers">
  ${this._offers.map((offer) => offer.isSelected === true ?  `<li><button class="trip-point__offer">${offer.name}</button></li>` : ``).join(``)}
  </ul>
</article>`.trim();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  bind() {
    this.element.addEventListener(`click`, this._onPointClick);
  }

  unbind() {
    this.element.removeEventListener(`click`, this._onPointClick);
  }

  update(data) {
    this._id = data.id;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._offers = data.offers;
  }

  _onPointClick() {
    if (typeof this._onClick === `function`) {
      this._onClick();
    }
  }
}
