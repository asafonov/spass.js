class ListView {

  constructor (model) {
    this.model = model;
    this.views = {};
    this.element = document.querySelector('.items');
    this.searchInput = document.querySelector('.search input');
    this.searchProxy = this.search.bind(this);
    this.manageEventListeners();
  }

  manageEventListeners (remove) {
    const messageBusAction = remove ? 'unsubscribe' : 'subscribe';
    const DOMAction = remove ? 'removeEventListener' : 'addEventListener';
    asafonov.messageBus[messageBusAction](asafonov.events.LIST_UPDATED, this, 'render');
    asafonov.messageBus[messageBusAction](asafonov.events.POPUP_SHOW, this, 'hide');
    asafonov.messageBus[messageBusAction](asafonov.events.POPUP_HIDE, this, 'show');
    this.searchInput[DOMAction]('focus', (e) => e.currentTarget.value = '');
    this.searchInput[DOMAction]('input', this.searchProxy);
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

  search() {
    const query = this.searchInput.value;

    for (let i in this.model.items) {
      this.views[i].hide();
    }

    for (let i of this.model.search(query)) {
      this.views[i].show();
    }
  }

  destroy() {
    for (let i in this.views) {
      this.views.destroy();
      this.views[i] = null;
    }

    this.views = null;
    this.model = null;
    this.manageEventListeners(true);
    this.searchInput = null;
    this.element = null;
  }
}
