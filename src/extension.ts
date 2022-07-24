import * as vscode from 'vscode';

import { GitBridgeUriHandler } from './bridge/UriHandler';

export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(vscode.window.registerUriHandler(new GitBridgeUriHandler()));
}

export function deactivate(): void {
    // recycle resource...
}
