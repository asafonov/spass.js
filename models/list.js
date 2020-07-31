class List {

  constructor() {
    this.items = {};
    const passwords = JSON.parse(window.localStorage.getItem('passwords'));

    for (let i in passwords) {
      this.items[i] = new Item(i, passwords[i]);
    }

    asafonov.messageBus.subscribe(asafonov.events.ITEM_UPDATED, this, 'onItemUpdated');
  }

  onItemUpdated (data) {
    this.save();
  }

  updateItem (name, password) {
    if (this.items[name]) {
      this.items[name].set(password);
    } else {
      this.items[name] = new Item(name, password);
      asafonov.messageBus.send(asafonov.events.ITEM_ADDED, {item: this.items[name]});
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
}
