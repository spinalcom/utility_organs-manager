var conn, spinalCore, path, fs, vm;

spinalCore = require('spinalcore');

path = require('path');
fs = require('fs');
vm = require('vm');

vm.runInThisContext(fs.readFileSync(path.join(__dirname, './models-manager/is-sim/is-sim.models.js')));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, './models-manager/is-sim.config.js')));

for ( var i = 0; i < MODELS.length; i++ ) {
    var m = MODELS[i];
    try {
        vm.runInThisContext(fs.readFileSync(path.join(__dirname, './models-manager/models/' + m + '.js')));
    } catch (e) {
        continue;
    }
}

require('./RunProcess');
require('./StopProcess');
require('./ClassExportProcess');

conn = spinalCore.connect("http://168:JHGgcz45JKilmzknzelf65ddDftIO98P@127.0.0.1:7788");


spinalCore.load_type(conn, 'ImportAbaqusItem'           , function(item) { launch_processes(item, '../import-organ/run') });
spinalCore.load_type(conn, 'ImportDICItem'              , function(item) { launch_processes(item, '../import-organ/run') });
spinalCore.load_type(conn, 'ImportAnsysItem'            , function(item) { launch_processes(item, '../import-organ/run') });
spinalCore.load_type(conn, 'FieldCompareItem'           , function(item) { launch_processes(item, '../field-compare-organ/run') });
spinalCore.load_type(conn, 'MeshProjectionItem'         , function(item) { launch_processes(item, '../mesh-projection-organ/run') });
spinalCore.load_type(conn, 'FieldSetProjectionItem'     , function(item) { launch_processes(item, '../mesh-projection-organ/run') });
spinalCore.load_type(conn, 'ExportAbaqusItem'           , function(item) { launch_processes(item, '../export-organ/run') });
spinalCore.load_type(conn, 'ExportDICItem'              , function(item) { launch_processes(item, '../export-organ/run') });

spinalCore.load_type(conn, 'TreeItem_Parametric', function(item) { var classExportProcess = new ClassExportProcess(item) });

function launch_processes(item, exe) {
    console.log(item._name.get() + " item loaded!");
    var runProcess = new RunProcess(item, exe);
    var stopProcess = new StopProcess(item, exe);
};

