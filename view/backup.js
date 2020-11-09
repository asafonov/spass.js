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
    this.prompt.querySelector('input[name=hostname]').value = window.localStorage.getItem('hostname') || '192.168.0.1';
    asafonov.messageBus.send(asafonov.events.POPUP_SHOW);
  }

  closeHostnameDialog() {
    this.prompt.classList.add('hidden');
    asafonov.messageBus.send(asafonov.events.POPUP_HIDE);
  }

  promptAccepted() {
    const hostname = this.prompt.querySelector('input[name=hostname]').value;

    if (! hostname) {
      alert("Hostname can't be empty");
      return;
    }

    window.localStorage.setItem('hostname', hostname);
    this[this.promptAction](hostname);
    this.closeHostnameDialog();
  }

  promptCancelled() {
    this.closeHostnameDialog();
  }

  onFileExport() {
    this.promptAction = 'exportFile';
    this.enterHostnameDialog();
  }

  onFileImport() {
    this.promptAction = 'importFile';
    this.enterHostnameDialog();
  }

  importFile (hostname) {
    fetch('http://' + hostname + ':9092/data/')
    .then(response => response.json())
    .then(data => {
      this.list.load(data);
    })
    .catch(error => {
      alert(error.message);
    });
  }

  exportFile (hostname) {
    fetch('http://' + hostname + ':9092/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: this.list.asString()
    })
    .then(() => {
      alert("Export completed");
    })
    .catch(error => {
      alert(error.message);
    });
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
