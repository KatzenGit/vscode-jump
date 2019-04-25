# vscode-jump
### what is vscode-jump?
- it is a vscode extension to make navigation in a big file easier
### what does vscode-jump do?
- it adds a 'Jump' command to the vscode command palette
- when run, it asks you for the name or expression you want to search for
- it then displays a list of matching occurences in the format ``line number: line text`` from which you can choose freely
- upon selection, vscode-jump will *jump* to the occurence, selecting it for you to easily use
### how do I get vscode-jump?
1. download this git
2. copy / cut *jump-0.0.1.vsix* (or refer to never version if present)
3. paste said file into your vscode extension folder
-   Windows  `%USERPROFILE%\.vscode\extensions`
-   macOS  `~/.vscode/extensions`
-   Linux  `~/.vscode/extensions`
4. reload vscode
5. use 'Jump' command from the vscode command palette