class ListView {

  constructor (model) {
    this.model = model;
    this.element = document.querySelector('.items');
  }

  render() {
    this.element.innerHTML = '';

    for (let i in this.model.items) {
      const item = new ItemListView(this.model.items[i]);
      this.element.appendChild(item.render());
      item.destroy();
    }
  }

  destroy() {
    this.model = null;
    this.element = null;
  }
}
