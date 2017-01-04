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

      this.defaults.botName = 'MyBot';
      this.defaults.integrations = ['Slack', 'Messenger', 'WhatsApp', 'Other'];

      this.buildPath = this.defaults.botName;
    }

    prompting() {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'Your bot name',
            default : this.defaults.botName
        }, {
            type    : 'list',
            name    : 'integration',
            message : 'Would you like to integrate it with ...',
            choices: this.defaults.integrations,
            default : 0
        }]).then(answers => {
            this.botName = answers.name;
            this.integration = answers.integration;

            this.buildPath = this.botName;
        });
    }

    configuring() {
        switch (this.integration) {
            case this.defaults.integrations[0]: // Slack
                this.copyFromTemplate(`./Procfile`, `${this.buildPath}/Procfile`);
            break;
            case this.defaults.integrations[1]: // Messenger
            case this.defaults.integrations[2]: // WhatsApp
                this.log(`We have no integrations with ${this.integration} at the moment`);
            break;
            default:
        }
    }

    writing() {
        this.copyFromTemplate(`.*`, `${this.buildPath}/`, {buildPath: this.buildPath});
        this.copyFromTemplate(`./readme.md`, `${this.buildPath}/readme.md`);
        this.copyFromTemplate(`./package.json`, `${this.buildPath}/package.json`);
        this.copyFromTemplate(`./bin/hubot`, `${this.buildPath}/bin/hubot`);
        this.copyFromTemplate(`./bin/hubot.cmd`, `${this.buildPath}/bin/hubot.cmd`);
        this.copyFromTemplate(`./scripts/*.*`, `${this.buildPath}/scripts/`);
    }

    install() {
        this.spawnCommand(`chmod`, [`755`, `./${this.buildPath}/bin/hubot`]);
        this.spawnCommand(`chmod`, [`755`, `./${this.buildPath}/bin/hubot.cmd`]);
        process.chdir(`./${this.buildPath}/`);
        this.yarnInstall(['hubot', 'hubot-slack', 'hubot-diagnostics', 'hubot-help']);
    }

    customMethod() {
        // this.log('this.customMethod() ran');
    }
}

module.exports = Generator;
