class ItemView {

  constructor() {
    this.element = document.querySelector('.editItem');
    this.cancelButton = document.querySelector('.cancel');
    this.onCancelProxy = this.onCancel.bind(this);
    this.cancelButton.addEventListener('click', this.onCancelProxy);
    asafonov.messageBus.subscribe(asafonov.events.EDIT_STARTED, this, 'onEditStarted');
  }

  show() {
    this.render();
    this.element.classList.remove('hidden');
    this.cancelButton.classList.remove('hidden');
    document.querySelector('.new_item').classList.add('hidden');
    document.querySelector('.new_item_ico').classList.add('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
    this.cancelButton.classList.add('hidden');
    document.querySelector('.new_item').classList.remove('hidden');
    document.querySelector('.new_item_ico').classList.remove('hidden');
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

  onCancel() {
    this.hide();
    asafonov.messageBus.send(asafonov.events.EDIT_CANCELLED);
  }

  destroy() {
    this.cancelButton.removeEventListener('click', this.hideProxy);
    this.element = null;
    this.cancelButton = null;
    asafonov.messageBus.unsubscribe(asafonov.events.EDIT_STARTED, this, 'onEditStarted');
  }
}
