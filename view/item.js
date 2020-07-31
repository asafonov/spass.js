class ItemView {

  constructor() {
    this.element = document.querySelector('.editItem');
    asafonov.messageBus.subscribe(asafonov.events.EDIT_STARTED, this, 'onEditStarted');
  }

  show() {
    this.render();
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }

  render () {
    console.log(this.element);
    this.element.querySelector('.name').innerHTML = (this.model ? 'Edit' : 'Add') + ' Spass Item';
    this.element.querySelector('input[name=item_name]').value = this.model ? this.model.name : '';
  }

  onEditStarted (data) {
    this.model = data.item;
    this.show();
  }

  destroy() {
    this.element = null;
    asafonov.messageBus.unsubscribe(asafonov.events.EDIT_STARTED, this, 'onEditStarted');
  }
}
