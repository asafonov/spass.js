class BackupView {
  constructor (list) {
    this.element = document.querySelector('.backup');
    this.list = list;
    this.onPopupProxy = this.onPopup.bind(this);
    this.onFileExportProxy = this.onFileExport.bind(this);
    this.onFileImportProxy = this.onFileImport.bind(this);
    this.onFileReadyProxy = this.onFileReady.bind(this);
    this.manageEventListeners();
  }

  manageEventListeners (remove) {
    const action = remove ? 'removeEventListener' : 'addEventListener';
    this.element[action]('click', this.onPopupProxy);
    this.element.querySelector('.file_up')[action]('click', this.onFileExportProxy);
    this.element.querySelector('.file_down')[action]('click', this.onFileImportProxy);
    this.element.querySelector('.file_down input')[action]('change', this.onFileReadyProxy);
  }

  onPopup() {
    this.element.classList.add('open');
  }

  onFileExport() {
  }

  onFileImport() {
    this.element.querySelector('input').click();
  }

  onFileReady (event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      
      reader.addEventListener('load', function (e) {
        this.list.load(JSON.parse(e.target.result));
      });
      
      reader.readAsBinaryString(event.target.files[0]);
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
