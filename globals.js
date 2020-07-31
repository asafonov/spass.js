window.asafonov = {};
window.asafonov.messageBus = new MessageBus();
window.asafonov.events = {
  ITEM_UPDATED: 'itemUpdated',
  ITEM_ADDED: 'itemAdded',
  ITEM_DELETED: 'itemDeleted',
  LIST_UPDATED: 'listUpdated',
  EDIT_STARTED: 'editStarted',
  EDIT_CANCELLED: 'editCancelled',
  EDIT_SAVED: 'editSaved',
  EDIT_DELETED: 'editDeleted',
};
window.asafonov.settings = {
  passwordMinLength: 12,
  passwordMaxLength: 24,
  simpleByDefault: true
};
