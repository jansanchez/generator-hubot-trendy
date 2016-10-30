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
      this.log('constructor called');
      this.option('compact');

      this.compact = this.options.compact || false;
      this.log('compact: ' + this.compact);

      this.config.set('compact', this.compact);
      this.config.set('destinationPath', this.destinationRoot());
      this.config.set('templatePath', this.sourceRoot());
      // this.argument('appname', { type: String, required: true });
      this.botName = 'MyBot';
    }
    prompting() {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'Your bot name',
            default : this.botName
        }, {
            type    : 'confirm',
            name    : 'cool',
            message : 'Would you like to enable the Cool feature?',
            store   : true
        }]).then(answers => {
            this.log('app name: ', answers.name);
            this.log('cool feature: ', answers.cool);
            this.botName = answers.name;
        });
    }
    writing() {
        this.fs.copyTpl(this.templatePath('.*'), this.destinationPath('build/'),
            {
                buildPath: 'build/'
            }
        );
        this.fs.copyTpl(this.templatePath('./bin/hubot'), this.destinationPath('./build/bin/hubot'), this);
        this.fs.copyTpl(this.templatePath('./bin/hubot.cmd'), this.destinationPath('./build/bin/hubot.cmd'), this);
    }
    method1() {
        this.log('method1 ran');
        this.helper();
    }
    method2() {
        this.log('method2 ran');
    }
}

module.exports = Generator;
