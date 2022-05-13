window.asafonov = {}
window.asafonov.messageBus = new MessageBus()
window.asafonov.events = {
  ITEM_UPDATED: 'itemUpdated',
  ITEM_ADDED: 'itemAdded',
  ITEM_DELETED: 'itemDeleted',
  LIST_UPDATED: 'listUpdated',
  EDIT_STARTED: 'editStarted',
  EDIT_CANCELLED: 'editCancelled',
  EDIT_SAVED: 'editSaved',
  EDIT_DELETED: 'editDeleted',
  POPUP_SHOW: 'popupShow',
  POPUP_HIDE: 'popupHide'
}
window.asafonov.settings = {
  passwordMinLength: 12,
  passwordMaxLength: 24,
  simpleByDefault: true
}
window.onerror = (msg, url, line) => {
  alert(`${msg} on line ${line}`)
}
