class ItemView {

  constructor() {
    this.element = document.querySelector('.editItem');
    this.cancelButton = document.querySelector('.cancel');
    this.saveButton = this.element.querySelector('.save');
    this.deleteButton = this.element.querySelector('.delete');
    this.newButton = document.querySelector('.new_item');
    this.onCancelProxy = this.onCancel.bind(this);
    this.onDeleteProxy = this.onDelete.bind(this);
    this.onSaveProxy = this.onSave.bind(this);
    this.onNewProxy = this.onNew.bind(this);
    this.cancelButton.addEventListener('click', this.onCancelProxy);
    this.saveButton.addEventListener('click', this.onSaveProxy);
    this.deleteButton.addEventListener('click', this.onDeleteProxy);
    this.newButton.addEventListener('click', this.onNewProxy);
    asafonov.messageBus.subscribe(asafonov.events.EDIT_STARTED, this, 'onEditStarted');
  }

  show() {
    this.render();
    this.element.classList.remove('hidden');
    this.cancelButton.classList.remove('hidden');
    document.querySelector('.new_item').classList.add('hidden');
    document.querySelector('.new_item_ico').classList.add('hidden');
    asafonov.messageBus.send(asafonov.events.POPUP_SHOW);
  }

  hide() {
    this.element.classList.add('hidden');
    this.cancelButton.classList.add('hidden');
    document.querySelector('.new_item').classList.remove('hidden');
    document.querySelector('.new_item_ico').classList.remove('hidden');
    asafonov.messageBus.send(asafonov.events.POPUP_HIDE);
  }

  render () {
    this.element.querySelector('.name').innerHTML = (this.model ? 'Edit' : 'Add') + ' Spass Item';
    this.element.querySelector('input[name=item_name]').value = this.model ? this.model.name : '';
    this.deleteButton.classList[this.model ? 'remove' : 'add']('hidden');
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
    const genpass = this.element.querySelector('#genpass').checked;
    const name = this.element.querySelector('input[name=item_name]');
    const pass = this.element.querySelector('input[name=item_man_pass]');
    name.classList.remove('error');
    pass.classList.remove('error');

    if (name.value == '') {
      name.classList.add('error');
      return;
    }

    if (! genpass && pass.value == '') {
      pass.classList.add('error');
      return;
    }

    this.hide();
    asafonov.messageBus.send(asafonov.events.EDIT_SAVED, {
      item: this.model,
      name: name.value,
      password: genpass ? '' : pass.value
    });
  }

  onNew() {
    asafonov.messageBus.send(asafonov.events.EDIT_STARTED, {});
  }

  destroy() {
    this.cancelButton.removeEventListener('click', this.hideProxy);
    this.saveButton.removeEventListener('click', this.onSaveProxy);
    this.deleteButton.removeEventListener('click', this.onDeleteProxy);
    this.element = null;
    this.cancelButton = null;
    this.deleteButton = null;
    this.saveButton = null;
    this.newButton = null;
    asafonov.messageBus.unsubscribe(asafonov.events.EDIT_STARTED, this, 'onEditStarted');
  }
}
