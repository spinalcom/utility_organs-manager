
var spawn = require('child_process').spawn;
function shspawn(command) {
   return spawn('sh', ['-c', command], { stdio: 'inherit' });
}

function RunProcess(model, exe) {
    RunProcess.super(this, model);
    
    this.onchange = function() {
        if (model._computation_state.has_been_modified() && model._computation_state.get() == true)
            this.runOrgan(model);
    }
    
    this.runOrgan = function(item) {
        var cmd = exe + ' ' + item._server_id;
        if ( cmd != null ){
            console.log('');
            var child = shspawn(cmd);
            child.on('close', 
                function() { 
                    item._computation_state.set(false); 
                });
            console.log('');
        }
    }
    
}

spinalCore.extend(RunProcess, Process);