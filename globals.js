window.asafonov = {};
window.asafonov.messageBus = new MessageBus();
window.asafonov.events = {
  ITEM_UPDATED: 'itemUpdated',
  ITEM_ADDED: 'itemAdded',
  EDIT_STARTED: 'editStarted',
  EDIT_CANCELLED: 'editCancelled',
  EDIT_COMPLETED: 'editCompleted'
};
window.asafonov.settings = {
  passwordMinLength: 12,
  passwordMaxLength: 24,
  simpleByDefault: true
};
