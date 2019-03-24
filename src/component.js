import {createElement} from './create-element.js';

export default class {
  constructor() {
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
