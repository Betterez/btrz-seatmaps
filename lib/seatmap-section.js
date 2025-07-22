"use strict";

var _SeatmapSection;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// 👇️ named export

var Phoenix = function () {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = function __export(target, all) {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = function __copyProps(to, from, except, desc) {
    if (from && _typeof(from) === "object" || typeof from === "function") {
      var _iterator = _createForOfIteratorHelper(__getOwnPropNames(from)),
        _step;
      try {
        var _loop = function _loop() {
          var key = _step.value;
          if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: function get() {
              return from[key];
            },
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
          });
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return to;
  };
  var __toCommonJS = function __toCommonJS(mod) {
    return __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
  };

  // js/phoenix/index.js
  var phoenix_exports = {};
  __export(phoenix_exports, {
    Channel: function Channel() {
      return _Channel;
    },
    LongPoll: function LongPoll() {
      return _LongPoll;
    },
    Presence: function Presence() {
      return _Presence2;
    },
    Serializer: function Serializer() {
      return serializer_default;
    },
    Socket: function Socket() {
      return _Socket;
    }
  });

  // js/phoenix/utils.js
  var closure = function closure(value) {
    if (typeof value === "function") {
      return value;
    } else {
      var closure2 = function closure2() {
        return value;
      };
      return closure2;
    }
  };

  // js/phoenix/constants.js
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global = globalSelf || phxWindow || global;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = {
    connecting: 0,
    open: 1,
    closing: 2,
    closed: 3
  };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };

  // js/phoenix/push.js
  var Push = /*#__PURE__*/function () {
    function Push(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function () {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    return _createClass(Push, [{
      key: "resend",
      value: function resend(timeout) {
        this.timeout = timeout;
        this.reset();
        this.send();
      }
    }, {
      key: "send",
      value: function send() {
        if (this.hasReceived("timeout")) {
          return;
        }
        this.startTimeout();
        this.sent = true;
        this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload(),
          ref: this.ref,
          join_ref: this.channel.joinRef()
        });
      }
    }, {
      key: "receive",
      value: function receive(status, callback) {
        if (this.hasReceived(status)) {
          callback(this.receivedResp.response);
        }
        this.recHooks.push({
          status: status,
          callback: callback
        });
        return this;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.cancelRefEvent();
        this.ref = null;
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
      }
    }, {
      key: "matchReceive",
      value: function matchReceive(_ref2) {
        var status = _ref2.status,
          response = _ref2.response,
          _ref = _ref2._ref;
        this.recHooks.filter(function (h) {
          return h.status === status;
        }).forEach(function (h) {
          return h.callback(response);
        });
      }
    }, {
      key: "cancelRefEvent",
      value: function cancelRefEvent() {
        if (!this.refEvent) {
          return;
        }
        this.channel.off(this.refEvent);
      }
    }, {
      key: "cancelTimeout",
      value: function cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = null;
      }
    }, {
      key: "startTimeout",
      value: function startTimeout() {
        var _this = this;
        if (this.timeoutTimer) {
          this.cancelTimeout();
        }
        this.ref = this.channel.socket.makeRef();
        this.refEvent = this.channel.replyEventName(this.ref);
        this.channel.on(this.refEvent, function (payload) {
          _this.cancelRefEvent();
          _this.cancelTimeout();
          _this.receivedResp = payload;
          _this.matchReceive(payload);
        });
        this.timeoutTimer = setTimeout(function () {
          _this.trigger("timeout", {});
        }, this.timeout);
      }
    }, {
      key: "hasReceived",
      value: function hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
      }
    }, {
      key: "trigger",
      value: function trigger(status, response) {
        this.channel.trigger(this.refEvent, {
          status: status,
          response: response
        });
      }
    }]);
  }();

  // js/phoenix/timer.js
  var Timer = /*#__PURE__*/function () {
    function Timer(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    return _createClass(Timer, [{
      key: "reset",
      value: function reset() {
        this.tries = 0;
        clearTimeout(this.timer);
      }
    }, {
      key: "scheduleTimeout",
      value: function scheduleTimeout() {
        var _this2 = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          _this2.tries = _this2.tries + 1;
          _this2.callback();
        }, this.timerCalc(this.tries + 1));
      }
    }]);
  }();

  // js/phoenix/channel.js
  var _Channel = /*#__PURE__*/function () {
    function _Channel(topic, params, socket) {
      var _this3 = this;
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(function () {
        if (_this3.socket.isConnected()) {
          _this3.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(function () {
        return _this3.rejoinTimer.reset();
      }));
      this.stateChangeRefs.push(this.socket.onOpen(function () {
        _this3.rejoinTimer.reset();
        if (_this3.isErrored()) {
          _this3.rejoin();
        }
      }));
      this.joinPush.receive("ok", function () {
        _this3.state = CHANNEL_STATES.joined;
        _this3.rejoinTimer.reset();
        _this3.pushBuffer.forEach(function (pushEvent) {
          return pushEvent.send();
        });
        _this3.pushBuffer = [];
      });
      this.joinPush.receive("error", function () {
        _this3.state = CHANNEL_STATES.errored;
        if (_this3.socket.isConnected()) {
          _this3.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(function () {
        _this3.rejoinTimer.reset();
        if (_this3.socket.hasLogger()) _this3.socket.log("channel", "close ".concat(_this3.topic, " ").concat(_this3.joinRef()));
        _this3.state = CHANNEL_STATES.closed;
        _this3.socket.remove(_this3);
      });
      this.onError(function (reason) {
        if (_this3.socket.hasLogger()) _this3.socket.log("channel", "error ".concat(_this3.topic), reason);
        if (_this3.isJoining()) {
          _this3.joinPush.reset();
        }
        _this3.state = CHANNEL_STATES.errored;
        if (_this3.socket.isConnected()) {
          _this3.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", function () {
        if (_this3.socket.hasLogger()) _this3.socket.log("channel", "timeout ".concat(_this3.topic, " (").concat(_this3.joinRef(), ")"), _this3.joinPush.timeout);
        var leavePush = new Push(_this3, CHANNEL_EVENTS.leave, closure({}), _this3.timeout);
        leavePush.send();
        _this3.state = CHANNEL_STATES.errored;
        _this3.joinPush.reset();
        if (_this3.socket.isConnected()) {
          _this3.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, function (payload, ref) {
        _this3.trigger(_this3.replyEventName(ref), payload);
      });
    }
    return _createClass(_Channel, [{
      key: "join",
      value: function join() {
        var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeout;
        if (this.joinedOnce) {
          throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
        } else {
          this.timeout = timeout;
          this.joinedOnce = true;
          this.rejoin();
          return this.joinPush;
        }
      }
    }, {
      key: "onClose",
      value: function onClose(callback) {
        this.on(CHANNEL_EVENTS.close, callback);
      }
    }, {
      key: "onError",
      value: function onError(callback) {
        return this.on(CHANNEL_EVENTS.error, function (reason) {
          return callback(reason);
        });
      }
    }, {
      key: "on",
      value: function on(event, callback) {
        var ref = this.bindingRef++;
        this.bindings.push({
          event: event,
          ref: ref,
          callback: callback
        });
        return ref;
      }
    }, {
      key: "off",
      value: function off(event, ref) {
        this.bindings = this.bindings.filter(function (bind) {
          return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
        });
      }
    }, {
      key: "canPush",
      value: function canPush() {
        return this.socket.isConnected() && this.isJoined();
      }
    }, {
      key: "push",
      value: function push(event, payload) {
        var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.timeout;
        payload = payload || {};
        if (!this.joinedOnce) {
          throw new Error("tried to push '".concat(event, "' to '").concat(this.topic, "' before joining. Use channel.join() before pushing events"));
        }
        var pushEvent = new Push(this, event, function () {
          return payload;
        }, timeout);
        if (this.canPush()) {
          pushEvent.send();
        } else {
          pushEvent.startTimeout();
          this.pushBuffer.push(pushEvent);
        }
        return pushEvent;
      }
    }, {
      key: "leave",
      value: function leave() {
        var _this4 = this;
        var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeout;
        this.rejoinTimer.reset();
        this.joinPush.cancelTimeout();
        this.state = CHANNEL_STATES.leaving;
        var onClose = function onClose() {
          if (_this4.socket.hasLogger()) _this4.socket.log("channel", "leave ".concat(_this4.topic));
          _this4.trigger(CHANNEL_EVENTS.close, "leave");
        };
        var leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
        leavePush.receive("ok", function () {
          return onClose();
        }).receive("timeout", function () {
          return onClose();
        });
        leavePush.send();
        if (!this.canPush()) {
          leavePush.trigger("ok", {});
        }
        return leavePush;
      }
    }, {
      key: "onMessage",
      value: function onMessage(_event, payload, _ref) {
        return payload;
      }
    }, {
      key: "isMember",
      value: function isMember(topic, event, payload, joinRef) {
        if (this.topic !== topic) {
          return false;
        }
        if (joinRef && joinRef !== this.joinRef()) {
          if (this.socket.hasLogger()) this.socket.log("channel", "dropping outdated message", {
            topic: topic,
            event: event,
            payload: payload,
            joinRef: joinRef
          });
          return false;
        } else {
          return true;
        }
      }
    }, {
      key: "joinRef",
      value: function joinRef() {
        return this.joinPush.ref;
      }
    }, {
      key: "rejoin",
      value: function rejoin() {
        var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeout;
        if (this.isLeaving()) {
          return;
        }
        this.socket.leaveOpenTopic(this.topic);
        this.state = CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
      }
    }, {
      key: "trigger",
      value: function trigger(event, payload, ref, joinRef) {
        var handledPayload = this.onMessage(event, payload, ref, joinRef);
        if (payload && !handledPayload) {
          throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
        }
        var eventBindings = this.bindings.filter(function (bind) {
          return bind.event === event;
        });
        for (var i = 0; i < eventBindings.length; i++) {
          var bind = eventBindings[i];
          bind.callback(handledPayload, ref, joinRef || this.joinRef());
        }
      }
    }, {
      key: "replyEventName",
      value: function replyEventName(ref) {
        return "chan_reply_".concat(ref);
      }
    }, {
      key: "isClosed",
      value: function isClosed() {
        return this.state === CHANNEL_STATES.closed;
      }
    }, {
      key: "isErrored",
      value: function isErrored() {
        return this.state === CHANNEL_STATES.errored;
      }
    }, {
      key: "isJoined",
      value: function isJoined() {
        return this.state === CHANNEL_STATES.joined;
      }
    }, {
      key: "isJoining",
      value: function isJoining() {
        return this.state === CHANNEL_STATES.joining;
      }
    }, {
      key: "isLeaving",
      value: function isLeaving() {
        return this.state === CHANNEL_STATES.leaving;
      }
    }]);
  }();

  // js/phoenix/ajax.js
  var Ajax = /*#__PURE__*/function () {
    function Ajax() {}
    return _createClass(Ajax, null, [{
      key: "request",
      value: function request(method, endPoint, accept, body, timeout, ontimeout, callback) {
        if (global.XDomainRequest) {
          var req = new global.XDomainRequest();
          return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
        } else {
          var _req = new global.XMLHttpRequest();
          return this.xhrRequest(_req, method, endPoint, accept, body, timeout, ontimeout, callback);
        }
      }
    }, {
      key: "xdomainRequest",
      value: function xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
        var _this5 = this;
        req.timeout = timeout;
        req.open(method, endPoint);
        req.onload = function () {
          var response = _this5.parseJSON(req.responseText);
          callback && callback(response);
        };
        if (ontimeout) {
          req.ontimeout = ontimeout;
        }
        req.onprogress = function () {};
        req.send(body);
        return req;
      }
    }, {
      key: "xhrRequest",
      value: function xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
        var _this6 = this;
        req.open(method, endPoint, true);
        req.timeout = timeout;
        req.setRequestHeader("Content-Type", accept);
        req.onerror = function () {
          return callback && callback(null);
        };
        req.onreadystatechange = function () {
          if (req.readyState === XHR_STATES.complete && callback) {
            var response = _this6.parseJSON(req.responseText);
            callback(response);
          }
        };
        if (ontimeout) {
          req.ontimeout = ontimeout;
        }
        req.send(body);
        return req;
      }
    }, {
      key: "parseJSON",
      value: function parseJSON(resp) {
        if (!resp || resp === "") {
          return null;
        }
        try {
          return JSON.parse(resp);
        } catch (e) {
          console && console.log("failed to parse JSON response", resp);
          return null;
        }
      }
    }, {
      key: "serialize",
      value: function serialize(obj, parentKey) {
        var queryStr = [];
        for (var key in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            continue;
          }
          var paramKey = parentKey ? "".concat(parentKey, "[").concat(key, "]") : key;
          var paramVal = obj[key];
          if (_typeof(paramVal) === "object") {
            queryStr.push(this.serialize(paramVal, paramKey));
          } else {
            queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
          }
        }
        return queryStr.join("&");
      }
    }, {
      key: "appendParams",
      value: function appendParams(url, params) {
        if (Object.keys(params).length === 0) {
          return url;
        }
        var prefix = url.match(/\?/) ? "&" : "?";
        return "".concat(url).concat(prefix).concat(this.serialize(params));
      }
    }]);
  }();

  // js/phoenix/longpoll.js
  var arrayBufferToBase64 = function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  var _LongPoll = /*#__PURE__*/function () {
    function _LongPoll(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */new Set();
      this.awaitingBatchAck = false;
      this.currentBatch = null;
      this.currentBatchTimer = null;
      this.batchBuffer = [];
      this.onopen = function () {};
      this.onerror = function () {};
      this.onmessage = function () {};
      this.onclose = function () {};
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    return _createClass(_LongPoll, [{
      key: "normalizeEndpoint",
      value: function normalizeEndpoint(endPoint) {
        return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
      }
    }, {
      key: "endpointURL",
      value: function endpointURL() {
        return Ajax.appendParams(this.pollEndpoint, {
          token: this.token
        });
      }
    }, {
      key: "closeAndRetry",
      value: function closeAndRetry(code, reason, wasClean) {
        this.close(code, reason, wasClean);
        this.readyState = SOCKET_STATES.connecting;
      }
    }, {
      key: "ontimeout",
      value: function ontimeout() {
        this.onerror("timeout");
        this.closeAndRetry(1005, "timeout", false);
      }
    }, {
      key: "isActive",
      value: function isActive() {
        return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
      }
    }, {
      key: "poll",
      value: function poll() {
        var _this7 = this;
        this.ajax("GET", "application/json", null, function () {
          return _this7.ontimeout();
        }, function (resp) {
          if (resp) {
            var status = resp.status,
              token = resp.token,
              messages = resp.messages;
            _this7.token = token;
          } else {
            status = 0;
          }
          switch (status) {
            case 200:
              messages.forEach(function (msg) {
                setTimeout(function () {
                  return _this7.onmessage({
                    data: msg
                  });
                }, 0);
              });
              _this7.poll();
              break;
            case 204:
              _this7.poll();
              break;
            case 410:
              _this7.readyState = SOCKET_STATES.open;
              _this7.onopen({});
              _this7.poll();
              break;
            case 403:
              _this7.onerror(403);
              _this7.close(1008, "forbidden", false);
              break;
            case 0:
            case 500:
              _this7.onerror(500);
              _this7.closeAndRetry(1011, "internal server error", 500);
              break;
            default:
              throw new Error("unhandled poll status ".concat(status));
          }
        });
      }
    }, {
      key: "send",
      value: function send(body) {
        var _this8 = this;
        if (typeof body !== "string") {
          body = arrayBufferToBase64(body);
        }
        if (this.currentBatch) {
          this.currentBatch.push(body);
        } else if (this.awaitingBatchAck) {
          this.batchBuffer.push(body);
        } else {
          this.currentBatch = [body];
          this.currentBatchTimer = setTimeout(function () {
            _this8.batchSend(_this8.currentBatch);
            _this8.currentBatch = null;
          }, 0);
        }
      }
    }, {
      key: "batchSend",
      value: function batchSend(messages) {
        var _this9 = this;
        this.awaitingBatchAck = true;
        this.ajax("POST", "application/x-ndjson", messages.join("\n"), function () {
          return _this9.onerror("timeout");
        }, function (resp) {
          _this9.awaitingBatchAck = false;
          if (!resp || resp.status !== 200) {
            _this9.onerror(resp && resp.status);
            _this9.closeAndRetry(1011, "internal server error", false);
          } else if (_this9.batchBuffer.length > 0) {
            _this9.batchSend(_this9.batchBuffer);
            _this9.batchBuffer = [];
          }
        });
      }
    }, {
      key: "close",
      value: function close(code, reason, wasClean) {
        var _iterator2 = _createForOfIteratorHelper(this.reqs),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var req = _step2.value;
            req.abort();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        this.readyState = SOCKET_STATES.closed;
        var opts = Object.assign({
          code: 1e3,
          reason: void 0,
          wasClean: true
        }, {
          code: code,
          reason: reason,
          wasClean: wasClean
        });
        this.batchBuffer = [];
        clearTimeout(this.currentBatchTimer);
        this.currentBatchTimer = null;
        if (typeof CloseEvent !== "undefined") {
          this.onclose(new CloseEvent("close", opts));
        } else {
          this.onclose(opts);
        }
      }
    }, {
      key: "ajax",
      value: function ajax(method, contentType, body, onCallerTimeout, callback) {
        var _this10 = this;
        var req;
        var ontimeout = function ontimeout() {
          _this10.reqs["delete"](req);
          onCallerTimeout();
        };
        req = Ajax.request(method, this.endpointURL(), contentType, body, this.timeout, ontimeout, function (resp) {
          _this10.reqs["delete"](req);
          if (_this10.isActive()) {
            callback(resp);
          }
        });
        this.reqs.add(req);
      }
    }]);
  }();

  // js/phoenix/presence.js
  var _Presence2 = /*#__PURE__*/function () {
    function _Presence(channel) {
      var _this11 = this;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var events = opts.events || {
        state: "presence_state",
        diff: "presence_diff"
      };
      this.state = {};
      this.pendingDiffs = [];
      this.channel = channel;
      this.joinRef = null;
      this.caller = {
        onJoin: function onJoin() {},
        onLeave: function onLeave() {},
        onSync: function onSync() {}
      };
      this.channel.on(events.state, function (newState) {
        var _this11$caller = _this11.caller,
          onJoin = _this11$caller.onJoin,
          onLeave = _this11$caller.onLeave,
          onSync = _this11$caller.onSync;
        _this11.joinRef = _this11.channel.joinRef();
        _this11.state = _Presence2.syncState(_this11.state, newState, onJoin, onLeave);
        _this11.pendingDiffs.forEach(function (diff) {
          _this11.state = _Presence2.syncDiff(_this11.state, diff, onJoin, onLeave);
        });
        _this11.pendingDiffs = [];
        onSync();
      });
      this.channel.on(events.diff, function (diff) {
        var _this11$caller2 = _this11.caller,
          onJoin = _this11$caller2.onJoin,
          onLeave = _this11$caller2.onLeave,
          onSync = _this11$caller2.onSync;
        if (_this11.inPendingSyncState()) {
          _this11.pendingDiffs.push(diff);
        } else {
          _this11.state = _Presence2.syncDiff(_this11.state, diff, onJoin, onLeave);
          onSync();
        }
      });
    }
    return _createClass(_Presence, [{
      key: "onJoin",
      value: function onJoin(callback) {
        this.caller.onJoin = callback;
      }
    }, {
      key: "onLeave",
      value: function onLeave(callback) {
        this.caller.onLeave = callback;
      }
    }, {
      key: "onSync",
      value: function onSync(callback) {
        this.caller.onSync = callback;
      }
    }, {
      key: "list",
      value: function list(by) {
        return _Presence2.list(this.state, by);
      }
    }, {
      key: "inPendingSyncState",
      value: function inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel.joinRef();
      }
    }], [{
      key: "syncState",
      value: function syncState(currentState, newState, onJoin, onLeave) {
        var _this12 = this;
        var state = this.clone(currentState);
        var joins = {};
        var leaves = {};
        this.map(state, function (key, presence) {
          if (!newState[key]) {
            leaves[key] = presence;
          }
        });
        this.map(newState, function (key, newPresence) {
          var currentPresence = state[key];
          if (currentPresence) {
            var newRefs = newPresence.metas.map(function (m) {
              return m.phx_ref;
            });
            var curRefs = currentPresence.metas.map(function (m) {
              return m.phx_ref;
            });
            var joinedMetas = newPresence.metas.filter(function (m) {
              return curRefs.indexOf(m.phx_ref) < 0;
            });
            var leftMetas = currentPresence.metas.filter(function (m) {
              return newRefs.indexOf(m.phx_ref) < 0;
            });
            if (joinedMetas.length > 0) {
              joins[key] = newPresence;
              joins[key].metas = joinedMetas;
            }
            if (leftMetas.length > 0) {
              leaves[key] = _this12.clone(currentPresence);
              leaves[key].metas = leftMetas;
            }
          } else {
            joins[key] = newPresence;
          }
        });
        return this.syncDiff(state, {
          joins: joins,
          leaves: leaves
        }, onJoin, onLeave);
      }
    }, {
      key: "syncDiff",
      value: function syncDiff(state, diff, onJoin, onLeave) {
        var _this13 = this;
        var _this$clone = this.clone(diff),
          joins = _this$clone.joins,
          leaves = _this$clone.leaves;
        if (!onJoin) {
          onJoin = function onJoin() {};
        }
        if (!onLeave) {
          onLeave = function onLeave() {};
        }
        this.map(joins, function (key, newPresence) {
          var currentPresence = state[key];
          state[key] = _this13.clone(newPresence);
          if (currentPresence) {
            var _state$key$metas;
            var joinedRefs = state[key].metas.map(function (m) {
              return m.phx_ref;
            });
            var curMetas = currentPresence.metas.filter(function (m) {
              return joinedRefs.indexOf(m.phx_ref) < 0;
            });
            (_state$key$metas = state[key].metas).unshift.apply(_state$key$metas, _toConsumableArray(curMetas));
          }
          onJoin(key, currentPresence, newPresence);
        });
        this.map(leaves, function (key, leftPresence) {
          var currentPresence = state[key];
          if (!currentPresence) {
            return;
          }
          var refsToRemove = leftPresence.metas.map(function (m) {
            return m.phx_ref;
          });
          currentPresence.metas = currentPresence.metas.filter(function (p) {
            return refsToRemove.indexOf(p.phx_ref) < 0;
          });
          onLeave(key, currentPresence, leftPresence);
          if (currentPresence.metas.length === 0) {
            delete state[key];
          }
        });
        return state;
      }
    }, {
      key: "list",
      value: function list(presences, chooser) {
        if (!chooser) {
          chooser = function chooser(key, pres) {
            return pres;
          };
        }
        return this.map(presences, function (key, presence) {
          return chooser(key, presence);
        });
      }
    }, {
      key: "map",
      value: function map(obj, func) {
        return Object.getOwnPropertyNames(obj).map(function (key) {
          return func(key, obj[key]);
        });
      }
    }, {
      key: "clone",
      value: function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
      }
    }]);
  }();

  // js/phoenix/serializer.js
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: {
      push: 0,
      reply: 1,
      broadcast: 2
    },
    encode: function encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        var payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode: function decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        var _JSON$parse = JSON.parse(rawPayload),
          _JSON$parse2 = _slicedToArray(_JSON$parse, 5),
          join_ref = _JSON$parse2[0],
          ref = _JSON$parse2[1],
          topic = _JSON$parse2[2],
          event = _JSON$parse2[3],
          payload = _JSON$parse2[4];
        return callback({
          join_ref: join_ref,
          ref: ref,
          topic: topic,
          event: event,
          payload: payload
        });
      }
    },
    binaryEncode: function binaryEncode(message) {
      var join_ref = message.join_ref,
        ref = message.ref,
        event = message.event,
        topic = message.topic,
        payload = message.payload;
      var metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      var header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      var view = new DataView(header);
      var offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, function (_char) {
        return view.setUint8(offset++, _char.charCodeAt(0));
      });
      Array.from(ref, function (_char2) {
        return view.setUint8(offset++, _char2.charCodeAt(0));
      });
      Array.from(topic, function (_char3) {
        return view.setUint8(offset++, _char3.charCodeAt(0));
      });
      Array.from(event, function (_char4) {
        return view.setUint8(offset++, _char4.charCodeAt(0));
      });
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode: function binaryDecode(buffer) {
      var view = new DataView(buffer);
      var kind = view.getUint8(0);
      var decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush: function decodePush(buffer, view, decoder) {
      var joinRefSize = view.getUint8(1);
      var topicSize = view.getUint8(2);
      var eventSize = view.getUint8(3);
      var offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      var joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      var topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      var event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      var data = buffer.slice(offset, buffer.byteLength);
      return {
        join_ref: joinRef,
        ref: null,
        topic: topic,
        event: event,
        payload: data
      };
    },
    decodeReply: function decodeReply(buffer, view, decoder) {
      var joinRefSize = view.getUint8(1);
      var refSize = view.getUint8(2);
      var topicSize = view.getUint8(3);
      var eventSize = view.getUint8(4);
      var offset = this.HEADER_LENGTH + this.META_LENGTH;
      var joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      var ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      var topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      var event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      var data = buffer.slice(offset, buffer.byteLength);
      var payload = {
        status: event,
        response: data
      };
      return {
        join_ref: joinRef,
        ref: ref,
        topic: topic,
        event: CHANNEL_EVENTS.reply,
        payload: payload
      };
    },
    decodeBroadcast: function decodeBroadcast(buffer, view, decoder) {
      var topicSize = view.getUint8(1);
      var eventSize = view.getUint8(2);
      var offset = this.HEADER_LENGTH + 2;
      var topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      var event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      var data = buffer.slice(offset, buffer.byteLength);
      return {
        join_ref: null,
        ref: null,
        topic: topic,
        event: event,
        payload: data
      };
    }
  };

  // js/phoenix/socket.js
  var _Socket = /*#__PURE__*/function () {
    function _Socket(endPoint) {
      var _this14 = this;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.stateChangeCallbacks = {
        open: [],
        close: [],
        error: [],
        message: []
      };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global.WebSocket || _LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== _LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      var awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", function (_e) {
          if (_this14.conn) {
            _this14.disconnect();
            awaitingConnectionOnPageShow = _this14.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", function (_e) {
          if (awaitingConnectionOnPageShow === _this14.connectClock) {
            awaitingConnectionOnPageShow = null;
            _this14.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = function (tries) {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = function (tries) {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = "".concat(endPoint, "/").concat(TRANSPORTS.websocket);
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(function () {
        _this14.teardown(function () {
          return _this14.connect();
        });
      }, this.reconnectAfterMs);
    }
    return _createClass(_Socket, [{
      key: "getLongPollTransport",
      value: function getLongPollTransport() {
        return _LongPoll;
      }
    }, {
      key: "replaceTransport",
      value: function replaceTransport(newTransport) {
        this.connectClock++;
        this.closeWasClean = true;
        this.reconnectTimer.reset();
        this.sendBuffer = [];
        if (this.conn) {
          this.conn.close();
          this.conn = null;
        }
        this.transport = newTransport;
      }
    }, {
      key: "protocol",
      value: function protocol() {
        return location.protocol.match(/^https/) ? "wss" : "ws";
      }
    }, {
      key: "endPointURL",
      value: function endPointURL() {
        var uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), {
          vsn: this.vsn
        });
        if (uri.charAt(0) !== "/") {
          return uri;
        }
        if (uri.charAt(1) === "/") {
          return "".concat(this.protocol(), ":").concat(uri);
        }
        return "".concat(this.protocol(), "://").concat(location.host).concat(uri);
      }
    }, {
      key: "disconnect",
      value: function disconnect(callback, code, reason) {
        this.connectClock++;
        this.closeWasClean = true;
        this.reconnectTimer.reset();
        this.teardown(callback, code, reason);
      }
    }, {
      key: "connect",
      value: function connect(params) {
        var _this15 = this;
        if (params) {
          console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
          this.params = closure(params);
        }
        if (this.conn) {
          return;
        }
        this.connectClock++;
        this.closeWasClean = false;
        this.conn = new this.transport(this.endPointURL());
        this.conn.binaryType = this.binaryType;
        this.conn.timeout = this.longpollerTimeout;
        this.conn.onopen = function () {
          return _this15.onConnOpen();
        };
        this.conn.onerror = function (error) {
          return _this15.onConnError(error);
        };
        this.conn.onmessage = function (event) {
          return _this15.onConnMessage(event);
        };
        this.conn.onclose = function (event) {
          return _this15.onConnClose(event);
        };
      }
    }, {
      key: "log",
      value: function log(kind, msg, data) {
        this.logger(kind, msg, data);
      }
    }, {
      key: "hasLogger",
      value: function hasLogger() {
        return this.logger !== null;
      }
    }, {
      key: "onOpen",
      value: function onOpen(callback) {
        var ref = this.makeRef();
        this.stateChangeCallbacks.open.push([ref, callback]);
        return ref;
      }
    }, {
      key: "onClose",
      value: function onClose(callback) {
        var ref = this.makeRef();
        this.stateChangeCallbacks.close.push([ref, callback]);
        return ref;
      }
    }, {
      key: "onError",
      value: function onError(callback) {
        var ref = this.makeRef();
        this.stateChangeCallbacks.error.push([ref, callback]);
        return ref;
      }
    }, {
      key: "onMessage",
      value: function onMessage(callback) {
        var ref = this.makeRef();
        this.stateChangeCallbacks.message.push([ref, callback]);
        return ref;
      }
    }, {
      key: "ping",
      value: function ping(callback) {
        var _this16 = this;
        if (!this.isConnected()) {
          return false;
        }
        var ref = this.makeRef();
        var startTime = Date.now();
        this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: ref
        });
        var onMsgRef = this.onMessage(function (msg) {
          if (msg.ref === ref) {
            _this16.off([onMsgRef]);
            callback(Date.now() - startTime);
          }
        });
        return true;
      }
    }, {
      key: "clearHeartbeats",
      value: function clearHeartbeats() {
        clearTimeout(this.heartbeatTimer);
        clearTimeout(this.heartbeatTimeoutTimer);
      }
    }, {
      key: "onConnOpen",
      value: function onConnOpen() {
        if (this.hasLogger()) this.log("transport", "connected to ".concat(this.endPointURL()));
        this.closeWasClean = false;
        this.establishedConnections++;
        this.flushSendBuffer();
        this.reconnectTimer.reset();
        this.resetHeartbeat();
        this.stateChangeCallbacks.open.forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            callback = _ref4[1];
          return callback();
        });
      }
    }, {
      key: "heartbeatTimeout",
      value: function heartbeatTimeout() {
        var _this17 = this;
        if (this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null;
          if (this.hasLogger()) {
            this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
          }
          this.triggerChanError();
          this.closeWasClean = false;
          this.teardown(function () {
            return _this17.reconnectTimer.scheduleTimeout();
          }, WS_CLOSE_NORMAL, "heartbeat timeout");
        }
      }
    }, {
      key: "resetHeartbeat",
      value: function resetHeartbeat() {
        var _this18 = this;
        if (this.conn && this.conn.skipHeartbeat) {
          return;
        }
        this.pendingHeartbeatRef = null;
        this.clearHeartbeats();
        this.heartbeatTimer = setTimeout(function () {
          return _this18.sendHeartbeat();
        }, this.heartbeatIntervalMs);
      }
    }, {
      key: "teardown",
      value: function teardown(callback, code, reason) {
        var _this19 = this;
        if (!this.conn) {
          return callback && callback();
        }
        this.waitForBufferDone(function () {
          if (_this19.conn) {
            if (code) {
              _this19.conn.close(code, reason || "");
            } else {
              _this19.conn.close();
            }
          }
          _this19.waitForSocketClosed(function () {
            if (_this19.conn) {
              _this19.conn.onopen = function () {};
              _this19.conn.onerror = function () {};
              _this19.conn.onmessage = function () {};
              _this19.conn.onclose = function () {};
              _this19.conn = null;
            }
            callback && callback();
          });
        });
      }
    }, {
      key: "waitForBufferDone",
      value: function waitForBufferDone(callback) {
        var _this20 = this;
        var tries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
          callback();
          return;
        }
        setTimeout(function () {
          _this20.waitForBufferDone(callback, tries + 1);
        }, 150 * tries);
      }
    }, {
      key: "waitForSocketClosed",
      value: function waitForSocketClosed(callback) {
        var _this21 = this;
        var tries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
          callback();
          return;
        }
        setTimeout(function () {
          _this21.waitForSocketClosed(callback, tries + 1);
        }, 150 * tries);
      }
    }, {
      key: "onConnClose",
      value: function onConnClose(event) {
        var closeCode = event && event.code;
        if (this.hasLogger()) this.log("transport", "close", event);
        this.triggerChanError();
        this.clearHeartbeats();
        if (!this.closeWasClean && closeCode !== 1e3) {
          this.reconnectTimer.scheduleTimeout();
        }
        this.stateChangeCallbacks.close.forEach(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
            callback = _ref6[1];
          return callback(event);
        });
      }
    }, {
      key: "onConnError",
      value: function onConnError(error) {
        if (this.hasLogger()) this.log("transport", error);
        var transportBefore = this.transport;
        var establishedBefore = this.establishedConnections;
        this.stateChangeCallbacks.error.forEach(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
            callback = _ref8[1];
          callback(error, transportBefore, establishedBefore);
        });
        if (transportBefore === this.transport || establishedBefore > 0) {
          this.triggerChanError();
        }
      }
    }, {
      key: "triggerChanError",
      value: function triggerChanError() {
        this.channels.forEach(function (channel) {
          if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
            channel.trigger(CHANNEL_EVENTS.error);
          }
        });
      }
    }, {
      key: "connectionState",
      value: function connectionState() {
        switch (this.conn && this.conn.readyState) {
          case SOCKET_STATES.connecting:
            return "connecting";
          case SOCKET_STATES.open:
            return "open";
          case SOCKET_STATES.closing:
            return "closing";
          default:
            return "closed";
        }
      }
    }, {
      key: "isConnected",
      value: function isConnected() {
        return this.connectionState() === "open";
      }
    }, {
      key: "remove",
      value: function remove(channel) {
        this.off(channel.stateChangeRefs);
        this.channels = this.channels.filter(function (c) {
          return c.joinRef() !== channel.joinRef();
        });
      }
    }, {
      key: "off",
      value: function off(refs) {
        for (var key in this.stateChangeCallbacks) {
          this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(function (_ref9) {
            var _ref10 = _slicedToArray(_ref9, 1),
              ref = _ref10[0];
            return refs.indexOf(ref) === -1;
          });
        }
      }
    }, {
      key: "channel",
      value: function channel(topic) {
        var chanParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var chan = new _Channel(topic, chanParams, this);
        this.channels.push(chan);
        return chan;
      }
    }, {
      key: "push",
      value: function push(data) {
        var _this22 = this;
        if (this.hasLogger()) {
          var topic = data.topic,
            event = data.event,
            payload = data.payload,
            ref = data.ref,
            join_ref = data.join_ref;
          this.log("push", "".concat(topic, " ").concat(event, " (").concat(join_ref, ", ").concat(ref, ")"), payload);
        }
        if (this.isConnected()) {
          this.encode(data, function (result) {
            return _this22.conn.send(result);
          });
        } else {
          this.sendBuffer.push(function () {
            return _this22.encode(data, function (result) {
              return _this22.conn.send(result);
            });
          });
        }
      }
    }, {
      key: "makeRef",
      value: function makeRef() {
        var newRef = this.ref + 1;
        if (newRef === this.ref) {
          this.ref = 0;
        } else {
          this.ref = newRef;
        }
        return this.ref.toString();
      }
    }, {
      key: "sendHeartbeat",
      value: function sendHeartbeat() {
        var _this23 = this;
        if (this.pendingHeartbeatRef && !this.isConnected()) {
          return;
        }
        this.pendingHeartbeatRef = this.makeRef();
        this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: this.pendingHeartbeatRef
        });
        this.heartbeatTimeoutTimer = setTimeout(function () {
          return _this23.heartbeatTimeout();
        }, this.heartbeatIntervalMs);
      }
    }, {
      key: "flushSendBuffer",
      value: function flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
          this.sendBuffer.forEach(function (callback) {
            return callback();
          });
          this.sendBuffer = [];
        }
      }
    }, {
      key: "onConnMessage",
      value: function onConnMessage(rawMessage) {
        var _this24 = this;
        this.decode(rawMessage.data, function (msg) {
          var topic = msg.topic,
            event = msg.event,
            payload = msg.payload,
            ref = msg.ref,
            join_ref = msg.join_ref;
          if (ref && ref === _this24.pendingHeartbeatRef) {
            _this24.clearHeartbeats();
            _this24.pendingHeartbeatRef = null;
            _this24.heartbeatTimer = setTimeout(function () {
              return _this24.sendHeartbeat();
            }, _this24.heartbeatIntervalMs);
          }
          if (_this24.hasLogger()) _this24.log("receive", "".concat(payload.status || "", " ").concat(topic, " ").concat(event, " ").concat(ref && "(" + ref + ")" || ""), payload);
          for (var i = 0; i < _this24.channels.length; i++) {
            var channel = _this24.channels[i];
            if (!channel.isMember(topic, event, payload, join_ref)) {
              continue;
            }
            channel.trigger(event, payload, ref, join_ref);
          }
          for (var _i = 0; _i < _this24.stateChangeCallbacks.message.length; _i++) {
            var _this24$stateChangeCa = _slicedToArray(_this24.stateChangeCallbacks.message[_i], 2),
              callback = _this24$stateChangeCa[1];
            callback(msg);
          }
        });
      }
    }, {
      key: "leaveOpenTopic",
      value: function leaveOpenTopic(topic) {
        var dupChannel = this.channels.find(function (c) {
          return c.topic === topic && (c.isJoined() || c.isJoining());
        });
        if (dupChannel) {
          if (this.hasLogger()) this.log("transport", "leaving duplicate topic \"".concat(topic, "\""));
          dupChannel.leave();
        }
      }
    }]);
  }();
  return __toCommonJS(phoenix_exports);
}();
var SeatmapSocket = /*#__PURE__*/function () {
  function SeatmapSocket() {}
  return _createClass(SeatmapSocket, null, [{
    key: "listen",
    value: function listen(settings) {
      SeatmapSocket.settings = settings;
      SeatmapSocket.currentTripId = SeatmapSocket.currentTripId || settings.tripId;
      if (!SeatmapSocket.socket) {
        SeatmapSocket.socket = new Phoenix.Socket(settings.socketUrl, {
          params: {
            token: settings.accessTicket
          }
        });
        SeatmapSocket.socket.connect();
      }
      if (SeatmapSocket.currentTripId !== settings.tripId) {
        SeatmapSocket.channels.forEach(function (channel) {
          channel.leave();
        });
        SeatmapSocket.channels.clear();
        SeatmapSocket.currentTripId = settings.tripId;
      }
      if (SeatmapSocket.channels.has(settings.idForLiveSeatmap)) {
        SeatmapSocket.channel = SeatmapSocket.channels.get(settings.idForLiveSeatmap);
        // SeatmapSocket.channel.push(("sync:join", (payload) => {
        //   if (SeatmapSocket.settings.callbacks.seatmapJoin && payload.seats && payload.seats.length) {
        //     SeatmapSocket.settings.callbacks.seatmapJoin(payload.seats);
        //   }
        // }));
        return;
      } else {
        var newChannel = SeatmapSocket.socket.channel("seatmap:".concat(settings.idForLiveSeatmap), {
          leg_from: settings.legFrom,
          leg_to: settings.legTo
        });
        SeatmapSocket.channels.set(settings.idForLiveSeatmap, newChannel);
        SeatmapSocket.channel = newChannel;
      }
      SeatmapSocket.channel.join().receive("ok", function () {
        console.log("Join successfully to ".concat(SeatmapSocket.channel.topic));
        SeatmapSocket.channel.on("seat:selected", function (payload) {
          console.log("seat:selected", payload);
          var selectedSeat = payload.selected_seat.seat || payload.selected_seat.seat_id;
          if (SeatmapSocket.settings.callbacks.seatmapSeatSelected && selectedSeat) {
            SeatmapSocket.settings.callbacks.seatmapSeatSelected(selectedSeat);
          }
        });
        SeatmapSocket.channel.on("seat:unselected", function (payload) {
          console.log("seat:unselected", payload);
          var unselectedSeat = payload.unselected_seat.seat;
          if (SeatmapSocket.settings.callbacks.seatmapSeatUnSelected && unselectedSeat) {
            SeatmapSocket.settings.callbacks.seatmapSeatUnSelected(unselectedSeat);
          }
        });
        SeatmapSocket.channel.on("sync:join", function (payload) {
          console.log("sync:join", payload);
          if (SeatmapSocket.settings.callbacks.seatmapJoin && payload.seats && payload.seats.length) {
            SeatmapSocket.settings.callbacks.seatmapJoin(payload.seats);
          }
        });
        SeatmapSocket.channel.on("sync:seats", function (payload) {
          console.log("sync:seats", payload);
          SeatmapSocket.settings.callbacks.seatExpired(payload.expired.map(function (data) {
            return {
              //seat_id: `${data.seat.row}-${data.seat.col}-${data.seat.label}`,
              row: data.seat.row,
              col: data.seat.col,
              rowLabel: data.seat.rowLabel,
              label: data.seat.label,
              //height: 1,
              //width: 1,
              sectionId: data.seat.sectionId,
              scheduleId: data.seat.scheduleId
              //sectionName: data.seat.sectionName
            };
          }), {
            scheduleId: SeatmapSocket.settings.scheduleId
          });
        });
      }).receive("error", function (err) {
        console.log("Failed join: ".concat(err));
      }).receive("timeout", function (err) {
        console.log("Timed Out");
      });
    }
  }, {
    key: "pushEvent",
    value: function pushEvent(name, seat, seatId) {
      if (SeatmapSocket.channel) {
        var payload = {
          seat: {
            leg_from: SeatmapSocket.settings.legFrom,
            leg_to: SeatmapSocket.settings.legTo,
            seat: seat,
            seat_id: seatId
          },
          ttl_sec: SeatmapSocket.settings.ttlSec
        };
        SeatmapSocket.channel.push(name, payload);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      SeatmapSocket.channels.forEach(function (channel) {
        channel.leave();
      });
      SeatmapSocket.channels.clear();
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      SeatmapSocket.socket.disconnect();
    }
  }, {
    key: "connect",
    value: function connect() {
      SeatmapSocket.socket.connect();
    }
  }, {
    key: "leaveChannel",
    value: function leaveChannel(idForLiveSeatmap) {
      var channel = SeatmapSocket.channels.get(idForLiveSeatmap);
      if (channel && channel.state === "joined") {
        channel.leave().receive("ok", function () {
          SeatmapSocket.channels["delete"](idForLiveSeatmap);
        });
      }
    }
  }]);
}();
_defineProperty(SeatmapSocket, "channel", null);
_defineProperty(SeatmapSocket, "channels", new Map());
_defineProperty(SeatmapSocket, "socket", null);
_defineProperty(SeatmapSocket, "currentTripId", null);
var _SeatmapSection_brand = /*#__PURE__*/new WeakSet();
var SeatmapSection = /*#__PURE__*/function () {
  function SeatmapSection() {
    var containerId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var _section = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var isBackOffice = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    _classPrivateMethodInitSpec(this, _SeatmapSection_brand);
    this.allowKeyNavStatusList = settings.allowKeyNavStatusList || ["available"];
    this.containerId = containerId;
    this.availableRows = parseInt(_section.availableRows, 10) || 15;
    this.seatsPerRowLeft = typeof _section.seatsPerRowLeft !== "undefined" ? _section.seatsPerRowLeft : 2;
    this.seatsPerRowRight = typeof _section.seatsPerRowRight !== "undefined" ? _section.seatsPerRowRight : 2;
    this.rowsEnumNoGaps = _section.rowsEnumNoGaps;
    this.facilities = _section.facilities || [];
    this.seats = _section.seats || [];
    this.customSeats = _section.customSeats || [];
    this.enumType = _section.enumType || SeatmapSection.ENUMERATION_TYPES.Sequencial;
    this.enumDir = _section.enumDir || SeatmapSection.ENUMERATION_TYPES.Left, this.rowLabelType = _section.rowLabelType || SeatmapSection.LABEL_TYPES.Number;
    this.seatLabelType = _section.seatLabelType || SeatmapSection.LABEL_TYPES.Number;
    this.startingSeatLabel = _section.startingSeatLabel || (this.seatLabelType === SeatmapSection.LABEL_TYPES.Number ? 1 : "A"), this.startingRowLabel = _section.startingRowLabel || (this.rowLabelType === SeatmapSection.LABEL_TYPES.Number ? 1 : "A");
    this.showRowLabels = _section.showRowLabels;
    this.lastRowNoGap = _section.lastRowNoGap;
    this.sectionName = _section.name || "";
    this.showSectionName = typeof _section.showSectionName !== "undefined" ? _section.showSectionName : true;
    this.sectionId = _section._id || "";
    this.capacity = _section.capacity || 60;
    this.rowLabelRange = _section.rowLabelRange;
    this.events = settings.events || [];
    this.classes = settings.classes || SeatmapSection.CLASSES;
    this.labels = settings.labels || SeatmapSection.LABELS;
    this.seatClasses = settings.seatClasses || [];
    this.fees = settings.fees || [];
    this.isEditing = settings.isEditing || false;
    this.numPad = "";
    this.isBackOffice = isBackOffice;
    _assertClassBrand(_SeatmapSection_brand, this, _setSeatmap).call(this);
    _assertClassBrand(_SeatmapSection_brand, this, _manageSocketEvents).call(this, settings.socketEvents);
  }
  return _createClass(SeatmapSection, [{
    key: "onSeatMouseOver",
    value: function onSeatMouseOver(evt, e, elem) {
      if (this.socketEvents.callbacks.seatOver) {
        this.socketEvents.callbacks.seatOver(elem, {
          tripId: this.socketEvents.tripId,
          scheduleId: this.socketEvents.scheduleId
        });
      }
    }
  }, {
    key: "onSeatMouseOut",
    value: function onSeatMouseOut(evt, e, elem) {
      if (this.socketEvents.callbacks.seatOut) {
        this.socketEvents.callbacks.seatOut(elem, {
          tripId: this.socketEvents.tripId,
          scheduleId: this.socketEvents.scheduleId
        });
      }
    }
  }, {
    key: "getSeatId",
    value: function getSeatId(seat) {
      return "section-".concat(seat.sectionId, "-row-").concat(seat.row, "-seat-").concat(seat.col);
    }
  }, {
    key: "onSeatClicked",
    value: function onSeatClicked(evt, e, seat) {
      var notAvailableSeats = ["blocked"];
      if (!this.isBackOffice) {
        notAvailableSeats.push("reserved");
      }
      if (notAvailableSeats.includes(e.dataset.status) && (!e.dataset.selected || e.dataset.selected === "false")) {
        return;
      }
      this.socketEvents.callbacks.seatClicked(Object.assign(seat, {
        sectionName: this.sectionName,
        sectionId: this.sectionId
      }), {
        tripId: this.socketEvents.tripId,
        scheduleId: this.socketEvents.scheduleId
      });
    }
  }, {
    key: "clearFocus",
    value: function clearFocus() {
      var focus = document.querySelector("[data-focus][data-section=\"".concat(this.sectionId, "\"]"));
      if (focus) {
        delete focus.dataset.focus;
      }
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      var selection = document.querySelectorAll("#".concat(this.containerId, " .seatmap-outline-blue"));
      selection.forEach(function (prev) {
        return prev.classList.remove("seatmap-outline-blue");
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this25 = this;
      var numericDisplay = _assertClassBrand(_SeatmapSection_brand, this, _createHTMLElement).call(this, "div", "numeric-display, absolute, right-0, left-0, center, z2, bold, opacity3, color-grey-darkest");
      var container = document.getElementById(this.containerId);
      if (container) {
        container.onkeydown = function (evt) {
          _assertClassBrand(_SeatmapSection_brand, _this25, _manageKeyboardNavigation).call(_this25, evt);
        };
        container.style.setProperty("--columns", this.availableCols);
        container.style.setProperty("--rows", this.availableRows);
        container.style["background-color"] = "#F9F9F9";
        container.innerHTML = "";
        container.appendChild(numericDisplay);
        if (this.sectionName && this.showSectionName) {
          var sectionNameWrapper = _assertClassBrand(_SeatmapSection_brand, this, _createHTMLElement).call(this, "div", "absolute, bottom-0, right-0, left-0, center, mbn3, z2");
          var sectionNameContainer = _assertClassBrand(_SeatmapSection_brand, this, _createHTMLElement).call(this, "div", "bg-info, uppercase, fs6, color-info-lightest, box-shadow-black-10, border, border-info-light, inline-block, rounded-max, px2, line-height-4", this.sectionName);
          sectionNameWrapper.appendChild(sectionNameContainer);
          container.appendChild(sectionNameWrapper);
        }
        [].concat(_toConsumableArray(this.corridor), _toConsumableArray(this.facilities), _toConsumableArray(this.seats)).forEach(function (elem) {
          var classes = _assertClassBrand(_SeatmapSection_brand, _this25, _getElementClasses).call(_this25, elem);
          var e = _assertClassBrand(_SeatmapSection_brand, _this25, _createHTMLElement).call(_this25, "div", classes, elem.label || "");
          var dataset = _assertClassBrand(_SeatmapSection_brand, _this25, _getSeatDataset).call(_this25, elem);
          Object.keys(dataset).forEach(function (k) {
            e.dataset[k] = dataset[k];
          });
          if (elem.type === "seat") {
            e.title = SeatmapSection.getSeatTitle(elem, _this25.sectionName, _this25.labels, _this25.seatClasses, _this25.fees);
          }
          _assertClassBrand(_SeatmapSection_brand, _this25, _setElementStyle).call(_this25, e.style, elem);
          _this25.events.forEach(function (evt) {
            var appliesEvent = false;
            if (evt.elementType) {
              appliesEvent = appliesEvent || !evt.elementType.startsWith("!") && evt.elementType === elem.type || evt.elementType.startsWith("!") && evt.elementType.slice(1) !== elem.type;
            }
            if (evt.elementStatus) {
              appliesEvent = evt.elementType ? appliesEvent && evt.elementStatus.map(function (s) {
                return s.trim();
              }).includes(elem.status) : appliesEvent || evt.elementStatus.map(function (s) {
                return s.trim();
              }).includes(elem.status);
            }
            if (appliesEvent) {
              e.addEventListener(evt.type || "click", function (target) {
                evt.cb(target, e, elem);
              });
            }
          });
          container.appendChild(e);
        });
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      var container = document.getElementById(this.containerId);
      if (container) {
        container.focus();
      }
      for (var i = 1; i < this.seats.length + 1; i++) {
        if (_assertClassBrand(_SeatmapSection_brand, this, _setFocusOnSeat).call(this, i, "[data-section=\"".concat(this.sectionId, "\"]"))) {
          break;
        }
      }
    }
  }, {
    key: "focusElement",
    value: function focusElement(elem) {
      this.clearFocus();
      document.querySelector("[data-index='".concat(elem.index, "']")).dataset.focus = true;
    }
  }, {
    key: "focusOnNextSelected",
    value: function focusOnNextSelected(seat) {
      var seatSelected = seat ? document.querySelector("[data-keynav='true'][data-selected=true][data-index='".concat(seat.index, "']")) : document.querySelector("[data-keynav='true'][data-selected=true]") || document.querySelector("[data-keynav='true'][data-suggested=true]");
      var index = seatSelected ? seatSelected.dataset.index : 1;
      var container = document.getElementById(this.containerId);
      if (container) {
        container.focus();
      }
      for (var i = index; i < this.seats.length + 1; i++) {
        if (_assertClassBrand(_SeatmapSection_brand, this, _setFocusOnSeat).call(this, i, "[data-status='available']:not([data-selected=true])")) {
          break;
        }
      }
    }
  }, {
    key: "getCapacity",
    value: function getCapacity() {
      return (this.seats || []).filter(function (s) {
        return !s.overlapped && s.status && s.type === "seat";
      }).length;
    }
  }, {
    key: "selectElement",
    value: function selectElement(elem) {
      var selector = "[style*='grid-area: ".concat(elem.row, " / ").concat(elem.col, " / ").concat(elem.row + elem.height, " / ").concat(elem.col + elem.width, ";']");
      var element = document.querySelector(selector);
      element.classList.add("seatmap-outline-blue");
    }
  }], [{
    key: "CLASSES",
    get: function get() {
      return {
        item: "item",
        corridor: "fs7, flex, items-center, justify-around",
        wc: "wc",
        seat: "bg-white, border, border-grey, rounded, flex, justify-around, items-center, relative, opacity5-hover, pointer",
        stairwayVertical: "stairway-vertical",
        stairwayHorizontal: "stairway-horizontal",
        table: "seatmap-table",
        doorRight: "door-right",
        doorLeft: "door-left",
        driverLeft: "driver",
        driverRight: "driver, right-driver",
        gap: "seatmap-gap",
        accordionBottom: "accordion-bottom",
        accordionTop: "accordion-top"
      };
    }
  }, {
    key: "LABELS",
    get: function get() {
      return {
        section: "Section",
        row: "Row",
        seat: "Seat",
        status: "Status",
        seatClass: "Seat class",
        fee: "Fee",
        female: "Female",
        male: "Male",
        suggested: "Suggested",
        accessible: "Accessible"
      };
    }
  }, {
    key: "LABEL_TYPES",
    get: function get() {
      return {
        Number: 1,
        Letter: 2
      };
    }
  }, {
    key: "ENUMERATION_TYPES",
    get: function get() {
      return {
        Sequencial: 1,
        PerRow: 2
      };
    }
  }, {
    key: "ENUMERATION_DIRECTION",
    get: function get() {
      return {
        Left: 1,
        Right: 2
      };
    }
  }, {
    key: "FACILITY_ALIGNMENT",
    get: function get() {
      return {
        Left: 1,
        Right: 2
      };
    }
  }, {
    key: "FACILITY_ORIENTATION",
    get: function get() {
      return {
        Horizontal: 1,
        Vertical: 2
      };
    }
  }, {
    key: "FACILITY_POSITION",
    get: function get() {
      return {
        Bottom: 1,
        Top: 2
      };
    }
  }, {
    key: "changeSeatDataProp",
    value: function changeSeatDataProp(elem, prop, value) {
      var sectionSelector = elem.sectionId ? "[data-section=\"".concat(elem.sectionId, "\"]") : "";
      var containerSelector = elem.containerId ? "[data-container-id=\"".concat(elem.containerId, "\"]") : "";
      var selector = "".concat(containerSelector).concat(sectionSelector, "[style*='grid-area: ").concat(elem.row, " / ").concat(elem.col, " / ").concat(parseInt(elem.row, 10) + (elem.height || 1), " / ").concat(parseInt(elem.col, 10) + (elem.width || 1), ";']");
      var element = document.querySelector(selector);
      if (element) {
        element.dataset[prop] = value;
      }
    }
  }, {
    key: "changeSeatStatus",
    value: function changeSeatStatus(elem, status) {
      var sectionSelector = elem.sectionId ? "[data-section=\"".concat(elem.sectionId, "\"]") : "";
      var containerSelector = elem.containerId ? "[data-container-id=\"".concat(elem.containerId, "\"]") : "";
      var selector = "".concat(containerSelector).concat(sectionSelector, "[style*='grid-area: ").concat(elem.row, " / ").concat(elem.col, " / ").concat(parseInt(elem.row, 10) + (elem.height || 1), " / ").concat(parseInt(elem.col, 10) + (elem.width || 1), ";']");
      var altSelector = "".concat(sectionSelector, "[style*='grid-area: ").concat(elem.row, " / ").concat(elem.col, " / ").concat(parseInt(elem.row, 10) + (elem.height || 1), " / ").concat(parseInt(elem.col, 10) + (elem.width || 1), ";']");
      var element = document.querySelector("[data-type=\"seat\"]".concat(selector));
      if (!element) {
        element = document.querySelector("[data-type=\"seat\"]".concat(altSelector));
      }
      if (element) {
        var newStatusText = "".concat(status.charAt(0).toUpperCase()).concat(status.slice(1));
        var oldStatusText = "".concat(element.dataset.status.charAt(0).toUpperCase()).concat(element.dataset.status.slice(1));
        element.title = element.title.replace(oldStatusText, newStatusText);
        element.dataset.status = element.dataset.isReserved && status === "available" ? "reserved" : status;
        if (element.dataset.selected) {
          element.dataset.keynav = "true";
        }
        if (status === "blocked" && !element.dataset.selected) {
          element.dataset.keynav = "false";
        }
        if (status === "available" || status === "unavailable") {
          element.dataset.keynav = "false";
        }
        if (status === "unavailable" && element.dataset.accessible) {
          element.dataset.accessible = false;
        }
      }
    }
  }, {
    key: "getSeatTitle",
    value: function getSeatTitle(elem, sectionName, labels, seatClasses, fees) {
      var seat = elem.label ? "".concat(labels.seat, ": ").concat(elem.label, " \n") : "";
      var row = elem.rowLabel ? "".concat(labels.row, ": ").concat(elem.rowLabel, " \n") : "";
      var status = elem.status ? "".concat(labels.status, ": ").concat(elem.status.charAt(0).toUpperCase()).concat(elem.status.slice(1), " \n") : "";
      var section = sectionName ? "".concat(labels.section, ": ").concat(sectionName, " \n") : "";
      var seatClass = seatClasses.find(function (sc) {
        return sc._id === elem.seatClass;
      });
      var seatClassName = seatClass && seatClass.value ? "".concat(labels.seatClass, ": ").concat(seatClass.value, " \n") : "";
      var fee = fees.find(function (fee) {
        return fee._id === elem.fee;
      });
      var feeName = fee && fee.name ? "".concat(labels.fee, ": ").concat(fee.name, " (+").concat(fee.type === "$" ? "$" : "").concat(fee.value).concat(fee.type === "%" ? "%" : "", ") \n") : "";
      var isAccessible = elem.accessible ? "".concat(labels.accessible) : "";
      var gender = "";
      if (elem.status === "unavailable") {
        gender = elem.female ? "".concat(labels.female) : "".concat(labels.male);
      }
      var isSuggested = elem.suggested ? "".concat(labels.suggested) : "";
      return "".concat(section).concat(row).concat(seat).concat(status).concat(seatClassName).concat(feeName).concat(isAccessible).concat(gender).concat(isSuggested);
    }
  }]);
}();
_SeatmapSection = SeatmapSection;
function _manageSocketEvents(socketEvents) {
  try {
    if (socketEvents) {
      this.socketEvents = socketEvents;
      SeatmapSocket.listen(socketEvents);
      this.events = [{
        elementType: "seat",
        elementStatus: ["available", "reserved"],
        type: "click",
        cb: this.onSeatClicked.bind(this)
      }, {
        elementType: "seat",
        elementStatus: ["available", "reserved"],
        type: "mouseover",
        cb: this.onSeatMouseOver.bind(this)
      }, {
        elementType: "seat",
        elementStatus: ["available", "reserved"],
        type: "mouseout",
        cb: this.onSeatMouseOut.bind(this)
      }];
    }
  } catch (err) {
    console.log(err);
  }
}
function _updateFacilities() {
  var _this28 = this;
  var filteredElements = [];
  // eslint-disable-next-line no-param-reassign
  this.availableCols = this.seatsPerRowLeft + this.seatsPerRowRight + 1;
  this.facilities.forEach(function (ele) {
    if (ele.type === "driver") {
      // eslint-disable-next-line no-param-reassign
      ele.width = _this28.availableCols;
      filteredElements.push(ele);
    } else if (ele.type === "accordion") {
      ele.width = _this28.availableCols;
      ele.row = ele.position.key === _SeatmapSection.FACILITY_POSITION.Top ? 1 : _this28.availableRows;
      filteredElements.push(ele);
    } else if (ele.type === "door") {
      ele.col = ele.alignment.key === _SeatmapSection.FACILITY_ALIGNMENT.Left ? 1 : _this28.availableCols;
      filteredElements.push(ele);
    } else if (_this28.availableCols + 1 >= ele.col + ele.width) {
      filteredElements.push(ele);
    }
  });
  // eslint-disable-next-line no-param-reassign
  this.facilities = filteredElements;
}
function _buildCorridor() {
  var _this29 = this;
  var rowsWithoutLabels = [];
  // eslint-disable-next-line no-param-reassign
  this.corridor = [];
  (this.rowLabelRange || "").split(",").forEach(function (r) {
    var range = r.split(":");
    var start = parseInt(range[0], 10);
    var stop = parseInt(range[1], 10);
    var step = 1;
    rowsWithoutLabels = [].concat(_toConsumableArray(rowsWithoutLabels), _toConsumableArray(Array.from({
      length: (stop - start) / step + 1
    }, function (value, index) {
      return start + index * step;
    })));
  });
  var driver = this.facilities.find(function (elem) {
    return elem.type === "driver";
  });
  var startingRowPosition = driver ? 2 : 1;
  var rows = [];
  rows = Array.from({
    length: this.availableRows - (this.lastRowNoGap ? 1 : 0) - (driver ? 1 : 0)
  });
  var nextRowValue = this.startingRowLabel;
  rows.forEach(function (row, rIndex) {
    var showLabel = _this29.showRowLabels && (!rowsWithoutLabels.length || !rowsWithoutLabels.includes(rIndex + 1));
    _this29.corridor.push({
      row: rIndex + startingRowPosition,
      col: _this29.seatsPerRowLeft + 1,
      height: 1,
      width: 1,
      type: "corridor",
      classes: _this29.classes.corridor,
      label: showLabel ? nextRowValue : undefined,
      alternativeLabel: _this29.rowLabelType === _SeatmapSection.LABEL_TYPES.Number ? rIndex + 1 : String.fromCharCode(96 + rIndex + 1).toUpperCase()
    });
    if (showLabel || !_this29.rowsEnumNoGaps) {
      nextRowValue = _this29.rowLabelType === _SeatmapSection.LABEL_TYPES.Number ? parseInt(nextRowValue, 10) + 1 : String.fromCharCode(nextRowValue.charCodeAt(0) + 1);
    }
  });
}
function _buildSeats() {
  var _this30 = this;
  // eslint-disable-next-line no-param-reassign
  this.seats = [];
  var rows = Array.from({
    length: this.availableRows
  });
  var cols = Array.from({
    length: this.availableCols
  });
  rows.forEach(function (row, rIndex) {
    cols.forEach(function (col, cIndex) {
      var overlaps = _assertClassBrand(_SeatmapSection_brand, _this30, _overlapsWithFixedElement).call(_this30, [].concat(_toConsumableArray(_this30.facilities), _toConsumableArray(_this30.corridor)), rIndex + 1, cIndex + 1);
      var hideSeat = overlaps.find(function (o) {
        return ["driver", "corridor"].includes(o.type);
      });
      var isOverlapped = overlaps.filter(function (o) {
        return !["item"].includes(o.type);
      }).length ? true : false;
      if (!hideSeat) {
        var colNumber = cIndex + 1;
        var rowNumber = rIndex + 1;
        var customSeat = _this30.customSeats.find(function (st) {
          return st.col === colNumber && st.row === rowNumber;
        });
        // eslint-disable-next-line no-unneeded-ternary
        var allowKeyNav = _this30.allowKeyNavStatusList.includes(customSeat ? customSeat.status : "available") && !isOverlapped;
        var rowLabel = _assertClassBrand(_SeatmapSection_brand, _this30, _getSeatRowLabel).call(_this30, rowNumber);
        var label = customSeat ? customSeat.label : "";
        var status = customSeat ? customSeat.status : "available";
        if (status === "reserved" && !_this30.isEditing) {
          status = _this30.isBackOffice ? "reserved" : "blocked";
        }
        var seat = {
          sectionId: _this30.sectionId,
          containerId: _this30.containerId,
          type: "seat",
          classes: _this30.classes.seat,
          row: rowNumber,
          col: colNumber,
          height: 1,
          width: 1,
          rowLabel: rowLabel,
          status: status,
          label: label,
          allowKeyNav: allowKeyNav,
          overlapped: isOverlapped,
          isReserved: status === "reserved"
        };
        seat.seatId = _this30.getSeatId(seat);
        if (customSeat && customSeat.seatClass) {
          seat.seatClass = customSeat.seatClass;
        }
        if (customSeat && customSeat.fee) {
          seat.fee = customSeat.fee;
        }
        if (customSeat && customSeat.suggested) {
          seat.suggested = customSeat.suggested;
        }
        if (customSeat && customSeat.female) {
          seat.female = customSeat.female;
        }
        if (customSeat && customSeat.accessible) {
          seat.accessible = customSeat.accessible;
        }
        _this30.seats.push(seat);
      }
    });
  });
}
function _enumerateSeats(section) {
  var _this31 = this;
  var rows = Array.from({
    length: this.availableRows
  });
  var seatLabel = this.startingSeatLabel;
  var rowNumber = 1;
  var seatIndex = 1;
  rows.forEach(function (row, rIndex) {
    _this31.seats.filter(function (s) {
      return s.row === rIndex + 1;
    }).sort(function (a, b) {
      return _this31.enumDir === _SeatmapSection.ENUMERATION_DIRECTION.Left ? a.col - b.col : b.col - a.col;
    }).forEach(function (s, index) {
      if (_this31.enumType === _SeatmapSection.ENUMERATION_TYPES.PerRow) {
        if (rowNumber !== s.row) {
          seatLabel = _this31.startingSeatLabel;
          rowNumber++;
        }
      }
      s.label = s.label || seatLabel;
      s.index = seatIndex;
      seatLabel = _this31.seatLabelType === _SeatmapSection.LABEL_TYPES.Number ? parseInt(seatLabel, 10) + 1 : String.fromCharCode(seatLabel.charCodeAt(0) + 1);
      seatIndex++;
    });
  });
}
function _setSeatmap() {
  _assertClassBrand(_SeatmapSection_brand, this, _updateFacilities).call(this);
  _assertClassBrand(_SeatmapSection_brand, this, _buildCorridor).call(this);
  _assertClassBrand(_SeatmapSection_brand, this, _buildSeats).call(this);
  _assertClassBrand(_SeatmapSection_brand, this, _enumerateSeats).call(this);
}
function _createHTMLElement(tag) {
  var classList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var innerHtml = arguments.length > 2 ? arguments[2] : undefined;
  var event = arguments.length > 3 ? arguments[3] : undefined;
  var elem = document.createElement(tag);
  classList.split(",").forEach(function (name) {
    if (name) {
      elem.classList.add(name.trim());
    }
  });
  if (innerHtml) {
    elem.innerHTML = innerHtml;
  }
  if (event) {
    elem.addEventListener(event.name, function () {
      if (event.callBack) {
        event.callBack();
      }
    });
  }
  return elem;
}
function _getElementClasses(elem) {
  if (elem.type === "table") {
    return this.classes.table;
  }
  if (elem.type === "wc") {
    return this.classes.wc;
  }
  if (elem.type === "item") {
    return this.classes.item;
  }
  if (elem.type === "gap") {
    return this.classes.gap;
  }
  if (elem.type === "driver") {
    return elem.alignment.key === _SeatmapSection.FACILITY_ALIGNMENT.Left ? this.classes.driverLeft : this.classes.driverRight;
  }
  if (elem.type === "door") {
    return elem.alignment.key === _SeatmapSection.FACILITY_ALIGNMENT.Left ? this.classes.doorLeft : this.classes.doorRight;
  }
  if (elem.type === "stairway") {
    return elem.orientation.key === _SeatmapSection.FACILITY_ORIENTATION.Horizontal ? this.classes.stairwayHorizontal : this.classes.stairwayVertical;
  }
  if (elem.type === "accordion") {
    return elem.position.key === _SeatmapSection.FACILITY_POSITION.Bottom ? this.classes.accordionBottom : this.classes.accordionTop;
  }
  return elem.classes || "";
}
function _getSeatDataset(elem) {
  var dataset = {};
  dataset.type = elem.type;
  if (elem.sectionId) {
    dataset.section = elem.sectionId;
  }
  if (elem.rowLabel) {
    dataset.rowLabel = elem.rowLabel;
  }
  if (elem.overlapped) {
    dataset.overlapped = elem.overlapped;
  }
  if (elem.allowKeyNav) {
    dataset.keynav = elem.allowKeyNav;
  }
  if (elem.label) {
    dataset.label = elem.label;
  }
  if (elem.index) {
    dataset.index = elem.index;
  }
  if (elem.status) {
    dataset.status = elem.status;
  }
  if (elem.seatClass && elem.seatClass !== -1) {
    dataset.seatClass = elem.seatClass;
  }
  if (elem.fee && elem.fee !== -1) {
    dataset.fee = elem.fee;
  }
  if (elem.suggested) {
    dataset.suggested = elem.suggested;
  }
  if (elem.female) {
    dataset.female = elem.female;
  }
  if (elem.accessible) {
    dataset.accessible = elem.accessible;
  }
  if (elem.containerId) {
    dataset.containerId = elem.containerId;
  }
  if (elem.seatId) {
    dataset.seatId = elem.seatId;
  }
  if (elem.isReserved) {
    dataset.isReserved = elem.isReserved;
  }
  return dataset;
}
function _getSeatRowLabel(rowNumber) {
  var seatRowLabel = "";
  var seatRow = this.corridor.find(function (r) {
    return r.row === rowNumber;
  });
  if (seatRow) {
    seatRowLabel = seatRow.label || seatRow.alternativeLabel;
  } else {
    seatRow = this.corridor.find(function (r) {
      return r.row === rowNumber - 1;
    });
    if (!seatRow) {
      return;
    }
    seatRowLabel = seatRow.label || seatRow.alternativeLabel;
    seatRowLabel = !this.showRowLabels || this.rowLabelType === _SeatmapSection.LABEL_TYPES.Number ? parseInt(seatRowLabel, 10) + 1 : String.fromCharCode(seatRowLabel.charCodeAt(0) + 1);
  }
  return seatRowLabel;
}
function _setElementStyle(style, elem) {
  style["grid-area"] = "".concat(elem.row, "/").concat(elem.col, "/").concat(elem.row + elem.height, "/").concat(elem.col + elem.width);
  var bgColor = elem.bgcolor;
  if (elem.seatClass && this.seatClasses) {
    var seatClass = this.seatClasses.find(function (sc) {
      return sc._id === elem.seatClass;
    });
    if (seatClass) {
      bgColor = seatClass.bgcolor;
    }
  }
  if (elem.fee && this.fees) {
    var fee = this.fees.find(function (fee) {
      return fee._id === elem.fee;
    });
    if (fee) {
      bgColor = fee.bgcolor;
    }
  }
  if (bgColor) {
    style.setProperty("--bgcolor", bgColor);
    if (!elem.color || elem.type !== "wc" && elem.type !== "item") {
      style.setProperty("--color", _assertClassBrand(_SeatmapSection_brand, this, _getContrastYIQ).call(this, bgColor));
    } else {
      style.setProperty("--color", elem.color);
    }
  }
}
function _getContrastYIQ(hexcolor) {
  var darkColor = "#000000";
  var lightColor = "#FFFFFF";
  var color = hexcolor.charAt(0) === '#' ? hexcolor.substring(1, 7) : hexcolor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map(function (col) {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}
function _setFocusOnSeat(index) {
  var extraSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var focus = document.querySelector("[data-focus]");
  var selector = "[data-keynav='true'][data-index='".concat(index, "']").concat(extraSelector);
  var nextSeat = document.querySelector(selector);
  if (nextSeat) {
    if (focus) {
      delete focus.dataset.focus;
    }
    nextSeat.dataset.focus = true;
    return true;
  }
  return false;
}
function _setFocusOnSeatByLabel(label) {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var section = focus.dataset.section;
    var seats = document.querySelectorAll("[data-keynav][data-label='".concat(label, "'][data-section='").concat(section, "']"));
    if (seats.length) {
      delete focus.dataset.focus;
      seats[0].dataset.focus = true;
      return true;
    }
    return false;
  }
  return false;
}
function _showNumPad(numPad) {
  var display = document.querySelector(".numeric-display");
  if (display) {
    display.innerHTML = numPad;
  }
  return false;
}
function _onSelectSeat(evt) {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var index = parseInt(focus.dataset.index, 10);
    var section = focus.dataset.section;
    var nextSeat = document.querySelector("[data-keynav][data-index='".concat(index, "'][data-section='").concat(section, "']"));
    if (nextSeat) {
      nextSeat.click();
    }
  }
}
function _onJumpToFirstSeat() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var section = focus.dataset.section;
    for (var i = 1; i < this.seats.length + 1; i++) {
      if (_assertClassBrand(_SeatmapSection_brand, this, _setFocusOnSeat).call(this, i, "[data-section='".concat(section, "']"))) {
        break;
      }
    }
  }
}
function _onJumpToFinalSeat() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var section = focus.dataset.section;
    for (var i = this.seats.length; i > 0; i--) {
      if (_assertClassBrand(_SeatmapSection_brand, this, _setFocusOnSeat).call(this, i, "[data-section='".concat(section, "']"))) {
        break;
      }
    }
  }
}
function _onJumpToNextSeatNextRow() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var index = parseInt(focus.dataset.index, 10);
    var section = focus.dataset.section;
    for (var i = index + this.seatsPerRowLeft + this.seatsPerRowRight; i < this.seats.length + 1; i += this.seatsPerRowLeft + this.seatsPerRowRight) {
      if (_assertClassBrand(_SeatmapSection_brand, this, _setFocusOnSeat).call(this, i, "[data-section='".concat(section, "']"))) {
        break;
      }
    }
  }
}
function _onJumpToNextSeat() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var section = focus.dataset.section;
    var index = parseInt(focus.dataset.index, 10);
    for (var i = index + 1; i < this.seats.length + 1; i++) {
      if (_assertClassBrand(_SeatmapSection_brand, this, _setFocusOnSeat).call(this, i, "[data-section='".concat(section, "']"))) {
        break;
      }
    }
  }
}
function _onJumpToPrevSeatPrevRow() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var index = parseInt(focus.dataset.index, 10);
    var exception = this.lastRowNoGap && index > this.seats.length - this.seatsPerRowRight;
    var section = focus.dataset.section;
    // eslint-disable-next-line max-len
    for (var i = index - this.seatsPerRowLeft - this.seatsPerRowRight - (exception ? 1 : 0); i > 0; i -= this.seatsPerRowLeft + this.seatsPerRowRight) {
      if (_assertClassBrand(_SeatmapSection_brand, this, _setFocusOnSeat).call(this, i, "[data-section='".concat(section, "']"))) {
        break;
      }
    }
  }
}
function _onJumpToPrevSeat() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var index = parseInt(focus.dataset.index, 10);
    var section = focus.dataset.section;
    for (var i = index - 1; i > 0; i--) {
      if (_assertClassBrand(_SeatmapSection_brand, this, _setFocusOnSeat).call(this, i, "[data-section='".concat(section, "']"))) {
        break;
      }
    }
  }
}
function _manageKeyboardNavigation(evt) {
  var _this32 = this;
  //Enter
  if (evt.keyCode === 13 && evt.altKey === false) {
    _assertClassBrand(_SeatmapSection_brand, this, _onSelectSeat).call(this, evt);
  }

  // Home
  if (evt.keyCode === 36) {
    _assertClassBrand(_SeatmapSection_brand, this, _onJumpToFirstSeat).call(this);
    evt.stopPropagation();
    evt.preventDefault();
  }

  // End
  if (evt.keyCode === 35) {
    _assertClassBrand(_SeatmapSection_brand, this, _onJumpToFinalSeat).call(this);
    evt.stopPropagation();
    evt.preventDefault();
  }

  // Arrow down
  if (evt.keyCode === 40) {
    _assertClassBrand(_SeatmapSection_brand, this, _onJumpToNextSeatNextRow).call(this);
    evt.stopPropagation();
    evt.preventDefault();
  }

  // Arrow right
  if (evt.keyCode === 39) {
    if (this.enumDir === _SeatmapSection.ENUMERATION_DIRECTION.Left) {
      _assertClassBrand(_SeatmapSection_brand, this, _onJumpToNextSeat).call(this);
    } else {
      _assertClassBrand(_SeatmapSection_brand, this, _onJumpToPrevSeat).call(this);
    }
    evt.stopPropagation();
    evt.preventDefault();
  }

  // Arrow up
  if (evt.keyCode === 38) {
    _assertClassBrand(_SeatmapSection_brand, this, _onJumpToPrevSeatPrevRow).call(this);
    evt.stopPropagation();
    evt.preventDefault();
  }

  // Arrow left
  if (evt.keyCode === 37) {
    if (this.enumDir === _SeatmapSection.ENUMERATION_DIRECTION.Left) {
      _assertClassBrand(_SeatmapSection_brand, this, _onJumpToPrevSeat).call(this);
    } else {
      _assertClassBrand(_SeatmapSection_brand, this, _onJumpToNextSeat).call(this);
    }
    evt.stopPropagation();
    evt.preventDefault();
  }

  // Write numbers to focus on a seat
  if (evt.keyCode >= 48 && evt.keyCode <= 57 || evt.keyCode >= 96 && evt.keyCode <= 105) {
    if (this.numPad === "") {
      setTimeout(function () {
        _assertClassBrand(_SeatmapSection_brand, _this32, _setFocusOnSeatByLabel).call(_this32, _this32.numPad);
        _this32.numPad = "";
        _assertClassBrand(_SeatmapSection_brand, _this32, _showNumPad).call(_this32, _this32.numPad);
      }, "500");
    }
    this.numPad += evt.key;
    _assertClassBrand(_SeatmapSection_brand, this, _showNumPad).call(this, this.numPad);
    evt.stopPropagation();
    evt.preventDefault();
  }
}
function _overlapsWithFixedElement(elements, row, col) {
  return elements.filter(function (elem) {
    return row >= elem.row && row < elem.row + elem.height && col >= elem.col && col < elem.col + elem.width;
  });
}
var SeatmapIframe = /*#__PURE__*/function () {
  function SeatmapIframe(config) {
    this.seatmapId = config.seatmapId;
    this.selectable = config.selectable;
    this.liveSeatmapsActivated = config.liveSeatmapsActivated;
    this.idForLiveSeatmap = config.idForLiveSeatmap;
    this.accessTicket = config.accessTicket;
    this.socketUrl = config.socketUrl;
    this.legFrom = config.legFrom;
    this.legTo = config.legTo;
    this.ttlSec = config.ttlSec;
    this.isBackOffice = config.isBackOffice;
    this.parentAccess = config.parentAccess;
    this.seatfees = config.seatfees;
    this.seatClasses = config.seatClasses;
    this.seatmap = config.seatmap;
    this.scheduleId = config.scheduleId;
    window.unSelectSeat = this.unSelectSeat.bind(this);
    window.selectSeat = this.selectSeat.bind(this);
    window.seatmapJoin = this.seatmapJoin.bind(this);
    window.seatmapSeatSelected = this.seatmapSeatSelected.bind(this);
    window.seatmapSeatUnSelected = this.seatmapSeatUnSelected.bind(this);
    window.expiredSeats = this.expiredSeats.bind(this);
  }
  return _createClass(SeatmapIframe, [{
    key: "drawSeatmapIframe",
    value: function drawSeatmapIframe() {
      var _this26 = this;
      var seatmapContainer = document.getElementById("seatmapContainer");
      seatmapContainer.innerHTML = "";
      var socketEvents = null;
      var events = [{
        elementType: "seat",
        elementStatus: ["available"],
        type: "click",
        cb: function cb(evt, e, seat) {
          _this26.seatClickEvent(seat);
        }
      }, {
        elementType: "seat",
        elementStatus: ["available"],
        type: "mouseover",
        cb: function cb(evt, e, seat) {
          //this.parentAccess.isOverSeat(seat, { scheduleId: this.scheduleId });
        }
      }, {
        elementType: "seat",
        elementStatus: ["available"],
        type: "mouseout",
        cb: function cb() {
          //this.parentAccess.isOutSeat();
        }
      }];
      if (this.accessTicket) {
        socketEvents = {
          scheduleId: this.scheduleId,
          callbacks: {
            seatClicked: this.seatClicked.bind(this),
            seatExpired: this.expiredSeats.bind(this),
            seatmapJoin: this.seatmapJoin.bind(this),
            seatmapSeatSelected: this.seatmapSeatSelected,
            seatmapSeatUnSelected: this.seatmapSeatUnSelected
            //seatOver: this.parentAccess.isOverSeat,
            //seatOut: this.parentAccess.isOutSeat
          },
          socketUrl: this.socketUrl,
          idForLiveSeatmap: this.idForLiveSeatmap,
          accessTicket: this.accessTicket,
          legFrom: this.legFrom,
          legTo: this.legTo,
          ttlSec: this.ttlSec
        };
      }
      this.seatmap.sections.forEach(function (section, index) {
        var sectionContainer = document.createElement("div");
        sectionContainer.id = "seatmapContainer-section-".concat(section._id);
        sectionContainer.tabIndex = 0;
        sectionContainer.dataset.sectionName = section.name;
        sectionContainer.classList.add("side-panel", "seatmap", "mr4", "relative");
        seatmapContainer.appendChild(sectionContainer);
        var seatmapSection = new SeatmapSection(sectionContainer.id, section, {
          fees: _this26.seatfees,
          seatClasses: _this26.seatClasses,
          allowKeyNavStatusList: ["available"],
          events: events,
          socketEvents: socketEvents
        });
        seatmapSection.draw();
      });
      try {
        if (this.parentAccess.seatmapReady) {
          this.parentAccess.seatmapReady();
        }
      } catch (error) {
        window.parent.postMessage({
          eventName: "seatmapReady"
        }, "*");
      }
    }

    /* Handler incoming events */
  }, {
    key: "selectSeat",
    value: function selectSeat(currentSeat) {
      var seat = this.parseSeat(currentSeat);
      SeatmapSection.changeSeatDataProp(seat, "selected", "true");
      SeatmapSocket.pushEvent("seat:selected", {
        col: parseInt(seat.col, 10),
        row: parseInt(seat.row, 10),
        sectionId: seat.sectionId
      }, currentSeat);
    }
  }, {
    key: "unSelectSeat",
    value: function unSelectSeat(currentSeat) {
      var seat = typeof currentSeat === "string" ? this.parseSeat(currentSeat) : currentSeat;
      var seatId = typeof currentSeat === "string" ? currentSeat : this.getSeatId(currentSeat);
      SeatmapSection.changeSeatDataProp(seat, "selected", "false");
      SeatmapSocket.pushEvent("seat:unselected", {
        col: parseInt(seat.col, 10),
        row: parseInt(seat.row, 10),
        sectionId: seat.sectionId
      }, seatId);
    }

    /* Events from section */
  }, {
    key: "seatClicked",
    value: function seatClicked(seat) {
      this.seatClickEvent(seat);
    }

    /* Expose events outside the iframe */
  }, {
    key: "seatClickEvent",
    value: function seatClickEvent(seat) {
      try {
        // expose event outside iframe from same domain
        if (this.parentAccess.addSeatToSelection) {
          this.parentAccess.addSeatToSelection(Object.assign(seat, {
            sectionName: seat.sectionName
          }), {
            scheduleId: this.scheduleId
          });
        } else if (this.parentAccess.addSeatToSelectionNew) {
          this.parentAccess.addSeatToSelectionNew(Object.assign(seat, {
            sectionName: seat.sectionName
          }), {
            scheduleId: this.scheduleId
          });
        }
      } catch (error) {
        // expose event outside iframe from other domain
        var data = {
          eventName: "addSeatToSelectionNew",
          //keeps compatibility with old seatmaps implementation
          seatLocationObject: _objectSpread(_objectSpread({}, seat), {}, {
            seatNumber: seat.label
          }),
          iFrameInformationObject: {
            scheduleId: config.scheduleId
          }
        };
        window.parent.postMessage(data, "*");
        window.addEventListener("message", function (event) {
          if (event.data.eventName === "selectedSeatFromOtherDomain") {
            window.selectSeat(event.data.seatId);
          }
          if (event.data.eventName === "unSelectSeatFromOtherDomain") {
            window.unSelectSeat(event.data.seatId);
          }
        }, false);
      }
    }

    /* Events from socket */
  }, {
    key: "seatmapSeatUnSelected",
    value: function seatmapSeatUnSelected(seat) {
      SeatmapSection.changeSeatStatus(seat, "available");
      SeatmapSection.changeSeatDataProp(seat, "keynav", "true");
    }
  }, {
    key: "seatmapSeatSelected",
    value: function seatmapSeatSelected(seat) {
      SeatmapSection.changeSeatStatus(seat, "blocked");
    }
  }, {
    key: "seatmapJoin",
    value: function seatmapJoin() {
      var seats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      seats.forEach(function (s) {
        SeatmapSection.changeSeatStatus(s.seat, "blocked");
      });
    }
  }, {
    key: "expiredSeats",
    value: function expiredSeats() {
      var _this27 = this;
      var seats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      seats.forEach(function (seat) {
        seat.seat_id = _this27.getSeatId(seat);
        SeatmapSection.changeSeatDataProp(seat, "selected", "false");
        SeatmapSection.changeSeatStatus(seat, "available");
      });
      try {
        this.parentAccess.expiredSeats(seats, {
          scheduleId: config.scheduleId
        });
      } catch (error) {
        var data = {
          eventName: "expiredSeats",
          expired: seats
        };
        window.parent.postMessage(data, "*");
      }
    }

    /* Helpers */
  }, {
    key: "getSeatId",
    value: function getSeatId(seat) {
      return "section-".concat(seat.sectionId, "-row-").concat(seat.row, "-seat-").concat(seat.col);
    }
  }, {
    key: "parseSeat",
    value: function parseSeat(seatId) {
      var properties = seatId.split('-');
      var sectionId = properties[1];
      var row = properties[3];
      var col = properties[5];
      return {
        row: row,
        col: col,
        sectionId: sectionId
      };
    }
  }]);
}();
try {
  module.exports = {
    SeatmapSection: SeatmapSection,
    SeatmapIframe: SeatmapIframe
  };
} catch (e) {}