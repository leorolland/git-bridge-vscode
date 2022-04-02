import { Uri } from 'vscode';

/**
 * A structure repreesenting the repository, the remote url
 * and optionally a more precise location : branch, file, line, column...
 */
export class Location {
    uri: Uri;

    constructor(remoteUrl: string) {
        this.uri = Uri.parse(remoteUrl);
    }
}
