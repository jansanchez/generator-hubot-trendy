'use strict';

const Yeoman = require('yeoman-generator');

class Helper extends Yeoman {
    copyFromTemplate(templatePath, destinationPath, data) {
      if (!data) {
          data = this;
      }
      this.fs.copyTpl(this.templatePath(templatePath), this.destinationPath(destinationPath), data);
    }
    slackInstallation() {
        this.yarnInstall(['hubot', 'hubot-slack', 'hubot-diagnostics', 'hubot-help']);
    }
}

class Generator extends Helper {
    constructor(args, options) {
      super(args, options);
      this.defaults = {};

      this.config.set('destinationPath', this.destinationRoot());
      this.config.set('templatePath', this.sourceRoot());

      this.buildPath = './build/';
      this.defaults.botName = 'MyBot';
      this.defaults.integrations = ['Slack', 'Messenger', 'WhatsApp', 'Other']
    }

    prompting() {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'Your bot name',
            default : this.defaults.botName
        },{
            type    : 'list',
            name    : 'integration',
            message : 'Would you like to integrate it with ...',
            default : 0,
            choices: this.defaults.integrations
        }]).then(answers => {
            this.botName = answers.name;
            this.integration = answers.integration;
        });
    }

    configuring() {
        switch (this.integration) {
            case this.defaults.integrations[0]: // Slack
                this.copyFromTemplate(`./Procfile`, `${this.buildPath}/Procfile`);
                this.installDependencies = this.slackInstallation;
            break;
            case this.defaults.integrations[1]: // Messenger
            case this.defaults.integrations[2]: // WhatsApp
                this.installDependencies = () => {
                    return true;
                }
                this.log(`We have no integrations with ${this.integration} at the moment`);
            break;
            default:
                this.installDependencies = () => {
                    return true;
                }
        }
    }

    writing() {
        const buildPath = this.buildPath;

        this.copyFromTemplate(`.*`, `${buildPath}/`, {buildPath: buildPath});
        this.copyFromTemplate(`./readme.md`, `${buildPath}/readme.md`);
        this.copyFromTemplate(`./package.json`, `${buildPath}/package.json`);
        this.copyFromTemplate(`./bin/hubot`, `${buildPath}/bin/hubot`);
        this.copyFromTemplate(`./bin/hubot.cmd`, `${buildPath}/bin/hubot.cmd`);
        this.copyFromTemplate(`./scripts/*.*`, `${buildPath}/scripts/`);
    }

    install() {
        this.installDependencies();
    }

    customMethod() {
        // this.log('this.customMethod() ran');
    }
}

module.exports = Generator;
