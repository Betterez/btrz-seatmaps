"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _class;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var _updateFacilities = /*#__PURE__*/new WeakSet();
var _buildCorridor = /*#__PURE__*/new WeakSet();
var _buildSeats = /*#__PURE__*/new WeakSet();
var _enumerateSeats = /*#__PURE__*/new WeakSet();
var _setSeatmap = /*#__PURE__*/new WeakSet();
var _createHTMLElement = /*#__PURE__*/new WeakSet();
var _getSeatDataset = /*#__PURE__*/new WeakSet();
var _getSeatRowLabel = /*#__PURE__*/new WeakSet();
var _getSeatTitle = /*#__PURE__*/new WeakSet();
var _setElementStyle = /*#__PURE__*/new WeakSet();
var _setFocusOnSeat = /*#__PURE__*/new WeakSet();
var _onSelectSeat = /*#__PURE__*/new WeakSet();
var _onJumpToFirstSeat = /*#__PURE__*/new WeakSet();
var _onJumpToFinalSeat = /*#__PURE__*/new WeakSet();
var _onJumpToNextSeatNextRow = /*#__PURE__*/new WeakSet();
var _onJumpToNextSeat = /*#__PURE__*/new WeakSet();
var _onJumpToPrevSeatPrevRow = /*#__PURE__*/new WeakSet();
var _onJumpToPrevSeat = /*#__PURE__*/new WeakSet();
var _manageKeyboardNavigation = /*#__PURE__*/new WeakSet();
var _overlapsWithFixedElement = /*#__PURE__*/new WeakSet();
// 👇️ named export
var SeatmapSection = /*#__PURE__*/function () {
  function SeatmapSection() {
    var containerId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var _section = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classPrivateMethodInitSpec(this, _overlapsWithFixedElement);
    _classPrivateMethodInitSpec(this, _manageKeyboardNavigation);
    _classPrivateMethodInitSpec(this, _onJumpToPrevSeat);
    _classPrivateMethodInitSpec(this, _onJumpToPrevSeatPrevRow);
    _classPrivateMethodInitSpec(this, _onJumpToNextSeat);
    _classPrivateMethodInitSpec(this, _onJumpToNextSeatNextRow);
    _classPrivateMethodInitSpec(this, _onJumpToFinalSeat);
    _classPrivateMethodInitSpec(this, _onJumpToFirstSeat);
    _classPrivateMethodInitSpec(this, _onSelectSeat);
    _classPrivateMethodInitSpec(this, _setFocusOnSeat);
    _classPrivateMethodInitSpec(this, _setElementStyle);
    _classPrivateMethodInitSpec(this, _getSeatTitle);
    _classPrivateMethodInitSpec(this, _getSeatRowLabel);
    _classPrivateMethodInitSpec(this, _getSeatDataset);
    _classPrivateMethodInitSpec(this, _createHTMLElement);
    _classPrivateMethodInitSpec(this, _setSeatmap);
    _classPrivateMethodInitSpec(this, _enumerateSeats);
    _classPrivateMethodInitSpec(this, _buildSeats);
    _classPrivateMethodInitSpec(this, _buildCorridor);
    _classPrivateMethodInitSpec(this, _updateFacilities);
    this.containerId = containerId;
    typeof settings.name !== "undefined" ? 1 : 2;
    this.availableRows = _section.availableRows || 15;
    this.seatsPerRowLeft = typeof _section.seatsPerRowLeft !== "undefined" ? _section.seatsPerRowLeft : 2;
    this.seatsPerRowRight = typeof _section.seatsPerRowRight !== "undefined" ? _section.seatsPerRowRight : 2;
    this.rowsEnumNoGaps = _section.rowsEnumNoGaps;
    this.elements = _section.elements || [];
    this.seats = _section.seats || [];
    this.seatsWithStatus = _section.seatsWithStatus || [];
    this.enumType = _section.enumType || SeatmapSection.ENUMERATION_TYPES.Sequencial;
    this.enumDir = _section.enumDir || SeatmapSection.ENUMERATION_TYPES.Left, this.startingSeatLabel = _section.startingSeatLabel || 1, this.rowLabelType = _section.rowLabelType || SeatmapSection.LABEL_TYPES.Number;
    this.seatLabelType = _section.seatLabelType || SeatmapSection.LABEL_TYPES.Number;
    this.startingRowLabel = _section.startingRowLabel || 1;
    this.showRowLabels = _section.showRowLabels;
    this.lastRowNoGap = _section.lastRowNoGap;
    this.sectionName = _section.name || "Main section";
    this.capacity = _section.capacity || 60;
    this.rowLabelRange = _section.rowLabelRange;
    this.events = settings.events || [];
    this.classes = settings.classes || SeatmapSection.CLASSES;
    this.labels = settings.labels || SeatmapSection.LABELS;
    this.seatClasses = settings.seatClasses || [];
    this.fees = settings.fees || [];
    _classPrivateMethodGet(this, _setSeatmap, _setSeatmap2).call(this);
  }
  _createClass(SeatmapSection, [{
    key: "clearFocus",
    value: function clearFocus() {
      var focus = document.querySelector("[data-focus]");
      if (focus) {
        delete focus.dataset.focus;
      }
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      var selection = document.querySelectorAll("#".concat(this.containerId, " .outline-blue"));
      selection.forEach(function (prev) {
        return prev.classList.remove("outline-blue");
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;
      var container = document.getElementById(this.containerId);
      if (container) {
        container.onkeydown = function (evt) {
          _classPrivateMethodGet(_this, _manageKeyboardNavigation, _manageKeyboardNavigation2).call(_this, evt);
        };
        container.style.setProperty("--columns", this.availableCols);
        container.style.setProperty("grid-template-rows", "repeat(".concat(this.availableRows, ", var(--seat))"));
        container.innerHTML = "";
        var sectionNameWrapper = _classPrivateMethodGet(this, _createHTMLElement, _createHTMLElement2).call(this, "div", "absolute, bottom-0, right-0, left-0, center, mbn3, z2");
        var sectionNameContainer = _classPrivateMethodGet(this, _createHTMLElement, _createHTMLElement2).call(this, "div", "bg-info, uppercase, fs6, color-info-lightest, box-shadow-black-10, border, border-info-light, inline-block, rounded-max, px2, line-height-4", this.sectionName);
        sectionNameWrapper.appendChild(sectionNameContainer);
        container.appendChild(sectionNameWrapper);
        [].concat(_toConsumableArray(this.corridor), _toConsumableArray(this.elements), _toConsumableArray(this.seats)).forEach(function (elem) {
          var e = _classPrivateMethodGet(_this, _createHTMLElement, _createHTMLElement2).call(_this, "div", elem.classes, elem.label || "");
          var dataset = _classPrivateMethodGet(_this, _getSeatDataset, _getSeatDataset2).call(_this, elem);
          Object.keys(dataset).forEach(function (k) {
            e.dataset[k] = dataset[k];
          });
          if (elem.type === "seat") {
            e.title = _classPrivateMethodGet(_this, _getSeatTitle, _getSeatTitle2).call(_this, elem, _this.sectionName, _this.labels);
          }
          _classPrivateMethodGet(_this, _setElementStyle, _setElementStyle2).call(_this, e.style, elem);
          _this.events.forEach(function (evt) {
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
        if (_classPrivateMethodGet(this, _setFocusOnSeat, _setFocusOnSeat2).call(this, i)) {
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
    key: "getCapacity",
    value: function getCapacity() {
      return (this.seats || []).filter(function (s) {
        return !s.overlapped && s.allowKeyNav && s.status !== "blocked";
      }).length;
      ;
    }
  }, {
    key: "selectElement",
    value: function selectElement(elem) {
      var selector = "[style*='grid-area: ".concat(elem.row, " / ").concat(elem.col, " / ").concat(elem.row + elem.height, " / ").concat(elem.col + elem.width, ";']");
      var element = document.querySelector(selector);
      element.classList.add("outline-blue");
    }
  }], [{
    key: "CLASSES",
    get: function get() {
      return {
        item: "element",
        corridor: "fs7, flex, items-center, justify-around",
        wc: "wc",
        seat: "grid-item",
        stairway: "stairway",
        table: "busTable",
        door: "door",
        doorLeft: "leftDoor",
        driver: "driver",
        rightdriver: "driver, rightdriver",
        gap: "gap",
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
        fee: "Fee"
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
  }]);
  return SeatmapSection;
}();
_class = SeatmapSection;
function _updateFacilities2() {
  var _this2 = this;
  var filteredElements = [];
  // eslint-disable-next-line no-param-reassign
  this.availableCols = this.seatsPerRowLeft + this.seatsPerRowRight + 1;
  this.elements.forEach(function (ele) {
    if (ele.type === "driver") {
      // eslint-disable-next-line no-param-reassign
      ele.width = _this2.availableCols;
      filteredElements.push(ele);
    } else if (ele.type === "door") {
      filteredElements.push(ele);
    } else if (_this2.availableCols + 1 >= ele.col + ele.width) {
      filteredElements.push(ele);
    }
  });
  // eslint-disable-next-line no-param-reassign
  this.elements = filteredElements;
}
function _buildCorridor2() {
  var _this3 = this;
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
  var driver = this.elements.find(function (elem) {
    return elem.type === "driver";
  });
  var startingRowPosition = driver ? 2 : 1;
  var rows = [];
  rows = Array.from({
    length: this.availableRows - (this.lastRowNoGap ? 1 : 0) - (driver ? 1 : 0)
  });
  var nextRowValue = this.startingRowLabel;
  rows.forEach(function (row, rIndex) {
    var showLabel = _this3.showRowLabels && (!rowsWithoutLabels.length || !rowsWithoutLabels.includes(rIndex + 1));
    _this3.corridor.push({
      row: rIndex + startingRowPosition,
      col: _this3.seatsPerRowLeft + 1,
      height: 1,
      width: 1,
      type: "corridor",
      classes: _class.CLASSES.corridor,
      label: showLabel ? nextRowValue : undefined,
      alternativeLabel: _this3.rowLabelType === _class.LABEL_TYPES.Number ? rIndex + 1 : String.fromCharCode(96 + rIndex + 1).toUpperCase()
    });
    if (showLabel || !_this3.rowsEnumNoGaps) {
      nextRowValue = _this3.rowLabelType === _class.LABEL_TYPES.Number ? parseInt(nextRowValue, 10) + 1 : String.fromCharCode(nextRowValue.charCodeAt(0) + 1);
    }
  });
}
function _buildSeats2() {
  var _this4 = this;
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
      var overlaps = _classPrivateMethodGet(_this4, _overlapsWithFixedElement, _overlapsWithFixedElement2).call(_this4, [].concat(_toConsumableArray(_this4.elements), _toConsumableArray(_this4.corridor)), rIndex + 1, cIndex + 1);
      var hideSeat = overlaps.find(function (o) {
        return ["driver", "corridor"].includes(o.type);
      });
      var overlapsItem = overlaps.find(function (o) {
        return ["item"].includes(o.type);
      });
      if (!hideSeat) {
        var colNumber = cIndex + 1;
        var rowNumber = rIndex + 1;
        var seatWithStatus = _this4.seatsWithStatus.find(function (st) {
          return st.col === colNumber && st.row === rowNumber;
        });
        // eslint-disable-next-line no-unneeded-ternary
        var allowKeyNav = ["selected", "available", "accessible", "blocked", "reserved"].includes(seatWithStatus ? seatWithStatus.status : "available") && (!overlaps.length || overlapsItem) ? true : false;
        var rowLabel = _classPrivateMethodGet(_this4, _getSeatRowLabel, _getSeatRowLabel2).call(_this4, rowNumber);
        var label = seatWithStatus ? seatWithStatus.label : "";
        var status = seatWithStatus ? seatWithStatus.status : "available";
        var seat = {
          type: "seat",
          classes: _class.CLASSES.seat,
          row: rowNumber,
          col: colNumber,
          height: 1,
          width: 1,
          rowLabel: rowLabel,
          status: status,
          label: label,
          allowKeyNav: allowKeyNav,
          overlapped: overlaps.length && !overlapsItem ? true : false
        };
        if (seatWithStatus && seatWithStatus.seatClass) {
          seat.seatClass = seatWithStatus.seatClass;
        }
        if (seatWithStatus && seatWithStatus.fee) {
          seat.fee = seatWithStatus.fee;
        }
        if (seatWithStatus && seatWithStatus.suggested) {
          seat.suggested = seatWithStatus.suggested;
        }
        if (seatWithStatus && seatWithStatus.female) {
          seat.female = seatWithStatus.female;
        }
        _this4.seats.push(seat);
      }
    });
  });
}
function _enumerateSeats2(section) {
  var _this5 = this;
  var rows = Array.from({
    length: this.availableRows
  });
  var seatLabel = this.startingSeatLabel;
  var rowNumber = 1;
  var seatIndex = 1;
  rows.forEach(function (row, rIndex) {
    _this5.seats.filter(function (s) {
      return s.row === rIndex + 1;
    }).sort(function (a, b) {
      return _this5.enumDir === _class.ENUMERATION_DIRECTION.Left ? a.col - b.col : b.col - a.col;
    }).forEach(function (s, index) {
      if (_this5.enumType === _class.ENUMERATION_TYPES.PerRow) {
        if (rowNumber !== s.row) {
          seatLabel = _this5.startingSeatLabel;
          rowNumber++;
        }
      }
      s.label = s.label || seatLabel;
      s.index = seatIndex;
      seatLabel = _this5.seatLabelType === _class.LABEL_TYPES.Number ? parseInt(seatLabel, 10) + 1 : String.fromCharCode(seatLabel.charCodeAt(0) + 1);
      seatIndex++;
    });
  });
}
function _setSeatmap2() {
  _classPrivateMethodGet(this, _updateFacilities, _updateFacilities2).call(this);
  _classPrivateMethodGet(this, _buildCorridor, _buildCorridor2).call(this);
  _classPrivateMethodGet(this, _buildSeats, _buildSeats2).call(this);
  _classPrivateMethodGet(this, _enumerateSeats, _enumerateSeats2).call(this);
}
function _createHTMLElement2(tag) {
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
function _getSeatDataset2(elem) {
  var dataset = {};
  dataset.type = elem.type;
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
  return dataset;
}
function _getSeatRowLabel2(rowNumber) {
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
    seatRowLabel = seatRow.label || seatRow.alternativeLabel;
    seatRowLabel = !this.showRowLabels || this.rowLabelType === _class.LABEL_TYPES.Number ? parseInt(seatRowLabel, 10) + 1 : String.fromCharCode(seatRowLabel.charCodeAt(0) + 1);
  }
  return seatRowLabel;
}
function _getSeatTitle2(elem, sectionName, labels) {
  var seat = elem.label ? "".concat(labels.seat, ": ").concat(elem.label) : "";
  var row = elem.rowLabel ? "".concat(labels.row, ": ").concat(elem.rowLabel) : "";
  var status = "".concat(labels.status, ": ").concat(elem.status.charAt(0).toUpperCase()).concat(elem.status.slice(1));
  var section = "".concat(labels.section, ": ").concat(sectionName);
  var seatClass = this.seatClasses.find(function (sc) {
    return sc._id === elem.seatClass;
  });
  var seatClassName = seatClass && seatClass.value ? " - ".concat(labels.seatClass, ": ").concat(seatClass.value) : "";
  var fee = this.fees.find(function (fee) {
    return fee._id === elem.fee;
  });
  var feeName = fee && fee.value ? " - ".concat(labels.fee, ": ").concat(fee.value) : "";
  return "".concat(section, " - ").concat(row, " - ").concat(seat, " - ").concat(status).concat(seatClassName).concat(feeName);
}
function _setElementStyle2(style, elem) {
  style["grid-area"] = "".concat(elem.row, "/").concat(elem.col, "/").concat(elem.row + elem.height, "/").concat(elem.col + elem.width);
  if (elem.bgcolor) {
    style.backgroundColor = elem.bgcolor;
  }
  if (elem.color) {
    style.color = elem.color;
  }
  if (elem.seatClass && this.seatClasses) {
    var seatClass = this.seatClasses.find(function (sc) {
      return sc._id === elem.seatClass;
    });
    if (seatClass) {
      if (seatClass.bgcolor) {
        style.backgroundColor = seatClass.bgcolor;
      }
      if (seatClass.color) {
        style.color = seatClass.color;
      }
      if (seatClass.bordercolor) {
        style["border-color"] = seatClass.bordercolor;
      }
    }
  }
  if (elem.fee && this.fees) {
    var fee = this.fees.find(function (fee) {
      return fee._id === elem.fee;
    });
    if (fee) {
      if (fee.bgcolor) {
        style.backgroundColor = fee.bgcolor;
      }
      if (fee.color) {
        style.color = fee.color;
      }
      if (fee.bordercolor) {
        style["border-color"] = fee.bordercolor;
      }
    }
  }
}
function _setFocusOnSeat2(index) {
  var focus = document.querySelector("[data-focus]");
  var nextSeat = document.querySelector("[data-keynav][data-index='".concat(index, "']"));
  if (nextSeat) {
    if (focus) {
      delete focus.dataset.focus;
    }
    nextSeat.dataset.focus = true;
    return true;
  }
  return false;
}
function _onSelectSeat2(evt) {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var index = parseInt(focus.dataset.index, 10);
    var nextSeat = document.querySelector("[data-keynav][data-index='".concat(index, "']"));
    if (nextSeat) {
      nextSeat.click();
    }
  }
}
function _onJumpToFirstSeat2() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    for (var i = 1; i < this.seats.length + 1; i++) {
      if (_classPrivateMethodGet(this, _setFocusOnSeat, _setFocusOnSeat2).call(this, i)) {
        break;
      }
    }
  }
}
function _onJumpToFinalSeat2() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    for (var i = this.seats.length; i > 0; i--) {
      if (_classPrivateMethodGet(this, _setFocusOnSeat, _setFocusOnSeat2).call(this, i)) {
        break;
      }
    }
  }
}
function _onJumpToNextSeatNextRow2() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var index = parseInt(focus.dataset.index, 10);
    for (var i = index + this.seatsPerRowLeft + this.seatsPerRowRight; i < this.seats.length + 1; i += this.seatsPerRowLeft + this.seatsPerRowRight) {
      if (_classPrivateMethodGet(this, _setFocusOnSeat, _setFocusOnSeat2).call(this, i)) {
        break;
      }
    }
  }
}
function _onJumpToNextSeat2() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var index = parseInt(focus.dataset.index, 10);
    for (var i = index + 1; i < this.seats.length + 1; i++) {
      if (_classPrivateMethodGet(this, _setFocusOnSeat, _setFocusOnSeat2).call(this, i)) {
        break;
      }
    }
  }
}
function _onJumpToPrevSeatPrevRow2() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var index = parseInt(focus.dataset.index, 10);
    var exception = this.lastRowNoGap && index > this.seats.length - this.seatsPerRowRight;

    // eslint-disable-next-line max-len
    for (var i = index - this.seatsPerRowLeft - this.seatsPerRowRight - (exception ? 1 : 0); i > 0; i -= this.seatsPerRowLeft + this.seatsPerRowRight) {
      if (_classPrivateMethodGet(this, _setFocusOnSeat, _setFocusOnSeat2).call(this, i)) {
        break;
      }
    }
  }
}
function _onJumpToPrevSeat2() {
  var focus = document.querySelector("[data-focus]");
  if (focus) {
    var index = parseInt(focus.dataset.index, 10);
    for (var i = index - 1; i > 0; i--) {
      if (_classPrivateMethodGet(this, _setFocusOnSeat, _setFocusOnSeat2).call(this, i)) {
        break;
      }
    }
  }
}
function _manageKeyboardNavigation2(evt) {
  if (evt.keyCode === 13) {
    _classPrivateMethodGet(this, _onSelectSeat, _onSelectSeat2).call(this, evt);
  }

  // Home
  if (evt.keyCode === 36) {
    _classPrivateMethodGet(this, _onJumpToFirstSeat, _onJumpToFirstSeat2).call(this);
  }

  // End
  if (evt.keyCode === 35) {
    _classPrivateMethodGet(this, _onJumpToFinalSeat, _onJumpToFinalSeat2).call(this);
  }

  // Arrow down
  if (evt.keyCode === 40) {
    _classPrivateMethodGet(this, _onJumpToNextSeatNextRow, _onJumpToNextSeatNextRow2).call(this);
  }

  // Arrow right
  if (evt.keyCode === 39) {
    if (this.enumDir === _class.ENUMERATION_DIRECTION.Left) {
      _classPrivateMethodGet(this, _onJumpToNextSeat, _onJumpToNextSeat2).call(this);
    } else {
      _classPrivateMethodGet(this, _onJumpToPrevSeat, _onJumpToPrevSeat2).call(this);
    }
  }

  // Arrow up
  if (evt.keyCode === 38) {
    _classPrivateMethodGet(this, _onJumpToPrevSeatPrevRow, _onJumpToPrevSeatPrevRow2).call(this);
  }

  // Arrow left
  if (evt.keyCode === 37) {
    if (this.enumDir === _class.ENUMERATION_DIRECTION.Left) {
      _classPrivateMethodGet(this, _onJumpToPrevSeat, _onJumpToPrevSeat2).call(this);
    } else {
      _classPrivateMethodGet(this, _onJumpToNextSeat, _onJumpToNextSeat2).call(this);
    }
  }
}
function _overlapsWithFixedElement2(elements, row, col) {
  return elements.filter(function (elem) {
    return row >= elem.row && row < elem.row + elem.height && col >= elem.col && col < elem.col + elem.width;
  });
}
try {
  module.exports = SeatmapSection;
} catch (e) {}