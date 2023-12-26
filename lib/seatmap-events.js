"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("./phoenix.cjs.js"),
  Socket = _require.Socket;
var SeatmapEvents = /*#__PURE__*/_createClass(function SeatmapEvents(settings) {
  this.socketUrl = settings.socketUrl || "wss://sandbox-api.betterez.com/seatmaps/socket";
  this.idForLiveSeatmap = settings.idForLiveSeatmap || "59b945e1bc459e401b000047_79f90fc0-22b7-4fd5-a884-ed459b512019_2023-09-29";
  this.accessTicket = settings.accessTicket || "SFMyNTY.g3QAAAACZAAEZGF0YXQAAAAAZAAGc2lnbmVkbgYAHld54ooB.FbGpYFosJ1N7zS7XTq9tyeke1K3wJlaQm0A18lFu0Nc";
  this.legFrom = settings.legFrom || "0";
  this.legTo = settings.legTo || "1";
  var socket = new Socket(this.socketUrl, {
    params: {
      token: this.accessTicket
    }
  });
  socket.connect();
});
try {
  module.exports = SeatmapEvents;
} catch (e) {}