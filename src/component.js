import {createElement} from './create-element.js';

export default class {
  constructor() {
    if (new.target === this) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
  }

  bind() {}

  unbind() {}

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this.element = createElement(this.template);
    this.bind();
    return this.element;
  }

  unrender() {
    this.unbind();
    this.element = null;
  }
}
