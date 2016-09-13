
var exec = require('child_process').exec, child;

function RunProcess(model, exe) {
    RunProcess.super(this, model);
    
    this.onchange = function() {
        if (model._computation_state.has_been_modified() && model._computation_state.get() == true)
            this.runOrgan(model);
    }
    
    this.runOrgan = function(item) {
        var cmd = exe + ' ' + item._server_id;
        if ( cmd != null ){
            child = exec(cmd,
                function (error, stdout, stderr) {
                    console.log(stdout);
                    console.log(stderr);
                    item._computation_state.set(false);
                });
        }
    }
    
}

spinalCore.extend(RunProcess, Process);