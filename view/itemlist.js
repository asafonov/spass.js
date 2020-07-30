class ItemListView {

  constructor (model) {
    this.template = document.querySelector('.templates .itemlist').innerHTML;
    this.model = model;
  }

  render() {
    let element = document.createElement('div');
    element.className = 'item';
    element.innerHTML = this.template.replace(/{name}/g, this.model.name).replace(/{value}/g, this.model.get());
    return element;
  }

  destroy() {
    this.template = null;
    this.model = null;
  }
}
