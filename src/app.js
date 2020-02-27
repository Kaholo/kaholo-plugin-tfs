const child_process = require("child_process")

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
        executeCommand(tf)
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
                let col = action.params.collection || settings.collection
                flags.push(`/collection:${col}`)
        }
        if (action.params.workspacename)
            flags.push(`/workspace:"${action.params.workspacename}"`)
        flags.push(`"${action.params.serverfolder}" "${action.params.localfolder}" /map`)
        if (action.params.noprompt)
            flags.push(`/noprompt`)
        if (action.params.login || settings.login) {
            let lin = action.params.login || settings.login
            let psw = `”${action.params.password || settings.password}”`
            psw ? flags.push(`/login:${lin},${psw}`) : flags.push(`/login:${lin}`)
        }
        let tf = `tf workfold ${flags.join(' ')}`
        console.log("executing:" + tf)
        executeCommand(tf).then(resolve).catch(reject)
    })
}

function executeCommand (cmd) {
    return new Promise((resolve, reject) => {
        console.log("executing:" + cmd)
        child_process.exec(cmd, (error, stdout, stderr) => {
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

module.exports = {
    workfold: workfold,
    get: get
}



