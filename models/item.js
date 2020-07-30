class Item {

  constructor (name, password) {
    this.name = name;
    this.simpleAlphabet = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.alphabet = Item.simpleAlphabet + "!#?@-*()[]\/+%:;&{},.<>_";
    
    if (password === null || password === undefined) {
      this.update();
    } else {
      this.set(password);
    }
  }

  update (simple) {
    if (simple === null || simple === undefined) {
      simple = asafonov.settings.simpleByDefault;
    }

    const alphabet = simple ? "simpleAlphabet" : "alphabet";
    const alphabetLength = this[alphabet].length;
    const passwordLength = asafonov.settings.passwordMinLength + parseInt((asafonov.settings.passwordMaxLength - asafonov.settings.passwordMinLength + 1) * Math.random(), 10);
    let password = '';

    for (let i = 0; i < passwordLength; ++i) {
      password += this[alphabet][parseInt(Math.random() * alphabetLength, 10)];
    }

    this.set(password);
  }

  set (password) {
    this.password = password;
    asafonov.messageBus.send(asafonov.events.ITEM_UPDATED, {item: this});
  }

  get() {
    return this.password;
  }
}
