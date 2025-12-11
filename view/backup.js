class BackupView {
  constructor (list) {
    this.element = document.querySelector('.backup')
    this.list = list
    this.qrCodeElement = this.createQRCodeElement()
    this.qrCode = this.createQRCode()
    this.scannerElement = this.createScannerElement()
    this.stream = null
    this.scanning = false
    this.rafId = null
    this.onPopupProxy = this.onPopup.bind(this)
    this.onExportProxy = this.onExport.bind(this)
    this.onImportProxy = this.onImport.bind(this)
    this.scanLoopProxy = this.scanLoop.bind(this)
    this.manageEventListeners()
  }

  manageEventListeners (remove) {
    const action = remove ? 'removeEventListener' : 'addEventListener'
    this.element[action]('click', this.onPopupProxy)
    this.element.querySelector('.file_up')[action]('click', this.onExportProxy)
    this.element.querySelector('.file_down')[action]('click', this.onImportProxy)
  }

  onPopup() {
    this.element.classList.add('open')
  }

  createQRCode() {
    const size = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) * 0.96
    return new QRCode(this.qrCodeElement.querySelector('div'), {width: size, height: size})
  }

  createQRCodeElement() {
    const div = document.createElement('div')
    const w = document.documentElement.clientWidth
    const h = document.documentElement.clientHeight
    const size = Math.min(w, h)
    div.style.position = 'fixed'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.width = `${w}px`
    div.style.height = `${h}px`
    div.style.display = 'none'
    div.style.zIndex = '999'
    div.className = 'back_color'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    div.style.flexDirection = 'column'
    document.body.appendChild(div)

    const qrDiv = document.createElement('div')
    qrDiv.style.width = `${size}px`
    qrDiv.style.height = `${size}px`
    qrDiv.style.justifyContent = 'center'
    qrDiv.style.alignItems = 'center'
    qrDiv.style.display = 'flex'
    qrDiv.style.backgroundColor = '#ffffff'
    div.appendChild(qrDiv)

    const button = document.createElement('div')
    button.innerHTML = 'Close'
    button.style.marginTop = '20px'
    button.addEventListener('click', () => {
      div.style.display = 'none'
    })

    div.appendChild(button)
    return div
  }

  createScannerElement() {
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
    div.className = 'back_color'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    div.style.flexDirection = 'column'

    const video = document.createElement('video')
    video.setAttribute('autoplay', true)
    video.setAttribute('playsinline', true)
    div.appendChild(video)

    const canvas = document.createElement('canvas')
    canvas.setAttribute('hidden', true)
    div.appendChild(canvas)

    document.body.appendChild(div)
    return div
  }

  onExport() {
    this.qrCodeElement.style.display = 'flex'
    this.qrCode.makeCode(this.list.asString())
    this.hidePopup()
  }

  async startCamera() {
    try {
      const video = this.scannerElement.querySelector('video')
      this.stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}})
      video.srcObject = this.stream
      this.scanning = true
      this.scanLoop()
    } catch (e) {
      alert(e.message)
    }
  }

  stopCamera() {
    this.scanning = false
    const video = this.scannerElement.querySelector('video')

    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }

    if (this.stream) {
      video.srcObject = null
      this.stream.getTracks().forEach(track => track.stop())
      this.stream = null
    }

    video.pause()
  }

  scanLoop() {
    if (! this.scanning) return

    const video = this.scannerElement.querySelector('video')
    const canvas = this.scannerElement.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code) {
        this.stopCamera()
        this.scannerElement.style.display = 'none'
        const data = JSON.parse(code.data)
        this.list.load(data)
        return
      }
    }

    this.rafId = requestAnimationFrame(this.scanLoopProxy)
  }

  onImport() {
    this.scannerElement.style.display = 'flex'
    this.hidePopup()
    this.startCamera()
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
