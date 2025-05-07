import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('phpDocViewer.showDoc', async () => {
    const panel = vscode.window.createWebviewPanel(
      'phpDocumentation',
      'PHP Documentation',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, 'media'))
        ]
      }
    );

    const indexPath = vscode.Uri.file(path.join(context.extensionPath, 'media/php-doc/index.html'));
    const html = fs.readFileSync(indexPath.fsPath, 'utf8');

    const baseUri = panel.webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, 'media/php-doc'))
    );

    const transformedHtml = html.replace(
      /<head>/,
      `<head><base href="${baseUri}/">`
    );

    panel.webview.html = transformedHtml;
  });

  context.subscriptions.push(disposable);
}
