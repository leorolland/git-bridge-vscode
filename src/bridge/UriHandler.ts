/* eslint-disable unicorn/prefer-ternary */
import { ProviderResult, Uri, UriHandler, window } from 'vscode';

import { LocalReferential } from './LocalReferential';
import { Location } from './Location';

export class GitBridgeUriHandler implements UriHandler {
    referential: LocalReferential = new LocalReferential();

    handleUri(uri: Uri): ProviderResult<void> {
        switch (uri.path) {
            case '/open':
                this.open(uri);
        }
    }

    /**
     * Clone a remote repository in the referential,
     * and opens it in code at the right location.
     */
    async open(uri: Uri) {
        // Controller
        const params = new URLSearchParams(uri.query);
        const remoteUrl = params.get('from');
        if (!remoteUrl) {
            window.showErrorMessage("Missing 'from' parameter : " + uri.toString());
            return;
        }
        const loc = new Location(remoteUrl);
        // Business logic
        if (await this.referential.isPresent(loc)) {
            await this.referential.open(loc);
        } else {
            await this.referential.clone(loc);
        }
    }
}
