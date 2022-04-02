import { commands, Uri, workspace } from 'vscode';

import { getLocalReferentialUri } from './Configuration';
import { Location } from './Location';

/**
 * Represents a local reference where repositories can be cloned
 * By default located at : $HOME/repositories
 */
export class LocalReferential {
    get root() {
        return Uri.file(getLocalReferentialUri());
    }

    /**
     * Path inside the local referential where the repository should be
     * @param loc resource location
     */
    localPath(loc: Location): Uri {
        return Uri.joinPath(this.root, loc.uri.authority, loc.uri.fsPath);
    }

    getParentFolder(path: string): string {
        return path.slice(0, Math.max(0, path.lastIndexOf('/')));
    }

    /**
     * Returns true if the repository has already been cloned
     * @param loc resource location
     */
    async isPresent(loc: Location) {
        try {
            await workspace.fs.stat(this.localPath(loc));
        } catch {
            return false;
        }
        return true;
    }

    /**
     * Open the folder where the repository should be cloned in VSCode
     * @param loc resource location
     */
    async open(loc: Location) {
        commands.executeCommand('vscode.openFolder', this.localPath(loc));
    }

    /**
     * Clones a repository in the local referential
     * @param loc resource location
     */
    async clone(loc: Location) {
        workspace.fs.createDirectory(this.root);
        commands.executeCommand(
            'git.clone',
            loc.uri.toString(),
            this.getParentFolder(this.localPath(loc).fsPath),
        );
    }
}
