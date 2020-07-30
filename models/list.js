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

  load (data) {
  }

  save() {
    let passwords = {};

    for (let i in this.items) {
      passwords[i] = this.items[i].get();
    }

    window.localStorage.setItem('passwords', JSON.stringify(passwords));
  }
}
