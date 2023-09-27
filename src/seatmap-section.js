// 👇️ named export
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
        fee: "Fee"
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
    settings = {}
  ) {
    this.containerId = containerId;
    this.availableRows = section.availableRows || 15;
    this.seatsPerRowLeft = typeof(section.seatsPerRowLeft) !== "undefined" ? section.seatsPerRowLeft : 2;
    this.seatsPerRowRight = typeof(section.seatsPerRowRight) !== "undefined" ? section.seatsPerRowRight : 2;
    this.rowsEnumNoGaps = section.rowsEnumNoGaps;
    this.elements = section.elements || [];
    this.seats = section.seats || [];
    this.seatsWithStatus = section.seatsWithStatus || [];
    this.enumType = section.enumType || SeatmapSection.ENUMERATION_TYPES.Sequencial;
    this.enumDir = section.enumDir || SeatmapSection.ENUMERATION_TYPES.Left,
    this.startingSeatLabel = section.startingSeatLabel || 1,
    this.rowLabelType = section.rowLabelType || SeatmapSection.LABEL_TYPES.Number;
    this.seatLabelType = section.seatLabelType || SeatmapSection.LABEL_TYPES.Number;
    this.startingRowLabel = section.startingRowLabel || 1;
    this.showRowLabels = section.showRowLabels;
    this.lastRowNoGap = section.lastRowNoGap;
    this.sectionName = section.name || "Main section";
    this.capacity = section.capacity || 60;
    this.rowLabelRange = section.rowLabelRange;
    this.events = settings.events || [];
    this.classes = settings.classes || SeatmapSection.CLASSES;
    this.labels = settings.labels || SeatmapSection.LABELS;
    this.seatClasses = settings.seatClasses || [];
    this.fees = settings.fees || [];

    this.#setSeatmap();
  }

  changeSeatStatus(elem, status) {
    const selector = `[style*='grid-area: ${elem.row} / ${elem.col} / ${elem.row + elem.height} / ${elem.col + elem.width};']`;
    const element = document.querySelector(selector);
    element.dataset.status = status;
  }

  clearFocus() {
    const focus = document.querySelector("[data-focus]");
    if (focus) {
        delete focus.dataset.focus;
    }    
  }

  clearSelection() {
    const selection = document.querySelectorAll(`#${this.containerId} .seatmap-outline-blue`);
    selection.forEach((prev) => prev.classList.remove("seatmap-outline-blue"));
  }

  draw() {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.onkeydown = (evt) => { this.#manageKeyboardNavigation(evt); };

      container.style.setProperty("--columns", this.availableCols);
      container.style.setProperty("--rows", this.availableRows);
      container.innerHTML = "";

      const sectionNameWrapper = this.#createHTMLElement("div", "absolute, bottom-0, right-0, left-0, center, mbn3, z2");
      const sectionNameContainer = this.#createHTMLElement("div", "bg-info, uppercase, fs6, color-info-lightest, box-shadow-black-10, border, border-info-light, inline-block, rounded-max, px2, line-height-4", this.sectionName);
      sectionNameWrapper.appendChild(sectionNameContainer);
      container.appendChild(sectionNameWrapper);

      [
        ...this.corridor,
        ...this.elements,
        ...this.seats
      ].forEach((elem) => {
        const classes = this.#getElementClasses(elem);
        const e = this.#createHTMLElement("div", classes, elem.label || "");
        const dataset = this.#getSeatDataset(elem);
        Object.keys(dataset).forEach((k) => {
          e.dataset[k] = dataset[k];
        });


        if (elem.type === "seat") {
          e.title = this.#getSeatTitle(elem, this.sectionName, this.labels);
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
        if (this.#setFocusOnSeat(i)) {
            break;
        }
    }
  }  

  focusElement(elem) {
    this.clearFocus();
    document.querySelector(`[data-index='${elem.index}']`).dataset.focus = true;
  }

  getCapacity() {
    return (this.seats || []).filter((s) => !s.overlapped && s.allowKeyNav && s.status !== "blocked").length;;
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

    this.elements.forEach((ele) => {
        if (ele.type === "driver") {
            // eslint-disable-next-line no-param-reassign
            ele.width = this.availableCols;
            filteredElements.push(ele);
        } else if (ele.type === "door") {
            filteredElements.push(ele);
        } else if ((this.availableCols + 1) >= ele.col + ele.width) {
            filteredElements.push(ele);
        }
    });
    // eslint-disable-next-line no-param-reassign
    this.elements = filteredElements;
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

    const driver = this.elements.find((elem) => elem.type === "driver");
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
            classes: SeatmapSection.CLASSES.corridor,
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
            const overlaps = this.#overlapsWithFixedElement([...this.elements, ...this.corridor], rIndex + 1, cIndex + 1);
            const hideSeat = overlaps.find((o) => {
                return ["driver", "corridor"].includes(o.type);
            });
            const overlapsItem = overlaps.find((o) => {
                return ["item"].includes(o.type);
            });
            if (!hideSeat) {
                const colNumber = cIndex + 1;
                const rowNumber = rIndex + 1;
                const seatWithStatus = this.seatsWithStatus.find((st) => {
                    return st.col === colNumber && st.row === rowNumber;
                });
                // eslint-disable-next-line no-unneeded-ternary
                const allowKeyNav = ["selected", "available", "accessible", "blocked", "reserved"]
                    .includes(seatWithStatus ? seatWithStatus.status : "available") &&
                    (!overlaps.length || overlapsItem) ? true : false;

                const rowLabel = this.#getSeatRowLabel(rowNumber);
                const label = seatWithStatus ? seatWithStatus.label : "";
                const status = seatWithStatus ? seatWithStatus.status : "available";
                const seat = {
                  type: "seat",
                  classes: SeatmapSection.CLASSES.seat,
                  row: rowNumber,
                  col: colNumber,
                  height: 1,
                  width: 1,
                  rowLabel,
                  status,
                  label,
                  allowKeyNav,
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
      return SeatmapSection.CLASSES.table;
    }
    if (elem.type === "wc") {
      return SeatmapSection.CLASSES.wc;
    }
    if (elem.type === "item") {
      return SeatmapSection.CLASSES.item;
    }
    if (elem.type === "gap") {
      return SeatmapSection.CLASSES.gap;
    }
    if (elem.type === "driver") {
      return elem.alignment.key === SeatmapSection.FACILITY_ALIGNMENT.Left ?
        SeatmapSection.CLASSES.driverLeft :
        SeatmapSection.CLASSES.driverRight;
    }
    if (elem.type === "door") {
      return elem.alignment.key === SeatmapSection.FACILITY_ALIGNMENT.Left ?
        SeatmapSection.CLASSES.doorLeft :
        SeatmapSection.CLASSES.doorRight;
    }
    if (elem.type === "stairway") {
      return elem.orientation.key === SeatmapSection.FACILITY_ORIENTATION.Horizontal ?
        SeatmapSection.CLASSES.stairwayHorizontal :
        SeatmapSection.CLASSES.stairwayVertical;
    }
    if (elem.type === "accordion") {
      return elem.position.key === SeatmapSection.FACILITY_POSITION.Bottom ?
        SeatmapSection.CLASSES.accordionBottom :
        SeatmapSection.CLASSES.accordionTop;
    }

    return elem.classes || "";
  }

  #getSeatDataset(elem) {
    const dataset = {};
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
      seatRowLabel = (seatRow.label || seatRow.alternativeLabel);
      seatRowLabel = !this.showRowLabels || this.rowLabelType === SeatmapSection.LABEL_TYPES.Number ?
        parseInt(seatRowLabel, 10) + 1 :
        String.fromCharCode(seatRowLabel.charCodeAt(0) + 1);
    }
    return seatRowLabel;
  }

  #getSeatTitle(elem, sectionName, labels) {
    const seat = elem.label ? `${labels.seat}: ${elem.label} \n` : "";
    const row = elem.rowLabel ? `${labels.row}: ${elem.rowLabel} \n` : "";
    const status = `${labels.status}: ${elem.status.charAt(0).toUpperCase()}${elem.status.slice(1)} \n`;
    const section = `${labels.section}: ${sectionName} \n`;

    const seatClass = this.seatClasses.find((sc) => sc._id === elem.seatClass);
    const seatClassName = seatClass && seatClass.value ? `${labels.seatClass}: ${seatClass.value} \n` : "";
    const fee = this.fees.find((fee) => fee._id === elem.fee);
    const feeName = fee && fee.value ? `${labels.fee}: ${fee.value} \n` : "";

    return `${section}${row}${seat}${status}${seatClassName}${feeName}`;
  }

  #setElementStyle(style, elem) {
    style["grid-area"] = `${elem.row}/${elem.col}/${elem.row + elem.height}/${elem.col + elem.width}`;
    if (elem.bgcolor) {
      style.backgroundColor = elem.bgcolor;
    }
    if (elem.color) {
      style.color = elem.color;
    }
    if (elem.seatClass && this.seatClasses) {
      const seatClass = this.seatClasses.find((sc) => sc._id === elem.seatClass);
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
      const fee = this.fees.find((fee) => fee._id === elem.fee);
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

  #setFocusOnSeat(index) {
      const focus = document.querySelector("[data-focus]");
      const nextSeat = document.querySelector(`[data-keynav][data-index='${index}']`);
      if (nextSeat) {
          if (focus) {
            delete focus.dataset.focus;  
          }
          
          nextSeat.dataset.focus = true;
          return true;
      }
      return false;
  }  

  #onSelectSeat(evt) {
    const focus = document.querySelector("[data-focus]");

    if (focus) {
        const index = parseInt(focus.dataset.index, 10);
        const nextSeat = document.querySelector(`[data-keynav][data-index='${index}']`);
        if (nextSeat) {
            nextSeat.click();
        }
    }
  }

  #onJumpToFirstSeat() {
      const focus = document.querySelector("[data-focus]");

      if (focus) {
          for (let i = 1; i < this.seats.length + 1; i++) {
              if (this.#setFocusOnSeat(i)) {
                  break;
              }
          }
      }
  }

  #onJumpToFinalSeat() {
      const focus = document.querySelector("[data-focus]");
      if (focus) {
          for (let i = this.seats.length; i > 0; i--) {
              if (this.#setFocusOnSeat(i)) {
                  break;
              }
          }
      }
  }

  #onJumpToNextSeatNextRow() {
      const focus = document.querySelector("[data-focus]");
      if (focus) {
          const index = parseInt(focus.dataset.index, 10);
          for (let i = (index + this.seatsPerRowLeft + this.seatsPerRowRight);
              i < this.seats.length + 1;
              i += this.seatsPerRowLeft + this.seatsPerRowRight) {
              if (this.#setFocusOnSeat(i)) {
                  break;
              }
          }
      }
  }

  #onJumpToNextSeat() {
      const focus = document.querySelector("[data-focus]");
      if (focus) {
          const index = parseInt(focus.dataset.index, 10);
          for (let i = (index + 1); i < this.seats.length + 1; i++) {
              if (this.#setFocusOnSeat(i)) {
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

          // eslint-disable-next-line max-len
          for (let i = (index - this.seatsPerRowLeft - this.seatsPerRowRight - (exception ? 1 : 0));
              i > 0;
              i -= this.seatsPerRowLeft + this.seatsPerRowRight) {
              if (this.#setFocusOnSeat(i)) {
                  break;
              }
          }
      }
  }

  #onJumpToPrevSeat() {
      const focus = document.querySelector("[data-focus]");
      if (focus) {
          const index = parseInt(focus.dataset.index, 10);
          for (let i = (index - 1); i > 0; i--) {
              if (this.#setFocusOnSeat(i)) {
                  break;
              }
          }
      }
  }  

  #manageKeyboardNavigation(evt) {
    if (evt.keyCode === 13) {
        this.#onSelectSeat(evt);
    }

    // Home
    if (evt.keyCode === 36) {
        this.#onJumpToFirstSeat();
    }

    // End
    if (evt.keyCode === 35) {
        this.#onJumpToFinalSeat();
    }

    // Arrow down
    if (evt.keyCode === 40) {
        this.#onJumpToNextSeatNextRow();
    }

    // Arrow right
    if (evt.keyCode === 39) {
        if (this.enumDir === SeatmapSection.ENUMERATION_DIRECTION.Left) {
            this.#onJumpToNextSeat();
        } else {
            this.#onJumpToPrevSeat();
        }
    }

    // Arrow up
    if (evt.keyCode === 38) {
        this.#onJumpToPrevSeatPrevRow();
    }

    // Arrow left
    if (evt.keyCode === 37) {
        if (this.enumDir === SeatmapSection.ENUMERATION_DIRECTION.Left) {
            this.#onJumpToPrevSeat();
        } else {
            this.#onJumpToNextSeat();
        }
    }
  }

  #overlapsWithFixedElement(elements, row, col) {
      return elements.filter((elem) => {
          return (row >= elem.row && row < elem.row + elem.height) &&
              (col >= elem.col && col < elem.col + elem.width);
      });
  }
}

try {
  module.exports = SeatmapSection;
} catch (e) {
}