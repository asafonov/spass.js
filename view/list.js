class ListView {

  constructor (model) {
    this.model = model;
    this.element = document.querySelector('.items');
    asafonov.messageBus.subscribe(asafonov.events.ITEM_ADDED, this, 'render');
  }

  render() {
    this.element.innerHTML = '';

    for (let i in this.model.items) {
      const item = new ItemListView(this.model.items[i]);
      this.element.appendChild(item.render());
    }
  }

  destroy() {
    this.model = null;
    this.element = null;
    asafonov.messageBus.unsubscribe(asafonov.events.ITEM_ADDED, this, 'render');
  }
}
