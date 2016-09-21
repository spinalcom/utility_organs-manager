# Organs Manager

## Description

A utility that can manage organs with the IS'SIM interface.
Its built-in features include: 
* Link a specific model extended from IS'SIM models (TreeItem) with a bash command.
* Run the command when a specific attribute of an item of this specific model is modified.
* Kill the process loaded by the command when a specific attribute of an item of this specific model is modified.

With these features you can run an organ executable and stop it directly in the IS'SIM Lab interface.

## Requirements

To use the Organs Manager utility, you need:
* A system based on the SpinalCore framework. See the <a href='https://github.com/spinalcom/spinal-framework' target='_blank'>spinal-framework repository</a> for more information.
* The <a href='https://github.com/spinalcom/lib_is-sim' target='_blank'>IS'SIM library</a>
* The <a href='https://github.com/spinalcom/utility_is-sim' target='_blank'>IS'SIM utility</a>


## Installation

Install the Organs Manager library in the *organs/* folder:
```
~/path/to/your-spinal-framework/organs/ git clone https://github.com/spinalcom/utility_organs-manager.git
```


## Compilation

As the Organs Manager utility is entirely in JavaScript, there is nothing to build.


## Configuration

To configure the Organs Manager utility, modify the **config.js** file in the *utility_organs-manager/* folder. Here is the default content:
```
var CONNECTION = {
    user: '168',
    password: 'JHGgcz45JKilmzknzelf65ddDadggftIO98P',
    host: '127.0.0.1',
    port: '8888'
};

var MODELS = [];

var COMPUTABLES = [
//     [ 'ClassName', 'path/to/executable' ],
];
    
```
It contains 3 variables that should always be defined (empty or not):

- **CONNECTION**: the info to connect to the SpinalHub: user ID and password, hub adress and port.
- **MODELS**: a list of **strings** of the JavaScript files of the libraries (coming from the *js-libraries* folder) you want to include in the utility. The IS'SIM library is already included, so you don't need to put it here.
- **COMPUTABLES**: a list of lists of **strings*: the name of the class you want to link to an organ and the path to the organ executable.

Here is an example of a filled config.js file:
```
var CONNECTION = {
    user: '168',
    password: 'JHGgcz45JKilmzknzelf65ddDadggftIO98P',
    host: '127.0.0.1',
    port: '7788'
};

var MODELS = [ 'custom_my-lib-1', 'custom_my-lib-2' ];

var COMPUTABLES = [
    [ 'MyComputableTreeItem', '../my-organ-1/run' ],
    [ 'AnotherComputableTreeItem', 'cd ../my-organ-2/; make run' ],
    [ 'ItemLinkedToOrgan3', '../my-organ3/run' ],
];
```


## Run

To run the Organs Manager utility, make sure your SpinalHub is running first. See the <a href='http://doc.spinalcom.com/' target='_blank'>SpinalCore documentation</a> for more information.

Run the utility:
```
~/path/to/your-spinal-framework/organs/utility_organs-manager/ make run
```

NOTE: You can run the SpinalHub and all the organs with one command:
```
~/path/to/your-spinal-framework/ make run
```
