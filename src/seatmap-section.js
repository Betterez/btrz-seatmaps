// 👇️ named export

var Phoenix = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // js/phoenix/index.js
  var phoenix_exports = {};
  __export(phoenix_exports, {
    Channel: () => Channel,
    LongPoll: () => LongPoll,
    Presence: () => Presence,
    Serializer: () => serializer_default,
    Socket: () => Socket
  });

  // js/phoenix/utils.js
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure2 = function() {
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
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
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
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    send() {
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
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };

  // js/phoenix/timer.js
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };

  // js/phoenix/channel.js
  var Channel = class {
    constructor(topic, params, socket) {
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
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      }));
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
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
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(_event, payload, _ref) {
      return payload;
    }
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };

  // js/phoenix/ajax.js
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global.XDomainRequest) {
        let req = new global.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
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
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };

  // js/phoenix/longpoll.js
  var arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.awaitingBatchAck = false;
      this.currentBatch = null;
      this.currentBatchTimer = null;
      this.batchBuffer = [];
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", "application/json", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    send(body) {
      if (typeof body !== "string") {
        body = arrayBufferToBase64(body);
      }
      if (this.currentBatch) {
        this.currentBatch.push(body);
      } else if (this.awaitingBatchAck) {
        this.batchBuffer.push(body);
      } else {
        this.currentBatch = [body];
        this.currentBatchTimer = setTimeout(() => {
          this.batchSend(this.currentBatch);
          this.currentBatch = null;
        }, 0);
      }
    }
    batchSend(messages) {
      this.awaitingBatchAck = true;
      this.ajax("POST", "application/x-ndjson", messages.join("\n"), () => this.onerror("timeout"), (resp) => {
        this.awaitingBatchAck = false;
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        } else if (this.batchBuffer.length > 0) {
          this.batchSend(this.batchBuffer);
          this.batchBuffer = [];
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      this.batchBuffer = [];
      clearTimeout(this.currentBatchTimer);
      this.currentBatchTimer = null;
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, contentType, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), contentType, body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };

  // js/phoenix/presence.js
  var Presence = class {
    constructor(channel, opts = {}) {
      let events = opts.events || { state: "presence_state", diff: "presence_diff" };
      this.state = {};
      this.pendingDiffs = [];
      this.channel = channel;
      this.joinRef = null;
      this.caller = {
        onJoin: function() {
        },
        onLeave: function() {
        },
        onSync: function() {
        }
      };
      this.channel.on(events.state, (newState) => {
        let { onJoin, onLeave, onSync } = this.caller;
        this.joinRef = this.channel.joinRef();
        this.state = Presence.syncState(this.state, newState, onJoin, onLeave);
        this.pendingDiffs.forEach((diff) => {
          this.state = Presence.syncDiff(this.state, diff, onJoin, onLeave);
        });
        this.pendingDiffs = [];
        onSync();
      });
      this.channel.on(events.diff, (diff) => {
        let { onJoin, onLeave, onSync } = this.caller;
        if (this.inPendingSyncState()) {
          this.pendingDiffs.push(diff);
        } else {
          this.state = Presence.syncDiff(this.state, diff, onJoin, onLeave);
          onSync();
        }
      });
    }
    onJoin(callback) {
      this.caller.onJoin = callback;
    }
    onLeave(callback) {
      this.caller.onLeave = callback;
    }
    onSync(callback) {
      this.caller.onSync = callback;
    }
    list(by) {
      return Presence.list(this.state, by);
    }
    inPendingSyncState() {
      return !this.joinRef || this.joinRef !== this.channel.joinRef();
    }
    static syncState(currentState, newState, onJoin, onLeave) {
      let state = this.clone(currentState);
      let joins = {};
      let leaves = {};
      this.map(state, (key, presence) => {
        if (!newState[key]) {
          leaves[key] = presence;
        }
      });
      this.map(newState, (key, newPresence) => {
        let currentPresence = state[key];
        if (currentPresence) {
          let newRefs = newPresence.metas.map((m) => m.phx_ref);
          let curRefs = currentPresence.metas.map((m) => m.phx_ref);
          let joinedMetas = newPresence.metas.filter((m) => curRefs.indexOf(m.phx_ref) < 0);
          let leftMetas = currentPresence.metas.filter((m) => newRefs.indexOf(m.phx_ref) < 0);
          if (joinedMetas.length > 0) {
            joins[key] = newPresence;
            joins[key].metas = joinedMetas;
          }
          if (leftMetas.length > 0) {
            leaves[key] = this.clone(currentPresence);
            leaves[key].metas = leftMetas;
          }
        } else {
          joins[key] = newPresence;
        }
      });
      return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
    }
    static syncDiff(state, diff, onJoin, onLeave) {
      let { joins, leaves } = this.clone(diff);
      if (!onJoin) {
        onJoin = function() {
        };
      }
      if (!onLeave) {
        onLeave = function() {
        };
      }
      this.map(joins, (key, newPresence) => {
        let currentPresence = state[key];
        state[key] = this.clone(newPresence);
        if (currentPresence) {
          let joinedRefs = state[key].metas.map((m) => m.phx_ref);
          let curMetas = currentPresence.metas.filter((m) => joinedRefs.indexOf(m.phx_ref) < 0);
          state[key].metas.unshift(...curMetas);
        }
        onJoin(key, currentPresence, newPresence);
      });
      this.map(leaves, (key, leftPresence) => {
        let currentPresence = state[key];
        if (!currentPresence) {
          return;
        }
        let refsToRemove = leftPresence.metas.map((m) => m.phx_ref);
        currentPresence.metas = currentPresence.metas.filter((p) => {
          return refsToRemove.indexOf(p.phx_ref) < 0;
        });
        onLeave(key, currentPresence, leftPresence);
        if (currentPresence.metas.length === 0) {
          delete state[key];
        }
      });
      return state;
    }
    static list(presences, chooser) {
      if (!chooser) {
        chooser = function(key, pres) {
          return pres;
        };
      }
      return this.map(presences, (key, presence) => {
        return chooser(key, presence);
      });
    }
    static map(obj, func) {
      return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
    }
    static clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  };

  // js/phoenix/serializer.js
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };

  // js/phoenix/socket.js
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    getLongPollTransport() {
      return LongPoll;
    }
    replaceTransport(newTransport) {
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
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    connect(params) {
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
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.triggerChanError();
        this.closeWasClean = false;
        this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      this.clearHeartbeats();
      this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onopen = function() {
            };
            this.conn.onerror = function() {
            };
            this.conn.onmessage = function() {
            };
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      this.clearHeartbeats();
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    connectionState() {
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
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
    }
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.clearHeartbeats();
          this.pendingHeartbeatRef = null;
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };
  return __toCommonJS(phoenix_exports);
})();

class SeatmapSocket {
  static channel = null;
  static channels = new Map();
  static socket = null;
  static currentTripId = null;
  static listen(settings) {
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
        SeatmapSocket.channels.forEach((channel) => {
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
        const newChannel = SeatmapSocket.socket.channel(
          `seatmap:${settings.idForLiveSeatmap}`,
          {leg_from: settings.legFrom, leg_to: settings.legTo}
        );
        SeatmapSocket.channels.set(settings.idForLiveSeatmap, newChannel);
        SeatmapSocket.channel = newChannel;
      }

      SeatmapSocket.channel.join()
      .receive("ok", () => {
        console.log(`Join successfully to ${SeatmapSocket.channel.topic}`);

        SeatmapSocket.channel.on("seat:selected", (payload) => {
          console.log("seat:selected", payload);
          const selectedSeat = payload.selected_seat.seat || payload.selected_seat.seat_id;
          if (SeatmapSocket.settings.callbacks.seatmapSeatSelected && selectedSeat) {
            SeatmapSocket.settings.callbacks.seatmapSeatSelected(selectedSeat);
          }
        });

        SeatmapSocket.channel.on("seat:unselected", (payload) => {
          console.log("seat:unselected", payload);
          const unselectedSeat = payload.unselected_seat.seat;
          if (SeatmapSocket.settings.callbacks.seatmapSeatUnSelected && unselectedSeat) {
            SeatmapSocket.settings.callbacks.seatmapSeatUnSelected(unselectedSeat);
          }
        });

        SeatmapSocket.channel.on("sync:join", (payload) => {
          console.log("sync:join", payload);
          if (SeatmapSocket.settings.callbacks.seatmapJoin && payload.seats && payload.seats.length) {
            SeatmapSocket.settings.callbacks.seatmapJoin(payload.seats);
          }
        });

        SeatmapSocket.channel.on("sync:seats", (payload) => {
          console.log("sync:seats", payload);
          SeatmapSocket.settings.callbacks.seatExpired(payload.expired.map((data) => { return {
            //seat_id: `${data.seat.row}-${data.seat.col}-${data.seat.label}`,
            row: data.seat.row ,
            col: data.seat.col,
            rowLabel: data.seat.rowLabel,
            label: data.seat.label,
            //height: 1,
            //width: 1,
            sectionId: data.seat.sectionId,
            scheduleId: data.seat.scheduleId
            //sectionName: data.seat.sectionName
          } }) , {scheduleId: SeatmapSocket.settings.scheduleId});
        });

      })
      .receive("error", (err) => {
          console.log(`Failed join: ${err}`);
      });
      
  }
  static pushEvent(name, seat, seatId) {
    if (SeatmapSocket.channel) {
        const payload = {
          seat: {
          leg_from: SeatmapSocket.settings.legFrom,
          leg_to: SeatmapSocket.settings.legTo,
          seat,
          seat_id: seatId
          },
          ttl_sec: SeatmapSocket.settings.ttlSec
      };
      SeatmapSocket.channel.push(name, payload);
    }
  }
}

class SeatmapSection {
  static get CLASSES () {
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

  static get LABELS () {
    return {
        section: "Section",
        row: "Row",
        seat: "Seat",
        status: "Status",
        seatClass: "Seat class",
        fee: "Fee",
        female: "Female",
        suggested: "Suggested",
        accessible: "Accessible"
    };
  }

  static get LABEL_TYPES () {
    return {
      Number: 1,
      Letter: 2
    };
  };

  static get ENUMERATION_TYPES () {
    return {
      Sequencial: 1,
      PerRow: 2
    };
  };
  
  static get ENUMERATION_DIRECTION () {
    return {
      Left: 1,
      Right: 2
    };
  };

  static get FACILITY_ALIGNMENT () {
    return {
      Left: 1,
      Right: 2
    };
  };

  static get FACILITY_ORIENTATION () {
    return {
      Horizontal: 1,
      Vertical: 2
    };
  };

  static get FACILITY_POSITION () {
    return {
      Bottom: 1,
      Top: 2
    };
  };

  constructor(
    containerId = "",
    section = {},
    settings = {},
    isBackOffice = false
  ) {
    this.allowKeyNavStatusList = settings.allowKeyNavStatusList || ["available"];
    this.containerId = containerId;
    this.availableRows = parseInt(section.availableRows, 10) || 15;
    this.seatsPerRowLeft = typeof(section.seatsPerRowLeft) !== "undefined" ? section.seatsPerRowLeft : 2;
    this.seatsPerRowRight = typeof(section.seatsPerRowRight) !== "undefined" ? section.seatsPerRowRight : 2;
    this.rowsEnumNoGaps = section.rowsEnumNoGaps;
    this.facilities = section.facilities || [];
    this.seats = section.seats || [];
    this.customSeats = section.customSeats || [];
    this.enumType = section.enumType || SeatmapSection.ENUMERATION_TYPES.Sequencial;
    this.enumDir = section.enumDir || SeatmapSection.ENUMERATION_TYPES.Left,
    this.rowLabelType = section.rowLabelType || SeatmapSection.LABEL_TYPES.Number;
    this.seatLabelType = section.seatLabelType || SeatmapSection.LABEL_TYPES.Number;
    this.startingSeatLabel = section.startingSeatLabel || (this.seatLabelType === SeatmapSection.LABEL_TYPES.Number ? 1 : "A"),
    this.startingRowLabel = section.startingRowLabel || (this.rowLabelType === SeatmapSection.LABEL_TYPES.Number ? 1 : "A");
    this.showRowLabels = section.showRowLabels;
    this.lastRowNoGap = section.lastRowNoGap;
    this.sectionName = section.name || "";
    this.showSectionName = typeof(section.showSectionName) !== "undefined" ? section.showSectionName : true;
    this.sectionId = section._id || "";
    this.capacity = section.capacity || 60;
    this.rowLabelRange = section.rowLabelRange;
    this.events = settings.events || [];
    this.classes = settings.classes || SeatmapSection.CLASSES;
    this.labels = settings.labels || SeatmapSection.LABELS;
    this.seatClasses = settings.seatClasses || [];
    this.fees = settings.fees || [];
    this.isEditing = settings.isEditing || false;
    this.numPad = "";
    this.isBackOffice = isBackOffice;

    this.#setSeatmap();
    this.#manageSocketEvents(settings.socketEvents)
  }

  #manageSocketEvents(socketEvents) {
    try {
      if (socketEvents) {
        this.socketEvents = socketEvents;

        SeatmapSocket.listen(socketEvents);
        this.events = [
          {
              elementType: "seat",
              elementStatus: ["available", "reserved"],
              type: "click",
              cb: this.onSeatClicked.bind(this)
          },
          {
            elementType: "seat",
            elementStatus: ["available", "reserved"],
            type: "mouseover",
            cb: this.onSeatMouseOver.bind(this)
          },
          {
            elementType: "seat",
            elementStatus: ["available", "reserved"],
            type: "mouseout",
            cb: this.onSeatMouseOut.bind(this)
          }
        ];
      }
    } catch(err) {
      console.log(err);
    }
  }

  onSeatMouseOver(evt, e, elem) {
    if (this.socketEvents.callbacks.seatOver) {
      this.socketEvents.callbacks.seatOver(elem, {tripId: this.socketEvents.tripId, scheduleId: this.socketEvents.scheduleId});
    }
  }

  onSeatMouseOut(evt, e, elem) {
    if (this.socketEvents.callbacks.seatOut) {
      this.socketEvents.callbacks.seatOut(elem, {tripId: this.socketEvents.tripId, scheduleId: this.socketEvents.scheduleId});
    }
  }  

  getSeatId(seat) {
    return `section-${seat.sectionId}-row-${seat.row}-seat-${seat.col}`;
  }

  onSeatClicked(evt, e, seat) {
    const notAvailableSeats = ["blocked"]
    if (!this.isBackOffice) {
      notAvailableSeats.push("reserved");
    }
    if (notAvailableSeats.includes(e.dataset.status) && (!e.dataset.selected || e.dataset.selected === "false")) {
      return;
    }
    this.socketEvents.callbacks.seatClicked(Object.assign(
      seat,
      {
        sectionName: this.sectionName,
        sectionId: this.sectionId
      }),
      {tripId: this.socketEvents.tripId, scheduleId: this.socketEvents.scheduleId});
  }

  static changeSeatDataProp(elem, prop, value) {
    const sectionSelector = elem.sectionId ? `[data-section="${elem.sectionId}"]` : ``;
    const containerSelector = elem.containerId ? `[data-container-id="${elem.containerId}"]` : ``
    const selector = `${containerSelector}${sectionSelector}[style*='grid-area: ${elem.row} / ${elem.col} / ${parseInt(elem.row, 10) + (elem.height || 1)} / ${parseInt(elem.col, 10) + (elem.width || 1)};']`;
   
    const element = document.querySelector(selector);
    if (element) {
      element.dataset[prop] = value;
    }
  }

  static changeSeatStatus(elem, status) {
    const sectionSelector = elem.sectionId ? `[data-section="${elem.sectionId}"]` : ``;
    const containerSelector = elem.containerId ? `[data-container-id="${elem.containerId}"]` : ``
    const selector = `${containerSelector}${sectionSelector}[style*='grid-area: ${elem.row} / ${elem.col} / ${parseInt(elem.row, 10) + (elem.height || 1)} / ${parseInt(elem.col, 10) + (elem.width || 1)};']`;
    const element = document.querySelector(`[data-type="seat"]${selector}`);
    if (element) {
      const newStatusText = `${status.charAt(0).toUpperCase()}${status.slice(1)}`;
      const oldStatusText = `${element.dataset.status.charAt(0).toUpperCase()}${element.dataset.status.slice(1)}`;
      element.title = element.title.replace(oldStatusText, newStatusText);

      if (element.dataset.selected) {
        element.dataset.keynav = "true";
      }
      if (status === "blocked" && !element.dataset.selected) {
        element.dataset.keynav = "false";
      }
      if (status === "available" || status === "unavailable") {
        element.dataset.keynav = "false";
      }      
      if(status === "unavailable" && element.dataset.accessible){
        element.dataset.accessible = false;
      }
    }
  }

  clearFocus() {
    const focus = document.querySelector(`[data-focus][data-section="${this.sectionId}"]`);
    if (focus) {
        delete focus.dataset.focus;
    }    
  }

  clearSelection() {
    const selection = document.querySelectorAll(`#${this.containerId} .seatmap-outline-blue`);
    selection.forEach((prev) => prev.classList.remove("seatmap-outline-blue"));
  }

  draw() {
    const numericDisplay = this.#createHTMLElement("div", "numeric-display, absolute, right-0, left-0, center, z2, bold, opacity3, color-grey-darkest");
    const container = document.getElementById(this.containerId);
    if (container) {
      container.onkeydown = (evt) => { this.#manageKeyboardNavigation(evt); };

      container.style.setProperty("--columns", this.availableCols);
      container.style.setProperty("--rows", this.availableRows);
      container.style["background-color"] = "#F9F9F9";
      container.innerHTML = "";
      container.appendChild(numericDisplay);

      if (this.sectionName && this.showSectionName) {
        const sectionNameWrapper = this.#createHTMLElement("div", "absolute, bottom-0, right-0, left-0, center, mbn3, z2");
        const sectionNameContainer = this.#createHTMLElement("div", "bg-info, uppercase, fs6, color-info-lightest, box-shadow-black-10, border, border-info-light, inline-block, rounded-max, px2, line-height-4", this.sectionName);
        sectionNameWrapper.appendChild(sectionNameContainer);
        container.appendChild(sectionNameWrapper);
      }

      [
        ...this.corridor,
        ...this.facilities,
        ...this.seats
      ].forEach((elem) => {
        const classes = this.#getElementClasses(elem);
        const e = this.#createHTMLElement("div", classes, elem.label || "");
        const dataset = this.#getSeatDataset(elem);
        Object.keys(dataset).forEach((k) => {
          e.dataset[k] = dataset[k];
        });


        if (elem.type === "seat") {
          e.title = SeatmapSection.getSeatTitle(elem, this.sectionName, this.labels, this.seatClasses, this.fees);
        }

        this.#setElementStyle(e.style, elem)

        this.events.forEach((evt) => {
          let appliesEvent = false;
          if (evt.elementType) {
            appliesEvent = appliesEvent ||
                           (!evt.elementType.startsWith("!") && evt.elementType === elem.type) ||
                           (evt.elementType.startsWith("!") && evt.elementType.slice(1) !== elem.type);
          }
          if (evt.elementStatus) {
            appliesEvent = evt.elementType ?
              appliesEvent && (evt.elementStatus.map((s) => s.trim()).includes(elem.status)) :
              appliesEvent || (evt.elementStatus.map((s) => s.trim()).includes(elem.status));
          }

          if (appliesEvent) {
            e.addEventListener(evt.type || "click", (target) => {
              evt.cb(target, e, elem);
            });
          }
        });

        container.appendChild(e);
      });
    }
  }

  focus() {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.focus();
    }
    
    for (let i = 1; i < this.seats.length + 1; i++) {
        if (this.#setFocusOnSeat(i, `[data-section="${this.sectionId}"]`)) {
            break;
        }
    }
  }  

  focusElement(elem) {
    this.clearFocus();
    document.querySelector(`[data-index='${elem.index}']`).dataset.focus = true;
  }

  focusOnNextSelected(seat) {
    const seatSelected = seat ?
      document.querySelector(`[data-keynav='true'][data-selected=true][data-index='${seat.index}']`) :
      document.querySelector(`[data-keynav='true'][data-selected=true]`) || document.querySelector(`[data-keynav='true'][data-suggested=true]`);
    const index = seatSelected ? seatSelected.dataset.index : 1;
    const container = document.getElementById(this.containerId);
    if (container) {
      container.focus();
    }

    for (let i = index; i < this.seats.length + 1; i++) {
      if (this.#setFocusOnSeat(i, "[data-status='available']:not([data-selected=true])")) {
        break;
      }
    }
  }

  getCapacity() {
    return (this.seats || []).filter((s) => !s.overlapped && s.status && s.type === "seat").length;
  }

  selectElement(elem) {
    const selector = `[style*='grid-area: ${elem.row} / ${elem.col} / ${elem.row + elem.height} / ${elem.col + elem.width};']`;
    const element = document.querySelector(selector);    
    element.classList.add("seatmap-outline-blue");
  }  

  #updateFacilities() {
    const filteredElements = [];
    // eslint-disable-next-line no-param-reassign
    this.availableCols = this.seatsPerRowLeft + this.seatsPerRowRight + 1;

    this.facilities.forEach((ele) => {
        if (ele.type === "driver") {
          // eslint-disable-next-line no-param-reassign
          ele.width = this.availableCols;
          filteredElements.push(ele);
        } else if (ele.type === "accordion") {
          ele.width = this.availableCols;
          ele.row = ele.position.key ===  SeatmapSection.FACILITY_POSITION.Top ? 1 : this.availableRows;
          filteredElements.push(ele);
        } else if (ele.type === "door") {
          ele.col = ele.alignment.key ===  SeatmapSection.FACILITY_ALIGNMENT.Left ? 1 : this.availableCols;
          filteredElements.push(ele);
        } else if ((this.availableCols + 1) >= ele.col + ele.width) {
            filteredElements.push(ele);
        }
    });
    // eslint-disable-next-line no-param-reassign
    this.facilities = filteredElements;
  }

  #buildCorridor() {
    let rowsWithoutLabels = [];
    // eslint-disable-next-line no-param-reassign
    this.corridor = [];

    (this.rowLabelRange || "").split(",").forEach((r) => {
        const range = r.split(":");
        const start = parseInt(range[0], 10);
        const stop = parseInt(range[1], 10);
        const step = 1;

        rowsWithoutLabels = [...rowsWithoutLabels, ...(Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => {
                return start + index * step;
            }
        ))];
    });

    const driver = this.facilities.find((elem) => elem.type === "driver");
    const startingRowPosition = driver ? 2 : 1;
    let rows = [];
    rows = Array.from({
        length: this.availableRows - (this.lastRowNoGap ? 1 : 0) - (driver ? 1 : 0)
    });
    let nextRowValue = this.startingRowLabel;

    rows.forEach((row, rIndex) => {
        const showLabel = this.showRowLabels && (!rowsWithoutLabels.length || !rowsWithoutLabels.includes(rIndex + 1));
          this.corridor.push({
            row: rIndex + startingRowPosition,
            col: this.seatsPerRowLeft + 1,
            height: 1,
            width: 1,
            type: "corridor",
            classes: this.classes.corridor,
            label: showLabel ? nextRowValue : undefined,
            alternativeLabel: this.rowLabelType === SeatmapSection.LABEL_TYPES.Number ? rIndex + 1 : String.fromCharCode(96 + rIndex + 1).toUpperCase()
          });

        if (showLabel || !this.rowsEnumNoGaps) {
            nextRowValue = this.rowLabelType === SeatmapSection.LABEL_TYPES.Number ?
                parseInt(nextRowValue, 10) + 1 :
                String.fromCharCode(nextRowValue.charCodeAt(0) + 1);
        }
    });
  }

  #buildSeats() {
    // eslint-disable-next-line no-param-reassign
    this.seats = [];
    const rows = Array.from({
        length: this.availableRows
    });
    const cols = Array.from({
        length: this.availableCols
    });
    rows.forEach((row, rIndex) => {
        cols.forEach((col, cIndex) => {
            const overlaps = this.#overlapsWithFixedElement([...this.facilities, ...this.corridor], rIndex + 1, cIndex + 1);
            const hideSeat = overlaps.find((o) => {
                return ["driver", "corridor"].includes(o.type);
            });
            const isOverlapped = overlaps.filter((o) => {
                return !["item"].includes(o.type);
            }).length ? true : false;
            if (!hideSeat) {
                const colNumber = cIndex + 1;
                const rowNumber = rIndex + 1;
                const customSeat = this.customSeats.find((st) => {
                    return st.col === colNumber && st.row === rowNumber;
                });
                // eslint-disable-next-line no-unneeded-ternary
                const allowKeyNav = this.allowKeyNavStatusList.includes(customSeat ? customSeat.status : "available") && !isOverlapped;

                const rowLabel = this.#getSeatRowLabel(rowNumber);
                const label = customSeat ? customSeat.label : "";
                let status = customSeat ? customSeat.status : "available";
                if (status === "reserved" && !this.isEditing) {
                  status = this.isBackOffice ? "available" : "blocked";
                }
                const seat = {
                  sectionId: this.sectionId,
                  containerId: this.containerId,
                  type: "seat",
                  classes: this.classes.seat,
                  row: rowNumber,
                  col: colNumber,
                  height: 1,
                  width: 1,
                  rowLabel,
                  status,
                  label,
                  allowKeyNav,
                  overlapped: isOverlapped
                };
                seat.seatId = this.getSeatId(seat);
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
                this.seats.push(seat);
            }
        });
    });
  }

  #enumerateSeats(section) {
    const rows = Array.from({length: this.availableRows});
    let seatLabel = this.startingSeatLabel;
    let rowNumber = 1;
    let seatIndex = 1;
    rows.forEach((row, rIndex) => {
        this.seats
            .filter((s) => s.row === rIndex + 1)
            .sort((a, b) => (this.enumDir === SeatmapSection.ENUMERATION_DIRECTION.Left ? a.col - b.col : b.col - a.col))
            .forEach((s, index) => {
                if (this.enumType === SeatmapSection.ENUMERATION_TYPES.PerRow) {
                    if (rowNumber !== s.row) {
                        seatLabel = this.startingSeatLabel;
                        rowNumber++;
                    }
                }
                s.label = s.label || seatLabel;
                s.index = seatIndex;
                seatLabel = this.seatLabelType === SeatmapSection.LABEL_TYPES.Number ?
                    parseInt(seatLabel, 10) + 1 :
                    String.fromCharCode(seatLabel.charCodeAt(0) + 1);
                seatIndex++;
            });
    });
  }

  #setSeatmap() {
      this.#updateFacilities();
      this.#buildCorridor();
      this.#buildSeats();
      this.#enumerateSeats();
  }

  #createHTMLElement(tag, classList = "", innerHtml, event) {
    const elem = document.createElement(tag);

    classList.split(",").forEach((name) => {
      if (name) {
        elem.classList.add(name.trim());
      }
    });

    if (innerHtml) {
      elem.innerHTML = innerHtml;
    }

    if (event) {
      elem.addEventListener(event.name, () => {
        if (event.callBack) {
          event.callBack();
        }
      });
    }
    return elem;
  }

  #getElementClasses(elem) {
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
      return elem.alignment.key === SeatmapSection.FACILITY_ALIGNMENT.Left ?
        this.classes.driverLeft :
        this.classes.driverRight;
    }
    if (elem.type === "door") {
      return elem.alignment.key === SeatmapSection.FACILITY_ALIGNMENT.Left ?
        this.classes.doorLeft :
        this.classes.doorRight;
    }
    if (elem.type === "stairway") {
      return elem.orientation.key === SeatmapSection.FACILITY_ORIENTATION.Horizontal ?
        this.classes.stairwayHorizontal :
        this.classes.stairwayVertical;
    }
    if (elem.type === "accordion") {
      return elem.position.key === SeatmapSection.FACILITY_POSITION.Bottom ?
        this.classes.accordionBottom :
        this.classes.accordionTop;
    }

    return elem.classes || "";
  }

  #getSeatDataset(elem) {
    const dataset = {};
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
    return dataset;
  }

  #getSeatRowLabel(rowNumber) {
    let seatRowLabel = "";
    let seatRow = this.corridor.find((r) => {
      return r.row === rowNumber;
    });
    if (seatRow) {
      seatRowLabel = (seatRow.label || seatRow.alternativeLabel);
    } else {
      seatRow = this.corridor.find((r) => {
        return r.row === rowNumber - 1;
      });
      if(!seatRow){
        return;
      }
      seatRowLabel = (seatRow.label || seatRow.alternativeLabel);
      seatRowLabel = !this.showRowLabels || this.rowLabelType === SeatmapSection.LABEL_TYPES.Number ?
        parseInt(seatRowLabel, 10) + 1 :
        String.fromCharCode(seatRowLabel.charCodeAt(0) + 1);
    }
    return seatRowLabel;
  }

  static getSeatTitle(elem, sectionName, labels, seatClasses, fees) {
    const seat = elem.label ? `${labels.seat}: ${elem.label} \n` : "";
    const row = elem.rowLabel ? `${labels.row}: ${elem.rowLabel} \n` : "";
    const status = elem.status ? `${labels.status}: ${elem.status.charAt(0).toUpperCase()}${elem.status.slice(1)} \n` : "";
    const section = sectionName ? `${labels.section}: ${sectionName} \n` : "";

    const seatClass = seatClasses.find((sc) => sc._id === elem.seatClass);
    const seatClassName = seatClass && seatClass.value ? `${labels.seatClass}: ${seatClass.value} \n` : "";
    const fee = fees.find((fee) => fee._id === elem.fee);
    const feeName = fee && fee.name ? `${labels.fee}: ${fee.name} (+${fee.type === "$" ? "$" : ""}${fee.value}${fee.type === "%" ? "%" : ""}) \n` : "";

    const isAccessible = elem.accessible ? `${labels.accessible}` : "";
    const isFemale = elem.female ? `${labels.female}` : "";
    const isSuggested = elem.suggested ? `${labels.suggested}` : "";

    return `${section}${row}${seat}${status}${seatClassName}${feeName}${isAccessible}${isFemale}${isSuggested}`;
  }

  #setElementStyle(style, elem) {
    style["grid-area"] = `${elem.row}/${elem.col}/${elem.row + elem.height}/${elem.col + elem.width}`;

    let bgColor = elem.bgcolor;
    if (elem.seatClass && this.seatClasses) {
      const seatClass = this.seatClasses.find((sc) => sc._id === elem.seatClass);
      if (seatClass) {
        bgColor = seatClass.bgcolor;
      }
    }
    if (elem.fee && this.fees) {
      const fee = this.fees.find((fee) => fee._id === elem.fee);
      if (fee) {
        bgColor = fee.bgcolor;
      }
    }

    if (bgColor) {
      style.setProperty("--bgcolor", bgColor);

      if (!elem.color || (elem.type !== "wc" && elem.type !== "item")) {
        style.setProperty("--color", this.#getContrastYIQ(bgColor));
      } else {
        style.setProperty("--color", elem.color);
      }

    }
  }

  #getContrastYIQ(hexcolor) {
    var darkColor = "#000000";
    var lightColor = "#FFFFFF";
    var color = (hexcolor.charAt(0) === '#') ? hexcolor.substring(1, 7) : hexcolor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return (L > 0.179) ? darkColor : lightColor;
  }

  #setFocusOnSeat(index, extraSelector = "") {
      const focus = document.querySelector("[data-focus]");
      const selector = `[data-keynav='true'][data-index='${index}']${extraSelector}`;
      const nextSeat = document.querySelector(selector);
      if (nextSeat) {
          if (focus) {
            delete focus.dataset.focus;  
          }
          
          nextSeat.dataset.focus = true;
          return true;
      }
      return false;
  }

  #setFocusOnSeatByLabel(label) {
    var focus = document.querySelector("[data-focus]");
    if (focus) {
      var section = focus.dataset.section;
      const seats = document.querySelectorAll(`[data-keynav][data-label='${label}'][data-section='${section}']`);
      if (seats.length) {
        delete focus.dataset.focus;
        seats[0].dataset.focus = true;
        return true;
      }
      return false;
    }
    return false;
  }

  #showNumPad(numPad) {
    var display = document.querySelector(".numeric-display");
    if (display) {
      display.innerHTML = numPad;
    }
    return false;
  }

  #onSelectSeat(evt) {
    const focus = document.querySelector("[data-focus]");

    if (focus) {
        const index = parseInt(focus.dataset.index, 10);
        const section = focus.dataset.section;
        const nextSeat = document.querySelector(`[data-keynav][data-index='${index}'][data-section='${section}']`);
        if (nextSeat) {
            nextSeat.click();
        }
    }
  }

  #onJumpToFirstSeat() {
      const focus = document.querySelector("[data-focus]");

      if (focus) {
          const section = focus.dataset.section;
          for (let i = 1; i < this.seats.length + 1; i++) {
              if (this.#setFocusOnSeat(i, `[data-section='${section}']`)) {
                  break;
              }
          }
      }
  }

  #onJumpToFinalSeat() {
      const focus = document.querySelector("[data-focus]");
      if (focus) {
          const section = focus.dataset.section;
          for (let i = this.seats.length; i > 0; i--) {
              if (this.#setFocusOnSeat(i, `[data-section='${section}']`)) {
                  break;
              }
          }
      }
  }

  #onJumpToNextSeatNextRow() {
      const focus = document.querySelector("[data-focus]");
      if (focus) {
          const index = parseInt(focus.dataset.index, 10);
          const section = focus.dataset.section;
          for (let i = (index + this.seatsPerRowLeft + this.seatsPerRowRight);
              i < this.seats.length + 1;
              i += this.seatsPerRowLeft + this.seatsPerRowRight) {
              if (this.#setFocusOnSeat(i, `[data-section='${section}']`)) {
                  break;
              }
          }
      }
  }

  #onJumpToNextSeat() {
      const focus = document.querySelector("[data-focus]");
      if (focus) {
          const section = focus.dataset.section;
          const index = parseInt(focus.dataset.index, 10);
          for (let i = (index + 1); i < this.seats.length + 1; i++) {
              if (this.#setFocusOnSeat(i, `[data-section='${section}']`)) {
                  break;
              }
          }
      }
  }

  #onJumpToPrevSeatPrevRow() {
      const focus = document.querySelector("[data-focus]");
      if (focus) {
          const index = parseInt(focus.dataset.index, 10);
          const exception = this.lastRowNoGap && (index > this.seats.length - this.seatsPerRowRight);
          const section = focus.dataset.section;
          // eslint-disable-next-line max-len
          for (let i = (index - this.seatsPerRowLeft - this.seatsPerRowRight - (exception ? 1 : 0));
              i > 0;
              i -= this.seatsPerRowLeft + this.seatsPerRowRight) {
              if (this.#setFocusOnSeat(i, `[data-section='${section}']`)) {
                  break;
              }
          }
      }
  }

  #onJumpToPrevSeat() {
      const focus = document.querySelector("[data-focus]");
      if (focus) {
          const index = parseInt(focus.dataset.index, 10);
          const section = focus.dataset.section;
          for (let i = (index - 1); i > 0; i--) {
              if (this.#setFocusOnSeat(i, `[data-section='${section}']`)) {
                  break;
              }
          }
      }
  }  

  #manageKeyboardNavigation(evt) {
    //Enter
    if (evt.keyCode === 13 && evt.altKey === false) {
      this.#onSelectSeat(evt);
    }

    // Home
    if (evt.keyCode === 36) {
      this.#onJumpToFirstSeat();
      evt.stopPropagation();
      evt.preventDefault();
    }

    // End
    if (evt.keyCode === 35) {
      this.#onJumpToFinalSeat();
      evt.stopPropagation();
      evt.preventDefault();
    }

    // Arrow down
    if (evt.keyCode === 40) {
      this.#onJumpToNextSeatNextRow();
      evt.stopPropagation();
      evt.preventDefault();
    }

    // Arrow right
    if (evt.keyCode === 39) {
      if (this.enumDir === SeatmapSection.ENUMERATION_DIRECTION.Left) {
          this.#onJumpToNextSeat();
      } else {
          this.#onJumpToPrevSeat();
      }
      evt.stopPropagation();
      evt.preventDefault();
    }

    // Arrow up
    if (evt.keyCode === 38) {
      this.#onJumpToPrevSeatPrevRow();
      evt.stopPropagation();
      evt.preventDefault();
    }

    // Arrow left
    if (evt.keyCode === 37) {
      if (this.enumDir === SeatmapSection.ENUMERATION_DIRECTION.Left) {
          this.#onJumpToPrevSeat();
      } else {
          this.#onJumpToNextSeat();
      }
      evt.stopPropagation();
      evt.preventDefault();
    }

    // Write numbers to focus on a seat
    if ((evt.keyCode >= 48 && evt.keyCode <= 57) || (evt.keyCode >= 96 && evt.keyCode <= 105)) {
      if (this.numPad === "") {
        setTimeout(() => {
          this.#setFocusOnSeatByLabel(this.numPad);
          this.numPad = "";
          this.#showNumPad(this.numPad);
        }, "500");
      }
      this.numPad += evt.key
      this.#showNumPad(this.numPad);
      evt.stopPropagation();
      evt.preventDefault();
    }
  }

  #overlapsWithFixedElement(elements, row, col) {
      return elements.filter((elem) => {
          return (row >= elem.row && row < elem.row + elem.height) &&
              (col >= elem.col && col < elem.col + elem.width);
      });
  }
}

class SeatmapIframe {
  constructor(config) {
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

  drawSeatmapIframe() {
    const seatmapContainer = document.getElementById("seatmapContainer");
    seatmapContainer.innerHTML = "";
    let socketEvents = null;

    const events = [
      {
        elementType: "seat",
        elementStatus: ["available"],
        type: "click",
        cb: (evt, e, seat) => {
          this.seatClickEvent(seat)
        }
      },
      {
        elementType: "seat",
        elementStatus: ["available"],
        type: "mouseover",
        cb: (evt, e, seat) => {
          //this.parentAccess.isOverSeat(seat, { scheduleId: this.scheduleId });
        }
      },
      {
        elementType: "seat",
        elementStatus: ["available"],
        type: "mouseout",
        cb: () => {
          //this.parentAccess.isOutSeat();
        }
      }
    ];

    if (this.accessTicket) {
      socketEvents = {
        scheduleId: this.scheduleId,
        callbacks: {
          seatClicked: this.seatClicked.bind(this),
          seatExpired: this.expiredSeats.bind(this),
          seatmapJoin: this.seatmapJoin.bind(this),
          seatmapSeatSelected: this.seatmapSeatSelected,
          seatmapSeatUnSelected: this.seatmapSeatUnSelected,
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

    this.seatmap.sections.forEach((section, index) => {
      const sectionContainer = document.createElement("div");
      sectionContainer.id = `seatmapContainer-section-${section._id}`;
      sectionContainer.tabIndex = 0;
      sectionContainer.dataset.sectionName = section.name;
      sectionContainer.classList.add("side-panel", "seatmap", "mr4", "relative");
      seatmapContainer.appendChild(sectionContainer);

      const seatmapSection = new SeatmapSection(
        sectionContainer.id,
        section,
        {
          fees: this.seatfees,
          seatClasses: this.seatClasses,
          allowKeyNavStatusList: ["available"],
          events,
          socketEvents
        }
      );
      seatmapSection.draw();
    });

    try {
      if (this.parentAccess.seatmapReady) {
        this.parentAccess.seatmapReady();
      }
    } catch (error) {
      window.parent.postMessage({ eventName: "seatmapReady" }, "*");
    }
  }

  /* Handler incoming events */
  selectSeat(currentSeat) {
    const seat = this.parseSeat(currentSeat);
    SeatmapSection.changeSeatDataProp(seat, "selected", "true");
    SeatmapSocket.pushEvent("seat:selected", { col: parseInt(seat.col, 10), row: parseInt(seat.row, 10), sectionId: seat.sectionId }, currentSeat);
  }

  unSelectSeat(currentSeat) {
    const seat = typeof currentSeat === "string" ? this.parseSeat(currentSeat) : currentSeat;
    const seatId = typeof currentSeat === "string" ? currentSeat : this.getSeatId(currentSeat);
    SeatmapSection.changeSeatDataProp(seat, "selected", "false");
    SeatmapSocket.pushEvent("seat:unselected", { col: parseInt(seat.col, 10), row: parseInt(seat.row, 10), sectionId: seat.sectionId }, seatId);
  }

  /* Events from section */
  seatClicked(seat) {
    this.seatClickEvent(seat);
  }

  /* Expose events outside the iframe */
  seatClickEvent(seat) {
    try {
      // expose event outside iframe from same domain
      if (this.parentAccess.addSeatToSelection) {
        this.parentAccess.addSeatToSelection(
          Object.assign(seat, { sectionName: seat.sectionName }),
          { scheduleId: this.scheduleId }
        );
      } else if (this.parentAccess.addSeatToSelectionNew) {
        this.parentAccess.addSeatToSelectionNew(
          Object.assign(seat, { sectionName: seat.sectionName }),
          { scheduleId: this.scheduleId }
        );
      }
    } catch (error) {
      // expose event outside iframe from other domain
      var data = {
        eventName: "addSeatToSelectionNew",
        //keeps compatibility with old seatmaps implementation
        seatLocationObject: {...seat, seatNumber: seat.label},
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
  seatmapSeatUnSelected(seat) {
    SeatmapSection.changeSeatStatus(seat, "available");
    SeatmapSection.changeSeatDataProp(seat, "keynav", "true");
  }

  seatmapSeatSelected(seat) {
    SeatmapSection.changeSeatStatus(seat, "blocked");
  }

  seatmapJoin(seats = []) {
    (seats).forEach((s) => {
      SeatmapSection.changeSeatStatus(s.seat, "blocked");
    });
  }

  expiredSeats(seats = []) {
    seats.forEach((seat) => {
      seat.seat_id = this.getSeatId(seat);
      SeatmapSection.changeSeatDataProp(seat, "selected", "false");
      SeatmapSection.changeSeatStatus(seat, "available");
    });
    try {
      this.parentAccess.expiredSeats(seats)
    } catch(error) {
      var data = {
        eventName: "expiredSeats",
        expired: seats
      };

      window.parent.postMessage(data, "*");
    }
  }

  /* Helpers */
  getSeatId(seat) {
    return `section-${seat.sectionId}-row-${seat.row}-seat-${seat.col}`;
  }

  parseSeat(seatId) {
    const properties = seatId.split('-');
    const sectionId = properties[1];
    const row = properties[3];
    const col = properties[5];
    return { row, col, sectionId };
  }
}

try {
  module.exports = {
    SeatmapSection,
    SeatmapIframe
  };
} catch (e) {
}