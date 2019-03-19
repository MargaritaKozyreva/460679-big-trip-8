import {createElement} from './create-element.js';

export default class {
  constructor(data) {
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
    this._element = null;
    this._state = {};
    if (new.target === this) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  bind() {}

  unbind() {}

  update() {}

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this.element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }


}
