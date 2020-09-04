class List {

  constructor() {
    this.items = {};
    const passwords = JSON.parse(window.localStorage.getItem('passwords'));

    for (let i in passwords) {
      this.items[i] = new Item(i, passwords[i]);
    }

    asafonov.messageBus.subscribe(asafonov.events.ITEM_UPDATED, this, 'onItemUpdated');
    asafonov.messageBus.subscribe(asafonov.events.EDIT_DELETED, this, 'onEditDeleted');
    asafonov.messageBus.subscribe(asafonov.events.EDIT_SAVED, this, 'onEditSaved');
  }

  onItemUpdated (data) {
    this.save();
  }

  onEditDeleted (data) {
    const name = data.item.name;

    if (this.items[name]) {
      this.deleteItem(name);
      this.save();
      asafonov.messageBus.send(asafonov.events.LIST_UPDATED);
    }
  }

  onEditSaved (data) {
    if (data.item && data.item.name == data.name) {
      this.items[data.name].setOrUpdate(data.password);
    } else {
      data.item && this.deleteItem(data.item.name);
      this.items[data.name] = new Item(data.name, data.password);
      asafonov.messageBus.send(asafonov.events.LIST_UPDATED);
    }
  }

  deleteItem (name) {
    this.items[name].destroy();
    this.items[name] = null;
    delete this.items[name];
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

  asString() {
    let passwords = {};

    for (let i in this.items) {
      passwords[i] = this.items[i].get();
    }

    return JSON.stringify(passwords);
  }

  save() {
    window.localStorage.setItem('passwords', this.asString());
  }

  destroy() {
    asafonov.messageBus.unsubscribe(asafonov.events.ITEM_UPDATED, this, 'onItemUpdated');
    asafonov.messageBus.unsubscribe(asafonov.events.EDIT_DELETED, this, 'onEditDeleted');
    asafonov.messageBus.unsubscribe(asafonov.events.EDIT_SAVED, this, 'onEditSaved');
    this.items = null;
  }
}
