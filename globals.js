window.asafonov = {};
window.asafonov.messageBus = new MessageBus();
window.asafonov.events = {
  ITEM_UPDATED: 'itemUpdated',
  ITEM_ADDED: 'itemAdded'
};
window.asafonov.settings = {
  passwordMinLength: 12,
  passwordMaxLength: 24,
  simpleByDefault: true
};
