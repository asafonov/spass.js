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
    this.onSwipeStartProxy = this.onSwipeStart.bind(this);
    this.onSwipeEndProxy = this.onSwipeEnd.bind(this);
    this.hideAllDonesProxy = this.hideAllDones.bind(this);
    this.showPassProxy = this.showPass.bind(this);
    this.hidePassProxy = this.hidePass.bind(this);
    this.swiper = new Swipe(this.element);
    this.swiper.onLeft(this.showPassProxy);
    this.swiper.onRight(this.hidePassProxy);
    this.swiper.onSwipeStart(this.onSwipeStartProxy);
    this.swiper.onSwipeEnd(this.onSwipeEndProxy);
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

  onSwipeStart() {
    const name = this.element.querySelector('.name');
    name.classList.remove('sweep');
    name.classList.add('transparent');
  }

  onSwipeEnd() {
    const name = this.element.querySelector('.name');
    name.classList.remove('transparent');
    name.classList.add('sweep');
    setTimeout(function() {name.classList.remove('sweep')}, 1000);
  }

  showPass() {
    this.element.querySelector('.name').innerHTML = this.model.get();
  }

  hidePass() {
    this.element.querySelector('.name').innerHTML = this.model.name;
  }

  hide() {
    this.element.classList.add('hidden');
  }

  show() {
    this.element.classList.remove('hidden');
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

  copyPasword() {
    navigator.clipboard.writeText(this.model.get()).then(() => {
      console.log("success");
    }).catch((e)=> {
      console.log(e);
    });

    if (NativeAndroid !== null && NativeAndroid !== undefined) {
      NativeAndroid.copyToClipboard(this.model.get());
    }
  }

  onCopy() {
    this.copyPasword();
    this.element.querySelector('.copy .done').classList.add('true');
    setTimeout(this.hideAllDonesProxy, 2000);
  }

  onGenerate() {
    this.model.update();
    this.element.querySelector('.generate .done').classList.add('true');
    this.hidePass();
    this.copyPasword();
    setTimeout(this.hideAllDonesProxy, 2000);
  }

  onEdit() {
    asafonov.messageBus.send(asafonov.events.EDIT_STARTED, {item: this.model});
  }

  onClick (event) {
    this.hideAllActions();
    this.element.classList.add('open');
  }

  destroy() {
    this.manageEventListeners(true);
    this.swiper.destroy();
    this.swiper = null;
    this.template = null;
    this.model = null;
    this.element = null;
  }
}
