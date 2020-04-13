# kaholo-plugin-tfs
Kaholo Plugin for Team Foundation Server (TFS) All Documentation can be found in [TFS Documentation](https://docs.microsoft.com/en-us/azure/devops/repos/tfvc/use-team-foundation-version-control-commands?view=azure-devops)

## Method:Get

**Description**

gets a read-only copy of a file from the TFS to the workspace and creates folders with the file on the disk.

**Parameters**

1. Workspace - TFS Workspace of the resources
2. no prompt - (Boolean) Ignore questions
3. version spec - Specifies the maximum version, or the minimum and the maximum versions, to display in the history data. The default is /version:T (the latest version). [For Syntax](https://docs.microsoft.com/en-us/azure/devops/repos/tfvc/use-team-foundation-version-control-commands?view=azure-devops)
4. overwrite - (Boolean) By default, the system does not retrieve an item if it is writable (that is, if its read-only attribute is cleared) on the client machine. This option overrides the default behavior and overwrites a writable item, unless the item is checked out.
5. force - (Boolean) By default, when you get files, if the internal record on the server indicates the workspace already has the version you are getting, then it does not retrieve the item. This option gets the items regardless of the data contained in this internal record.
6. remap - (Boolean)
7. recursive - Recursively gets items in the specified directory and any subdirectories. If you do not specify an itemspec, then this option is implied.
8. Preview - (Boolean) Displays what would occur, without actually performing the Get operation.
9. noAutoResolve - (Boolean) By default, the system automatically attempts to **AutoResolve All** Specify this option to disable this default behavior.

## Method: Workfold

**Description**

creates, updates, or displays info about the mappings between your workspace and TFS Source Control


**Parameters**

1. TFS folder - Specifies the name of a Team Foundation version control server folder.
2. local folder - Specifies the name of a local folder.
3. collection URL - The URL of the project collection that contains the folders that you want to compare with server folders (for example, http://myserver:8080/tfs/DefaultCollection/).
4. workspace name - Specifies the name of the workspace on which the command operates for the **/workspace** option.
5. login name - Provides a value to the /login option. You can specify a username value as either DOMAIN\UserName or UserName.
6. password - (Vault) Username Password
7. noprompt - (Boolean) Use the /noprompt option to suppress requests for data input and redirect output data to the command prompt window. This option can be useful when you need to use version control commands in a script because the command proceeds without intervention by a user, and the data is available for the script to perform operations such as parsing or capturing.
