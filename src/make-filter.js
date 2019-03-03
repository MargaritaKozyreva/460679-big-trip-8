export default (type, id, name, value, isChecked = false) => {
  return `
  <input type=${type} id=${id} name=${name} value=${value} ${isChecked ? `checked` : ``}>
  <label class="trip-filter__item" for=${id}>${value.toUpperCase()}</label>
  `;
};
