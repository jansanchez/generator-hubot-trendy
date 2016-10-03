'use strict';

const Yeoman = require('yeoman-generator');

class Helper extends Yeoman.Base {
  helper() {
    console.log('helper ran');
  }
};

class Generator extends Helper {
    prompting() {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.appname
        }, {
            type    : 'confirm',
            name    : 'cool',
            message : 'Would you like to enable the Cool feature?'
        }]).then( (answers) => {
            this.log('app name: ', answers.name);
            this.log('cool feature: ', answers.cool);
        });
    }
    method1() {
        console.log('method1 ran');
        this.helper();
    }
    method2() {
        console.log('method2 ran');
    }
};

module.exports = Generator;
