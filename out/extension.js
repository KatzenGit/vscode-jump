"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.jump', () => {
        vscode.window.showInputBox().then(text => {
            text = "" + text;
            let editor = vscode.window.activeTextEditor;
            if (editor) {
                let lines = editor.document.getText().split('\n');
                let arr = [];
                for (let l = 0; l < lines.length; l++) {
                    if (lines[l].includes(text)) {
                        arr.push([l + 1, lines[l].split(/^ +/i).join('')]);
                    }
                }
                if (arr.length == 0)
                    return;
                vscode.window.showQuickPick(arr.map(o => o[0] + ": " + o[1])).then(data => {
                    if (!text)
                        return;
                    if (!data)
                        return;
                    let y = parseInt(data.substr(0, data.indexOf(":"))) - 1;
                    if (y < 0)
                        y = 0;
                    let x = lines[y].indexOf(text);
                    if (!editor)
                        return;
                    editor.selection = new vscode.Selection(y, x, y, x + text.length);
                    let ry0 = y - 5;
                    if (ry0 < 0)
                        ry0 = 0;
                    let ry1 = y + 5;
                    if (ry1 > editor.document.lineCount)
                        ry1 = editor.document.lineCount;
                    editor.revealRange(new vscode.Range(ry0, 0, ry1, 0));
                });
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map