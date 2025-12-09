class BackupView {
  constructor (list) {
    this.element = document.querySelector('.backup')
    this.list = list
    this.a = this.createDownloadElement()
    this.onPopupProxy = this.onPopup.bind(this)
    this.onFileExportProxy = this.onFileExport.bind(this)
    this.onFileImportProxy = this.onFileImport.bind(this)
    this.manageEventListeners()
  }

  manageEventListeners (remove) {
    const action = remove ? 'removeEventListener' : 'addEventListener'
    this.element[action]('click', this.onPopupProxy)
    this.element.querySelector('.file_up')[action]('click', this.onFileExportProxy)
    this.element.querySelector('.file_down')[action]('click', this.onFileImportProxy)
  }

  onPopup() {
    this.element.classList.add('open')
  }

  createDownloadElement() {
    const a = document.createElement('a')
    a.style.display = 'none'
    document.body.appendChild(a)
    a.download = 'spass.json'
    return a
  }

  onFileExport() {
    this.a.href = URL.createObjectURL(new Blob([this.list.asString()], {type: 'text/json'}))
    this.a.click()
  }

  onFileImport() {
    this.promptAction = 'importFile'
    this.enterHostnameDialog()
  }

  importFile (hostname) {
    fetch('https://' + hostname + ':9092/data/')
    .then(response => response.json())
    .then(data => {
      this.list.load(data)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  exportFile (hostname) {
    fetch('https://' + hostname + ':9092/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: this.list.asString()
    })
    .then(() => {
      alert("Export completed")
    })
    .catch(error => {
      alert(error.message)
    })
  }

  hidePopup() {
    this.element.classList.remove('open')
  }

  destroy() {
    this.manageEventListeners(true)
    this.element = null
    this.list = null
  }
}
