'use babel';

import { CompositeDisposable } from 'atom';

export default {

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'copy-line-number:copy': () => this.copy()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  copy() {
    function formatByObj(msg, obj) {
      return msg.replace(/\{(\w+)\}/g, function (m, k) {
        return obj[k];
      });
    };
    const curentFile = atom.workspace.getActivePaneItem().buffer.file;
    if(curentFile === null){
      atom.notifications.addWarning("copy-line-number:not found file");
      return;
    }
    const curentFileName = curentFile.getBaseName();
    const rowNum = atom.workspace.getActiveTextEditor().cursors[0].getBufferRow() + 1;
    const selectedText = atom.workspace.getActiveTextEditor().getSelectedText();
    const result = formatByObj(atom.config.get('copy-line-number.format'), {"1":curentFileName,"2":rowNum,"3":selectedText})
    atom.clipboard.write(result);
    atom.notifications.addInfo("Copied: " + result);
  }

};
