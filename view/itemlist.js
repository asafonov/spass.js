class ItemListView {

  constructor (model) {
    this.template = document.querySelector('.templates .itemlist').innerHTML;
    this.model = model;
    this.element = document.createElement('div');
    this.element.className = 'item';
    this.onClickProxy = this.onClick.bind(this);
    this.onCopyProxy = this.onCopy.bind(this);
    this.onGenerateProxy = this.onGenerate.bind(this);
    this.onEditProxy = this.onEdit.bind(this);
    this.hideAllDonesProxy = this.hideAllDones.bind(this);
    this.initBuffer();
  }

  initBuffer() {
    this.buffer = document.createElement('textarea');
    this.buffer.style.width = '1px';
    this.buffer.style.height = '1px';
    this.buffer.style.background = 'transparent';
    document.body.appendChild(this.buffer);
  }

  manageEventListeners (remove) {
    const action = remove ? 'removeEventListener' : 'addEventListener';
    this.element[action]('click', this.onClickProxy);
    this.element.querySelector('.copy')[action]('click', this.onCopyProxy);
    this.element.querySelector('.generate')[action]('click', this.onGenerateProxy);
    this.element.querySelector('.edit')[action]('click', this.onEditProxy);
  }

  render() {
    this.element.innerHTML = this.template.replace(/{name}/g, this.model.name).replace(/{value}/g, this.model.get());
    this.manageEventListeners();
    return this.element;
  }

  hideAllActions() {
    const actions = document.querySelectorAll('.open');

    for (let i = 0; i < actions.length; ++i) {
      actions[i].classList.remove('open');
    }
  }

  hideAllDones() {
    const dones = this.element.querySelectorAll('.true');

    for (let i = 0; i < dones.length; ++i) {
      dones[i].classList.remove('true');
    }
  }

  onCopy() {
    this.buffer.value = this.model.get();
    this.buffer.select();
    document.execCommand('copy');
    this.element.querySelector('.copy .done').classList.add('true');
    setTimeout(this.hideAllDonesProxy, 2000);
  }

  onGenerate() {
    this.model.update();
    this.element.querySelector('.generate .done').classList.add('true');
    setTimeout(this.hideAllDonesProxy, 2000);
  }

  onEdit() {
  }

  onClick (event) {
    this.hideAllActions();
    this.element.classList.add('open');
  }

  destroy() {
    this.manageEventListeners(true);
    this.template = null;
    this.model = null;
    this.element = null;
    this.buffer = null;
  }
}
