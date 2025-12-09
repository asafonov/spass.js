class BackupView {
  constructor (list) {
    this.element = document.querySelector('.backup')
    this.list = list
    this.a = this.createDownloadElement()
    this.fileInput = this.createUploadElement()
    this.onPopupProxy = this.onPopup.bind(this)
    this.onFileExportProxy = this.onFileExport.bind(this)
    this.onFileImportProxy = this.onFileImport.bind(this)
    this.onFileUploadProxy = this.onFileUpload.bind(this)
    this.manageEventListeners()
  }

  manageEventListeners (remove) {
    const action = remove ? 'removeEventListener' : 'addEventListener'
    this.element[action]('click', this.onPopupProxy)
    this.element.querySelector('.file_up')[action]('click', this.onFileExportProxy)
    this.element.querySelector('.file_down')[action]('click', this.onFileImportProxy)
    this.fileInput[action]('change', this.onFileUploadProxy)
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

  createUploadElement() {
    const i = document.createElement('input')
    i.setAttribute('type', 'file')
    i.style.display = 'none'
    document.body.appendChild(i)
    return i
  }

  onFileExport() {
    this.a.href = URL.createObjectURL(new Blob([this.list.asString()], {type: 'text/json'}))
    this.a.click()
    this.hidePopup()
  }

  onFileImport() {
    this.fileInput.click()
  }

  onFileUpload (event) {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target.result)
          this.list.load(data)
          this.hidePopup()
        } catch (error) {
          alert(error.message)
        }
      }
      reader.readAsText(file)
    } else {
      alert('Unsupported file format')
    }
  }

  hidePopup() {
    this.element.classList.remove('open')
  }

  destroy() {
    this.manageEventListeners(true)
    this.element = null
    this.a = null
    this.fileInput = null
    this.list = null
  }
}
