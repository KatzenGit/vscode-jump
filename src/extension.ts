import * as vscode from 'vscode';

let lastPos: vscode.Selection;

export function activate(context: vscode.ExtensionContext) {
	lastPos = new vscode.Selection(0, 0, 0, 0);

	const jump = (backAfter: number) => {
		vscode.window.showInputBox({prompt: "What do you want to search for?"}).then(text => {
			if(!text) return;
			
			let editor = vscode.window.activeTextEditor;
			if(editor) {
				let lines = editor.document.getText().split('\n');
				let arr = [];
				for(let l = 0; l < lines.length; l ++) {
					if(lines[l].includes(text)) {
						arr.push([l+1, lines[l].split(/^ +/i).join('')]);
					}
				}
				if(arr.length == 0) return;
				
				vscode.window.showQuickPick(arr.map(o => o[0] + ": " + o[1])).then(data => {
					if(!text) return;
					if(!data) return;

					let y = parseInt(data.substr(0, data.indexOf(":"))) - 1;
					if(y < 0) y = 0;

					let x = lines[y].indexOf(text);
					
					if(!editor) return;
					
					lastPos = editor.selection;

					editor.selection = new vscode.Selection(y, x, y, x + text.length);

					let ry0 = y - 5;
					if(ry0 < 0) ry0 = 0;
					let ry1 = y + 5;
					if(ry1 > editor.document.lineCount) ry1 = editor.document.lineCount;

					editor.revealRange(new vscode.Range(ry0, 0, ry1, 0));

					if(backAfter == 0) return;

					setTimeout(() => {
						vscode.commands.executeCommand("extension.back");
					}, backAfter);
				})
			}
		})		
	};
	const back = () => {
		let editor = vscode.window.activeTextEditor;
		if(!editor) return;

		editor.selection = lastPos;

		let ry0 = lastPos.start.line - 5;
		if(ry0 < 0) ry0 = 0;
		let ry1 = lastPos.end.line + 5;
		if(ry1 > editor.document.lineCount) ry1 = editor.document.lineCount;

		editor.revealRange(new vscode.Range(ry0, 0, ry1, 0));
	}
	const peek = () => {
		vscode.window.showInputBox({prompt: "How long do you want to peek for?"}).then(text => {
			if(!text) return;

			let ms = parseInt(text);

			jump(ms * 1000);
		})
	}

	context.subscriptions.push(vscode.commands.registerCommand("extension.jump", () => jump(0)));
	context.subscriptions.push(vscode.commands.registerCommand("extension.back", back));
	context.subscriptions.push(vscode.commands.registerCommand("extension.peek", peek));

}

export function deactivate() {}
