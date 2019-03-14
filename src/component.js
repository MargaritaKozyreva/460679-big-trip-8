import {createElement} from './create-element.js';

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
  }
  set onClick(fn) {
    this._onClick = fn;
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
