document.addEventListener("DOMContentLoaded", function(event) {
  const list = new List();
  const listView = new ListView(list);
  listView.render();
  const backupView = new BackupView(list);
  const itemView = new ItemView();
});
