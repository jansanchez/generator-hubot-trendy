// Description:
//   Example scripts for you to examine and try out.

// Notes:
//   They are commented out by default, because most of them are pretty silly and
//   wouldn't be useful and amusing enough for day to day huboting.
//   Uncomment the ones you want to try and experiment with.

//   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

module.exports = function(robot) {

  robot.hear(/hello/i, (res) => {
    res.send(`Hello my friend ¿How are you?`);
  });

  robot.hear(/fine/i, (res) => {
    res.send(`That's good!`);
  });

  robot.hear(/I like pie/i, (res) => {
    res.emote(`makes a freshly baked pie`);
  });

  lulz = ['lol', 'rofl', 'lmao'];
  robot.respond(/lulz/i, (res) => {
    res.send(res.random(lulz));
  });

  robot.respond(/open the (.*) doors/i, (res) => {
    doorType = res.match[1];
    reply = `Opening ${doorType} doors`;

    if (doorType === "pod bay"){
      reply = `I'm afraid I can't let you do that.`
    }
    res.reply(reply);
  });

}
