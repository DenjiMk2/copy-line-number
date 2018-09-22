'use babel';

import CopyLineNumberView from './copy-line-number-view';
import { CompositeDisposable } from 'atom';

export default {

  copyLineNumberView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.copyLineNumberView = new CopyLineNumberView(state.copyLineNumberViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.copyLineNumberView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'copy-line-number:copy': () => this.copy()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.copyLineNumberView.destroy();
  },

  serialize() {
    return {
      copyLineNumberViewState: this.copyLineNumberView.serialize()
    };
  },

  toggle() {
    console.log('CopyLineNumber was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  copy() {
    function formatByObj(msg, obj) {
      return msg.replace(/\{(\w+)\}/g, function (m, k) {
        return obj[k];
      });
    };
    const curentFile = atom.workspace.getActivePaneItem().buffer.file;
    const curentFileName = curentFile.getBaseName();
    const rowNum = atom.workspace.getActiveTextEditor().cursors[0].getBufferRow() + 1;
    atom.clipboard.write(formatByObj(atom.config.get('copy-line-number.separateFormat'), {"1":curentFileName,"2":rowNum}));
  }

};
