// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";
import $ from "jquery";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"
import socket from "./socket";
import game_init from "./starter-game";

({
	gameReady: false,
	selfPlayerReady: false,
	yourTurn: false,
	ship1: null,
	ship2: null,
})

$(() => {
  $('#start-button').click(function() {
    location.href = '/game/' + $('#game-name').val() + '/' + $('#user-name').val();
  });

  let root = $('#root')[0];
  if(root) {
    socket.connect()
    let channel = socket.channel("game:" + window.gameName, {});
    game_init(root, channel);
  }
});


