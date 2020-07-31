class ItemView {

  constructor() {
    this.element = document.querySelector('.editItem');
    this.cancelButton = document.querySelector('.cancel');
    this.saveButton = this.element.querySelector('.save');
    this.deleteButton = this.element.querySelector('.delete');
    this.onCancelProxy = this.onCancel.bind(this);
    this.onDeleteProxy = this.onDelete.bind(this);
    this.onSaveProxy = this.onSave.bind(this);
    this.cancelButton.addEventListener('click', this.onCancelProxy);
    this.saveButton.addEventListener('click', this.onSaveProxy);
    this.deleteButton.addEventListener('click', this.onDeleteProxy);
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

  onDelete() {
    this.hide();
    asafonov.messageBus.send(asafonov.events.EDIT_DELETED, {item: this.model});
  }

  onSave() {
    asafonov.messageBus.send(asafonov.events.EDIT_SAVED, {
      item: this.model,
      name: this.element.querySelector('input[name=item_name]').value,
      password: this.element.querySelector('input[name=item_man_pass]').value
    });
  }

  destroy() {
    this.cancelButton.removeEventListener('click', this.hideProxy);
    this.element = null;
    this.cancelButton = null;
    this.deleteButton = null;
    this.saveButton = null;
    asafonov.messageBus.unsubscribe(asafonov.events.EDIT_STARTED, this, 'onEditStarted');
  }
}
