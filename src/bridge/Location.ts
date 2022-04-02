import { Uri } from 'vscode';

/**
 * A structure repreesenting the repository, the remote url
 * and optionally a more precise location : branch, file, line, column...
 */
export class Location {
    uri: Uri;

    /**
     * Example remoteUrl
     * https://git.mygitlab.fr/group-a/b/c/d/repo-name/-/merge_requests/10/diffs?commit_id=43728947328974398274983
     */
    constructor(remoteUrl: string) {
        this.uri = Uri.parse(remoteUrl);
    }

    /**
     * Returns
     * /group-a/b/c/d/repo-name
     */
    getRepositoryPath(): string {
        return this.uri.path.split('/-/')[0];
    }

    /**
     * Returns
     * git@git.mygitlab.fr:group-a/b/c/d/repo-name.git
     */
    getRemoteAsSSH(): string {
        return `git@${this.uri.authority}:${this.getRepositoryPath().slice(1)}.git`;
    }

    /**
     * Returns
     * https://git.mygitlab.fr/group-a/b/c/d/repo-name/-/merge_requests/10/diffs?commit_id=43728947328974398274983
     */
    getRemoteAsHTTP(): string {
        return this.uri.toString();
    }
}
