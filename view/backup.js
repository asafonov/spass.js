class BackupView {
  constructor (list) {
    this.element = document.querySelector('.backup');
    this.prompt = document.querySelector('.prompt');
    this.list = list;
    this.onPopupProxy = this.onPopup.bind(this);
    this.onFileExportProxy = this.onFileExport.bind(this);
    this.onFileImportProxy = this.onFileImport.bind(this);
    this.promptAcceptedProxy = this.promptAccepted.bind(this);
    this.promptCancelledProxy = this.promptCancelled.bind(this);
    this.manageEventListeners();
  }

  manageEventListeners (remove) {
    const action = remove ? 'removeEventListener' : 'addEventListener';
    this.element[action]('click', this.onPopupProxy);
    this.element.querySelector('.file_up')[action]('click', this.onFileExportProxy);
    this.element.querySelector('.file_down')[action]('click', this.onFileImportProxy);
    this.prompt.querySelector('.ok')[action]('click', this.promptAcceptedProxy);
    this.prompt.querySelector('.cancel')[action]('click', this.promptCancelledProxy);
  }

  onPopup() {
    this.element.classList.add('open');
  }

  enterHostnameDialog() {
    this.prompt.classList.remove('hidden');
  }

  closeHostnameDialog() {
    this.prompt.classList.add('hidden');
  }

  promptAccepted() {
    const hostname = this.prompt.querySelector('input[name=hostname]').value;

    if (! hostname) {
      alert("Hostname can't be empty");
      return;
    }

    this.importFile(hostname);
    this.closeHostnameDialog();
  }

  promptCancelled() {
    this.closeHostnameDialog();
  }

  onFileExport() {
  }

  onFileImport() {
    this.enterHostnameDialog();
  }

  importFile (hostname) {
    if (hostname) {
      fetch('http://' + hostname + ':9092/data/')
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
