class ListView {

  constructor (model) {
    this.model = model;
    this.views = {};
    this.element = document.querySelector('.items');
    asafonov.messageBus.subscribe(asafonov.events.LIST_UPDATED, this, 'render');
    asafonov.messageBus.subscribe(asafonov.events.POPUP_SHOW, this, 'hide');
    asafonov.messageBus.subscribe(asafonov.events.POPUP_HIDE, this, 'show');
  }

  render() {
    this.element.innerHTML = '';

    for (let i in this.model.items) {
      this.views[i] || (this.views[i] = new ItemListView(this.model.items[i]));
      this.element.appendChild(this.views[i].render());
    }

    this.show();
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
    asafonov.messageBus.unsubscribe(asafonov.events.LIST_UPDATED, this, 'render');
    asafonov.messageBus.unsubscribe(asafonov.events.POPUP_SHOW, this, 'hide');
    asafonov.messageBus.unsubscribe(asafonov.events.POPUP_HIDE, this, 'show');
  }
}
