import { ProviderResult, Uri, UriHandler, window } from 'vscode';

export class GitBridgeUriHandler implements UriHandler {
    // https://code.visualstudio.com/api/references/vscode-api#window.registerUriHandler
    // https://github.com/microsoft/vscode/blob/main/extensions/git/src/protocolHandler.ts

    handleUri(uri: Uri): ProviderResult<void> {
        window.showOpenDialog();
        window.createTerminal('test', '/bin/bash', uri.toString().split(' '));
        window.showInformationMessage(uri.toString());
    }
}
