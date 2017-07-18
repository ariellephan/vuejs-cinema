function checkFilter(category, title, checked) {
  if (checked) {
    this[category].push(title);
  } else {
    let index = this[category].indexOf(title);
    if (this[category].includes(title)) {
      this[category].splice(index, 1);
    }
  }
}

export { checkFilter };
