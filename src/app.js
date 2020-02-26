const child_process = require("child_process")

var workspace_params = {
    workspaceName: 'ilan',
    URL: 'http://localhost:8080/tfs/DefaultCollection'
}
/*tf label labelname[@scope] [/owner:ownername] 
itemspec [/version:versionspec] [/comment:("comment"|@commentfile)] 
[/child:(replace|merge)] [/recursive] [/login:username,[password]] [/collection:TeamProjectCollectionUrl]
*/

var mapping_params = {
    serverFolder: '$ֿֿֿֿ/',
    localFolder: 'c:\\Ilan\\kaholo-plugin-tfs\\',
    workspaceName: 'EC2AMAZ-15G1HG4',
    URL: 'http://localhost:8080/tfs/DefaultCollection'
}

var label_params = {
    labelName: 'ilan_label',
    comment: '1234',
    version: '',
    scope: 'CosoleApplication1',
    URL: 'http://localhost:8080/tfs/DefaultCollection'
}

function get(action) {
    /*
    This method is based on documentation of TFS Get: https://docs.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2010/fx7sdeyf(v=vs.100)
    */
    return new Promise((resolve, reject) => {
        let flags = [];
        if (!action.params.workspacepath)
            return reject("Missing workspace location")
        if (action.params.noprompt)
            flags.push('/noprompt')
        if (action.params.versionspec)
            flags.push(`/version:${action.params.versionspec}`)
        if (action.params.all)
            flags.push(`/all`)
        if (action.params.overwrite)
            flags.push(`/overwrite`)
        if (action.params.force)
            flags.push(`/force`)
        if (action.params.remap)
            flags.push(`/remap`)
        if (action.params.recursive)
            flags.push(`/recursive`)
        if (action.params.preview)
            flags.push(`/preview`)
        if (action.params.noautoresolve)
            flags.push(`/noautoresolve`)

        let tf = `cd ${action.params.workspacepath} && tf get ${flags.join(' ')}`
        console.log('Executing: ' + tf)
        child_process.exec(tf, (error, stdout, stderr) => {
            if (error) {
                return reject(`exec error: ${error}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return reject(`exec error: ${stderr}`);
            }
            console.log(stdout)
            return resolve(stdout);
        });
    })
}

function workfold(action,settings) {
    /*
    This method is based on the TFS Workfold: https://docs.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2010/0fa04bx6(v=vs.100)
    */
    return new Promise((resolve, reject) => {
        let flags = [];
        if (!action.params.serverfolder) 
            return reject("Missing server folder path")
        if (!action.params.localfolder)
            return reject("Missing local folder path")
        
        
        if (settings.collection || action.params.collection) {
                let col = settings.collection || action.params.collection
                flags.push(`/collection:${col}`)
        }
        if (action.params.workspacename)
            flags.push(`/workspace:"${action.params.workspacename}"`)
        flags.push(`"${action.params.serverfolder}" "${action.params.localfolder}" /map`)
        if (action.params.noprompt)
            flags.push(`/noprompt`)
        if (action.params.login || settings.login) {
            let lin = action.params.login || settings.login
            var psw;
            if (action.params.password) {
                psw = `"${action.params.password}"`
            }
            else if (settings.password) {
                psw = `"${settings.password}"`
            }
            flags.push(`/login:${lin},${psw}`)
        }
        let tf = `tf workfold ${flags.join(' ')}`
        console.log("executing:" + tf)
        child_process.exec(tf, (error, stdout, stderr) => {
            if (error) {
                return reject(`exec error: ${error}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return reject(`exec error: ${stderr}`);
            }
            console.log(stdout)
            return resolve(stdout);
        });
    })
}

function createLabel(action) {
    return new Promise((resolve, reject) => {
        let flags = [];
        if (action.params.noprompt)
            flags.push('/noprompt')
        if (action.params.comment)
            flags.push(`/comment: ${action.params.comment}`)

        let tf = `tf label ${p.labelName} @${p.scope} /noprompt /comment:"${p.comment}" /collection:${p.URL}`
        console.log('Executing: ' + tf)
        child_process.exec(tf, (error, stdout, stderr) => {
            if (error) {
                return reject(`exec error: ${error}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return reject(`exec error: ${stderr}`);
            }
            console.log(stdout)
            return resolve(stdout);
        });
    })
}

function workspace(action, settings) {
    return new Promise((resolve, reject) => {
        let flags = [];
        let tf = `tf label ${p.labelName} /noprompt /recursive /collection:${p.URL}`
        console.log('Executing: ' + tf)
        child_process.exec(tf, (error, stdout, stderr) => {
            if (error) {
                return reject(`exec error: ${error}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return reject(`exec error: ${stderr}`);
            }
            console.log(stdout)
            return resolve(stdout);
        });
    })
}

//changeMapping({params : mapping_params})
//createLabel(label_params)

module.exports = {
    workspace: workspace,
    createLabel: createLabel,
    workfold: workfold,
    get: get
}



