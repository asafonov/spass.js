class Item {

  constructor (name, password) {
    this.name = name;
    
    if (password === null || password === undefined) {
      this.update();
    } else {
      this.set(name, password);
    }
  }

  update (simple) {
    if (simple === null || simple === undefined) {
      simple = asafonov.settings.simpleByDefault;
    }

    const alphabet = simple ? "simpleAlphabet" : "alphabet";
    const alphabetLength = this[alphabet].length;
    let password = '';

    for (let i = 0; i < asafonov.settings.passwordLength; ++i) {
      password += this[alphabetLength][parseInt(Math.random() * alphabetLength, 10)];
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

Item.simpleAlphabet = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
Item.alphabet = Item.simpleAlphabet + "!#?@-*()[]\/+%:;&{},.<>_";
