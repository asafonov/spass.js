class ListView {

  constructor (model) {
    this.model = model;
    this.views = {};
    this.element = document.querySelector('.items');
    asafonov.messageBus.subscribe(asafonov.events.ITEM_ADDED, this, 'render');
    asafonov.messageBus.subscribe(asafonov.events.EDIT_STARTED, this, 'hide');
  }

  render() {
    this.element.innerHTML = '';

    for (let i in this.model.items) {
      this.views[i] || (this.views[i] = new ItemListView(this.model.items[i]));
      this.element.appendChild(this.views[i].render());
    }
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }

  destroy() {
    for (let i in this.views) {
      this.views.destroy();
      this.views[i] = null;
    }

    this.views = null;
    this.model = null;
    this.element = null;
    asafonov.messageBus.unsubscribe(asafonov.events.ITEM_ADDED, this, 'render');
    asafonov.messageBus.subscribe(asafonov.events.EDIT_STARTED, this, 'hide');
  }
}
