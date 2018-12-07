'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function getQuickPickItem(uri: any): any{
    return {
        scheme: 'file://',
        detail: uri,//getRelativeFileName(uri.fsPath),
        label: uri.split('/').pop(),//getFileName(uri.path),
        path:uri
    };
}

//clear text from unsupported char for locate
function clearText(txt:any){
    txt = txt.split('/').pop();
    txt = txt.split('\\').pop();
    return txt;
}

export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "file-locate" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.locateFile', () => {
        // The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;
        //let doc = editor.document;
        if(editor){
            let text = clearText(editor.document.getText(editor.selection));
             // Display a message box to the user
            vscode.window.showInformationMessage('Recherche en cours pour: ' + text );

            const cp = require('child_process');
            cp.exec('locate "'+text+'"', (err:any, stdout:any, stderr:any) => {

                let files = stdout.split("\n");
                files = files.filter((s:string) => s.length>0).map((f:string) => getQuickPickItem(f));

                vscode.window.showQuickPick(files,{
                    matchOnDetail:true
                })
                .then((file:any)=>{
                    if(file&&file.path){
                        vscode.workspace.openTextDocument(file.path).then(txtDocument=>vscode.window.showTextDocument(txtDocument));
                    }
                });
            });
        }
        else{
            vscode.window.showInformationMessage('Veuillez selectionner un texte à rechercher.');
        }
        
        

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}