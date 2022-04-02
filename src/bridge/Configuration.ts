import { window, workspace, WorkspaceConfiguration } from 'vscode';

export function getUserHome(): string {
    const homedir = process.env.HOME || process.env.USERPROFILE;
    if (!homedir || homedir == '') {
        window.showErrorMessage('Cannot find $HOME, using /tmp as root repo clone directory');
        return '/tmp';
    }
    return homedir;
}

export function getConfig(): WorkspaceConfiguration {
    return workspace.getConfiguration('gitbridge');
}

/**
 * The absolute path of the root repositories folder
 * Where the referential will be instanciated from
 */
export function getLocalReferentialUri(): string {
    const val = getConfig().get('repositoriesRoot');
    if (!val || val == '') {
        window.showErrorMessage('Invalid setting gitbridge.repositoriesRoot');
        return `${getUserHome()}/repositories`;
    }
    return (<string>val).replaceAll('$HOME', getUserHome());
}
