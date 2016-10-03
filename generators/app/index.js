'use strict';

const Yeoman = require('yeoman-generator');

class Helper extends Yeoman.Base {
  helper() {
    console.log('helper ran');
  }
};

class Generator extends Helper {
    method1() {
        console.log('method1 ran');
        this.helper();
    }
    method2() {
        console.log('method2 ran');
    }
};

module.exports = Generator;
