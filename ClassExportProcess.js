
var fs, exec, child;

fs = require('fs');
exec = require('child_process').exec;

function ClassExportProcess(model) {
    ClassExportProcess.super(this, model);
    
    this.onchange = function() {
        if (model.has_been_modified())
            this.findParametrics(model);
    }

    this.findParametrics = function(item) {
        if ( item instanceof TreeItem_Parametric && item._class_export_state.has_been_modified() && item._class_export_state.get() == true)
            this.exportOrgan(item);
        for ( var i = 0; i < item._children.length; i++ )
            this.findParametrics(item._children[i]);
    }
    
    this.exportOrgan = function(item) {
        console.log("----EXPORT CLASS----");
        item._class_export_state.set(false);
        if ( item._class_export_language.get() == "JavaScript" ) {
            fs.appendFileSync("../models-manager/models/gen.js", "", "UTF-8");
            var content = fs.readFileSync("../models-manager/models/gen.js", "UTF-8");
            if ( content.indexOf("function " + item._class_export_name + "()") == -1 ) fs.appendFileSync("../models-manager/models/gen.js", this.fileTextJS(item), "UTF-8");
        }
        else if ( item._class_export_language.get() == "CoffeeScript" ) {
            fs.appendFileSync("../models-manager/models/gen.coffee", "", "UTF-8");
            var content = fs.readFileSync("../models-manager/models/gen.coffee", "UTF-8");
            if ( content.indexOf("class " + item._class_export_name + " extends") == -1 ) fs.appendFileSync("../models-manager/models/gen.coffee", this.fileTextCoffee(item), "UTF-8");
        }
    }
    
    this.fileTextJS = function( item ) {
        var name = item._class_export_name.get();
        var text = "\nfunction " + name + "() {\n    " + name + ".super(this);\n\n";
        if ( item._gen_attr != undefined ){
            text += "    this.add_attr({\n";
            for ( var i = 0; i < item._gen_attr.length; i++ ) text += "        "+ item._gen_attr[i][0] + ": new " + item._gen_attr[i][1] + ",\n";
            text += "    });\n";
        }
        text += "}\n\nspinalCore.extend(" + name + ", " + item._name_class.get() + ");\n";
        return text;
    }
    
    this.fileTextCoffee = function( item ) {
        var name = item._class_export_name.get();
        var text = "\nclass " + name + " extends " + item._name_class.get() + "\n    constructor: ( ) ->\n        super()\n\n";
        if ( item._gen_attr != undefined ){
            text += "        @add_attr\n";
            for ( var i = 0; i < item._gen_attr.length; i++ ) text += "            "+ item._gen_attr[i][0] + ": new " + item._gen_attr[i][1] + "\n";
        }
        text += "\n";
        return text;        
    }

    
}

spinalCore.extend(ClassExportProcess, Process);