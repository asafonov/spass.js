document.addEventListener("DOMContentLoaded", function(event) {
  if (window.Telegram && window.Telegram.WebApp) {
    Telegram.WebApp.init({
      onError: error => alert(error)
    })

    if (Telegram.WebApp.isCameraAccessAvailable()) {
      Telegram.WebApp.requestCameraAccess(allowed => alert(allowed))
    }
  }
  const list = new List();
  const listView = new ListView(list);
  listView.render();
  const backupView = new BackupView(list);
  const itemView = new ItemView();
});
