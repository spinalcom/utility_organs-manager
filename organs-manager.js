var conn, spinalCore, path, fs, vm;

spinalCore = require('spinalcore');
path = require('path');
fs = require('fs');
vm = require('vm');

require('./RunProcess');
require('./StopProcess');
require('./ClassExportProcess');

vm.runInThisContext(fs.readFileSync(path.join(__dirname, './config.js')));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, './js-libraries/lib_is-sim/models.js')));

for ( var i = 0; i < MODELS.length; i++ ) {
    var m = MODELS[i];
    try {
        vm.runInThisContext(fs.readFileSync(path.join(__dirname, './js-libraries/' + m + '/models.js')));
    } catch (e) {
        continue;
    }
}


conn = spinalCore.connect("http://" + CONNECTION.user + ":" + CONNECTION.password + "@" + CONNECTION.host + ":" + CONNECTION.port);

spinalCore.load_type(conn, 'TreeItem_Parametric', function(item) { var classExportProcess = new ClassExportProcess(item) });


for ( var i = 0; i < COMPUTABLES.length; i++ ) {
    try {
        var type = COMPUTABLES[i][0]; exe = COMPUTABLES[i][1];
        load_type( type, exe );
    } catch (e) {
        continue;
    }    
}

function load_type( type, exe ) {
    spinalCore.load_type(conn, type, function(item) { launch_processes(item, exe) });
};

function launch_processes(item, exe) {
    console.log(item._name.get() + " item loaded!");
    var runProcess = new RunProcess(item, exe);
    var stopProcess = new StopProcess(item, exe);
};

