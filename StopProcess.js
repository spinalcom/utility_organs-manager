
var exec = require('child_process').exec, child;

function StopProcess(model, exe) {
    StopProcess.super(this, model);
    
    this.onchange = function() {
        if (model._computation_state.has_been_modified() && model._computation_state.get() == false)
            this.stopOrgan(model);
    }
    
    this.stopOrgan = function(item) {
        var cmd = 'killall -9 ' + exe + ' ' + item._server_id;          
        if ( cmd != null ) child = exec(cmd);
    }
    
}

spinalCore.extend(StopProcess, Process);