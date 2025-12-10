class BackupView {
  constructor (list) {
    this.element = document.querySelector('.backup')
    this.list = list
    this.a = this.createDownloadElement()
    this.fileInput = this.createUploadElement()
    this.qrCodeElement = this.createQRCodeElement()
    this.qrCode = this.createQRCode()
    this.onPopupProxy = this.onPopup.bind(this)
    this.onExportProxy = this.onExport.bind(this)
    this.onImportProxy = this.onImport.bind(this)
    this.onFileUploadProxy = this.onFileUpload.bind(this)
    this.manageEventListeners()
  }

  manageEventListeners (remove) {
    const action = remove ? 'removeEventListener' : 'addEventListener'
    this.element[action]('click', this.onPopupProxy)
    this.element.querySelector('.file_up')[action]('click', this.onExportProxy)
    this.element.querySelector('.file_down')[action]('click', this.onImportProxy)
    this.fileInput[action]('change', this.onFileUploadProxy)
  }

  onPopup() {
    this.element.classList.add('open')
  }

  createQRCode() {
    const size = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) * 0.9
    return new QRCode(this.qrCodeElement.querySelector('div'), {width: size, height: size})
  }

  createQRCodeElement() {
    const div = document.createElement('div')
    const w = document.documentElement.clientWidth
    const h = document.documentElement.clientHeight
    div.style.position = 'fixed'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.width = `${w}px`
    div.style.height = `${h}px`
    div.style.display = 'none'
    div.style.zIndex = '999'
    div.style.backgroundColor = '#ffffff'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    div.style.flexDirection = 'column'
    document.body.appendChild(div)
    const qrDiv = document.createElement('div')
    div.appendChild(qrDiv)
    const button = document.createElement('button')
    button.innerHTML = 'Close'
    button.value = 'Close'
    button.style.marginTop = '20px'
    button.addEventListener('click', () => {
      div.style.display = 'none'
    })
    div.appendChild(button)
    return div
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

  onExport() {
    this.qrCodeElement.style.display = 'flex'
    this.qrCode.makeCode(this.list.asString())
    this.hidePopup()
  }

  onImport() {
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
