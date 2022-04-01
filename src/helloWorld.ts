import vscode from 'vscode';

export default function helloWorld() {
    vscode.window.showInformationMessage(`${vscode.env.uriScheme}`);
}
