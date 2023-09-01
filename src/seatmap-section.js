// 👇️ named export
class SeatmapSection {
  static get CLASSES () {
    return {
        item: "element",
        corridor: "fs7, flex, items-center, justify-around",
        wc: "wc",
        seat: "grid-item",
        stairway: "stairway",
        table: "table",
        door: "door",
        doorLeft: "leftDoor",
        driver: "driver",
        rightdriver: "driver, rightdriver",
        gap: "gap",
        accordionBottom: "accordion-bottom",
        accordionTop: "accordion-top"    
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

  constructor(containerId, section, events = [], classes = SeatmapSection.CLASSES) {
    this.containerId = containerId;
    
    this.availableCols = section.availableCols || 5;
    this.availableRows = section.availableRows || 15;
    
    this.seatsPerRowLeft = section.seatsPerRowLeft;   
    this.numberOfSeatsPerRowLeft = 2;
    if (typeof section.seatsPerRowLeft !== "undefined") {
      this.numberOfSeatsPerRowLeft = typeof section.seatsPerRowLeft.key !== "undefined" ?
        parseInt(section.seatsPerRowLeft.key, 10) :
        parseInt(section.seatsPerRowLeft, 10); 
    }
    
    this.seatsPerRowRight = section.seatsPerRowRight;
    this.numberOfSeatsPerRowRight = 2;
    if (typeof section.seatsPerRowRight !== "undefined") {
      this.numberOfSeatsPerRowRight = typeof section.seatsPerRowRight.key !== "undefined" ?
        parseInt(section.seatsPerRowRight.key, 10) :
        parseInt(section.seatsPerRowRight, 10); 
    }

    this.rowsEnumNoGaps = section.rowsEnumNoGaps;
    this.elements = section.elements || [];
    this.seats = section.seats || [];
    this.seatsWithStatus = section.seatsWithStatus || [];
    this.enumType = section.enumType;
    this.enumerationType = section.enumType && section.enumType.key ?
      section.enumType.key :
      section.enumType || SeatmapSection.ENUMERATION_TYPES.Sequencial;
    this.enumDir = section.enumDir;
    this.enumerationDir = section.enumDir && section.enumDir.key ?
      section.enumDir.key :
      section.enumDir || SeatmapSection.ENUMERATION_TYPES.Left,
    this.startingSeatLabel = section.startingSeatLabel || 1,
    this.rowLabelType = section.rowLabelType;
    this.rowLabelTypeKey = section.rowLabelType && section.rowLabelType.key ?
      section.rowLabelType.key :
      section.rowLabelType || SeatmapSection.LABEL_TYPES.Number;
    this.seatLabelType = section.seatLabelType;
    this.seatLabelTypeKey = section.seatLabelType && section.seatLabelType.key ?
      section.seatLabelType.key :
      section.seatLabelType || SeatmapSection.LABEL_TYPES.Number;
    this.startingRowLabel = section.startingRowLabel || 1;
    this.showRowLabels = section.showRowLabels;
    this.lastRowNoGap = section.lastRowNoGap;
    this.sectionName = section.sectionName || "Main section";
    this.capacity = section.capacity || 60;
    this.rowLabelRange = section.rowLabelRange;
    this.events = events;
    this.classes = classes;

    this.#setSeatmap();
  }

  clearFocus() {
    const focus = document.querySelector("[data-focus]");
    if (focus) {
        delete focus.dataset.focus;
    }    
  }

  clearSelection() {
    const selection = document.querySelectorAll(`#${this.containerId} .outline-blue`);
    selection.forEach((prev) => prev.classList.remove("outline-blue"));
  }  

  draw() {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.onkeydown = (evt) => { this.#manageKeyboardNavigation(evt); };

      container.style.setProperty("--columns", this.availableCols);
      container.style.setProperty("grid-template-rows", `repeat(${this.availableRows}, var(--seat))`);
      container.innerHTML = "";
      [
        ...this.corridor,
        ...this.elements,
        ...this.seats
      ].forEach((elem) => {
        const e = this.#createHTMLElement("div", elem.classes, elem.label || "");
        e.style["grid-area"] = `${elem.row}/${elem.col}/${elem.row + elem.height}/${elem.col + elem.width}`;
        const dataset = this.#getSeatDataset(elem);
        Object.keys(dataset).forEach((k) => {
          e.dataset[k] = dataset[k];
        });

        if (elem.bgcolor) {
          e.style.backgroundColor = elem.bgcolor;
        }
        if (elem.color) {
          e.style.color = elem.color;
        }

        if (elem.type === "seat") {
          e.title = this.#getSeatTitle(elem, this.sectionName);
        }

        this.events.forEach((evt) => {
          if (
            (!evt.elementType.startsWith("!") && evt.elementType === elem.type) ||
            (evt.elementType.startsWith("!") && evt.elementType.slice(1) !== elem.type)
          ) {
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
    element.classList.add("outline-blue");
  }  

  #updateFacilities() {
    const filteredElements = [];
    // eslint-disable-next-line no-param-reassign
    this.availableCols = this.numberOfSeatsPerRowLeft + this.numberOfSeatsPerRowRight + 1;

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
            col: this.numberOfSeatsPerRowLeft + 1,
            height: 1,
            width: 1,
            type: "corridor",
            classes: SeatmapSection.CLASSES.corridor,
            label: showLabel ? nextRowValue : undefined,
            alternativeLabel: this.rowLabelTypeKey === SeatmapSection.LABEL_TYPES.Number ? rIndex + 1 : String.fromCharCode(96 + rIndex + 1).toUpperCase()
          });

        if (showLabel || !this.rowsEnumNoGaps) {
            nextRowValue = this.rowLabelTypeKey === SeatmapSection.LABEL_TYPES.Number ?
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
            .sort((a, b) => (this.enumerationDir === SeatmapSection.ENUMERATION_DIRECTION.Left ? a.col - b.col : b.col - a.col))
            .forEach((s, index) => {
                if (this.enumerationType === SeatmapSection.ENUMERATION_TYPES.PerRow) {
                    if (rowNumber !== s.row) {
                        seatLabel = this.startingSeatLabel;
                        rowNumber++;
                    }
                }
                s.label = s.label || seatLabel;
                s.index = seatIndex;
                seatLabel = this.seatLabelTypeKey === SeatmapSection.LABEL_TYPES.Number ?
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
    if (elem.seatClass) {
      dataset.seatClass = elem.seatClass;
    }
    if (elem.fee) {
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
      seatRowLabel = !this.showRowLabels || this.rowLabelTypeKey === SeatmapSection.LABEL_TYPES.Number ?
        parseInt(seatRowLabel, 10) + 1 :
        String.fromCharCode(seatRowLabel.charCodeAt(0) + 1);
    }
    return seatRowLabel;
  }

  #getSeatTitle(elem, sectionName) {
    const seat = elem.label ? `Seat: ${elem.label}` : "";
    const row = elem.rowLabel ? `Row: ${elem.rowLabel}` : "";
    const status = `Status: ${elem.status.charAt(0).toUpperCase()}${elem.status.slice(1)}`;
    const section = `Section: ${sectionName}`;
    return `${section} - ${row} - ${seat} - ${status}`;
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
          for (let i = (index + this.numberOfSeatsPerRowLeft + this.numberOfSeatsPerRowRight);
              i < this.seats.length + 1;
              i += this.numberOfSeatsPerRowLeft + this.numberOfSeatsPerRowRight) {
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
          const exception = this.lastRowNoGap && (index > this.seats.length - this.numberOfSeatsPerRowRight);

          // eslint-disable-next-line max-len
          for (let i = (index - this.numberOfSeatsPerRowLeft - this.numberOfSeatsPerRowRight - (exception ? 1 : 0));
              i > 0;
              i -= this.numberOfSeatsPerRowLeft + this.numberOfSeatsPerRowRight) {
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
        if (this.enumerationDir === SeatmapSection.ENUMERATION_DIRECTION.Left) {
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
        if (this.enumerationDir === SeatmapSection.ENUMERATION_DIRECTION.Left) {
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