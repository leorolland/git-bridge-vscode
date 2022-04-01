import * as vscode from 'vscode';

import { GitBridgeUriHandler } from './bridge/UriHandler';
import helloWorld from './helloWorld';

export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(
        vscode.commands.registerCommand('VSCodeExtensionBoilerplate.helloVSCode', () =>
            helloWorld(),
        ),
        vscode.window.registerUriHandler(new GitBridgeUriHandler()),
    );
}

export function deactivate(): void {
    // recycle resource...
}
