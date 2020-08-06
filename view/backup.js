class BackupView {
  constructor (list) {
    this.element = document.querySelector('.backup');
    this.list = list;
    this.onPopupProxy = this.onPopup.bind(this);
    this.onFileExportProxy = this.onFileExport.bind(this);
    this.onFileImportProxy = this.onFileImport.bind(this);
    this.manageEventListeners();
  }

  manageEventListeners (remove) {
    const action = remove ? 'removeEventListener' : 'addEventListener';
    this.element[action]('click', this.onPopupProxy);
    this.element.querySelector('.file_up')[action]('click', this.onFileExportProxy);
    this.element.querySelector('.file_down')[action]('click', this.onFileImportProxy);
  }

  onPopup() {
    this.element.classList.add('open');
  }

  onFileExport() {
  }

  onFileImport() {
    const hostname = prompt('Please enter spass desktop host', '192.168.0.1');

    if (hostname) {
      fetch('http://' + hostname + '/data')
      .then(response => response.json())
      .then(data => {
        this.list.load(data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  hidePopup() {
    this.element.classList.remove('open');
  }

  destroy() {
    this.manageEventListeners(true);
    this.element = null;
    this.list = null;
  }
}
