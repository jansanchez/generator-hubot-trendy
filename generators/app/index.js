'use strict';

const Yeoman = require('yeoman-generator');

class Helper extends Yeoman.Base {
  helper() {
    console.log('helper ran');
  }
}

class Generator extends Helper {
    constructor(args, options) {
      super(args, options);
      // this.argument('appname', { type: String, required: true });
    }
    prompting() {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.appname
        }, {
            type    : 'confirm',
            name    : 'cool',
            message : 'Would you like to enable the Cool feature?',
            store   : true
        }]).then(answers => {
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
}

module.exports = Generator;
