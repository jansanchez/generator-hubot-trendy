'use strict';

const Yeoman = require('yeoman-generator');

module.exports = class Hubot extends Yeoman.Base {
  method1() {
    console.log('method 1 just ran');
  }
  method2() {
    console.log('method 2 just ran');
  }
};
