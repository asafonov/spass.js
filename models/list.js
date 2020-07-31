class List {

  constructor() {
    this.items = {};
    const passwords = JSON.parse(window.localStorage.getItem('passwords'));

    for (let i in passwords) {
      this.items[i] = new Item(i, passwords[i]);
    }

    asafonov.messageBus.subscribe(asafonov.events.ITEM_UPDATED, this, 'onItemUpdated');
    asafonov.messageBus.subscribe(asafonov.events.EDIT_DELETED, this, 'onEditDeleted');
  }

  onItemUpdated (data) {
    this.save();
  }

  onEditDeleted (data) {
    const name = data.item.name;

    if (this.items[name]) {
      this.items[name].destroy();
      this.items[name] = null;
      delete this.items[name];
      this.save();
      asafonov.messageBus.send(asafonov.events.LIST_UPDATED);
    }
  }

  updateItem (name, password) {
    if (this.items[name]) {
      this.items[name].set(password);
    } else {
      this.items[name] = new Item(name, password);
      asafonov.messageBus.send(asafonov.events.LIST_UPDATED);
    }

    this.save();
  }

  load (data) {
    for (let i in data) {
      this.updateItem(i, data[i]);
    }
  }

  save() {
    let passwords = {};

    for (let i in this.items) {
      passwords[i] = this.items[i].get();
    }

    window.localStorage.setItem('passwords', JSON.stringify(passwords));
  }

  destroy() {
    asafonov.messageBus.unsubscribe(asafonov.events.ITEM_UPDATED, this, 'onItemUpdated');
    asafonov.messageBus.unsubscribe(asafonov.events.EDIT_DELETED, this, 'onEditDeleted');
    this.items = null;
  }
}
