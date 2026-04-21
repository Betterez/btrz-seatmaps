const assert = require("node:assert/strict");
const { beforeEach, describe, it } = require("node:test");
const { JSDOM } = require("jsdom");
const { SeatmapSection } = require("../src/seatmap-section.js");

describe("Seatmap section", function () {
  const sectionCoachBus = new SeatmapSection(
    "grid",
    {
      rowsEnumNoGaps: true,
      seatsPerRowLeft: 2,
      seatsPerRowRight: 2,
      facilities: [
        {
          type: "door",
          row: 1,
          col: 5,
          height: 1,
          width: 1,
          alignment: {
            key: 2, value: "Right"
          }
        },
        {
          type: "driver",
          row: 1,
          col: 1,
          height: 1,
          width: 5,
          label: "",
          alignment: {
            key: 1, value: "Left"
          }
        }
      ],
      availableRows: 15,
      availableCols: 5,
      customSeats: [],
      enumType: 2,
      enumDir: 2,
      startingSeatLabel: 1,
      rowLabelType: 1,
      seatLabelType: 1,
      startingRowLabel: "1",
      showRowLabels: true,
      lastRowNoGap: true,
      name: "Main",
      capacity: 57,
      seats: [],
      rowLabelRange: ""
    }
  );
  const sectionShuttleBus = new SeatmapSection(
    "grid",
    {
      rowsEnumNoGaps: true,
      seatsPerRowLeft: 2,
      seatsPerRowRight: 1,
      facilities: [
        {
          type: "door",
          row: 1,
          col: 4,
          height: 1,
          width: 1,
          alignment: {
            key: 2, value: "Right"
          }
        },
        {
          type: "driver",
          row: 1,
          col: 1,
          height: 1,
          width: 5,
          label: "",
          alignment: {
            key: 1, value: "Left"
          }
        }
      ],
      availableRows: 8,
      availableCols: 4,
      customSeats: [],
      enumType: 1,
      enumDir: 1,
      startingSeatLabel: 1,
      rowLabelType: 2,
      seatLabelType: 1,
      startingRowLabel: "A",
      showRowLabels: true,
      lastRowNoGap: true,
      sectionName: "Main",
      capacity: 22,
      seats: []
    }
  );

  beforeEach(() => {
  const dom = new JSDOM(
    `<html>
       <body>
       <div id="grid"></div>
       </body>
     </html>`,
     { url: 'http://localhost' },
  );

  global.window = dom.window;
  global.document = dom.window.document;
  })

  describe("Building seats from initial Coach bus template.", () => {
    it("Should process settings properly.", () => {
      assert.equal(sectionCoachBus.availableCols, 5);
      assert.equal(sectionCoachBus.seats.length, 57);
      assert.equal(sectionCoachBus.getCapacity(), 57);
      assert.equal(sectionCoachBus.facilities.filter((e) => e.type === "driver").length, 1);
      assert.equal(sectionCoachBus.facilities.filter((e) => e.type === "door").length, 1);
      assert.equal(sectionCoachBus.facilities.length, 2);
      assert.equal(sectionCoachBus.corridor.length, 13);
      assert.equal(sectionCoachBus.seats.filter((s) => s.rowLabel === 14).length, sectionCoachBus.availableCols);
      assert.equal(sectionCoachBus.corridor.map((c) => c.label).join(","), "1,2,3,4,5,6,7,8,9,10,11,12,13");
    });

    it("Should build seat titles properly.", () => {
      sectionCoachBus.draw();
      assert.equal(
        document.querySelectorAll("#grid [data-type='seat'][data-index='1'][data-status='available']")[0].title,
        "Section: Main \nRow: 1 \nSeat: 1 \nStatus: Available \n"
      );
      new SeatmapSection("grid", {}, {labels: {section: "Section", row: "Rangée", seat: "Siège", status: "Statut"}}).draw();
      assert.equal(
        document.querySelectorAll("#grid [data-type='seat'][data-index='1'][data-status='available']")[0].title,
        "Rangée: 1 \nSiège: 1 \nStatut: Available \n"
      );
    });

    it("Should draw the seatmap properly.", () => {
      sectionCoachBus.draw();
      assert.equal(document.querySelectorAll("#grid [data-type='driver']").length, 1);
      assert.equal(document.querySelectorAll("#grid [data-type='door']").length, 1);
      assert.equal(document.querySelectorAll("#grid [data-type='seat'][data-status='available']").length, 57);
      assert.equal(document.querySelectorAll("#grid [data-type='seat'][data-status='unavailable']").length, 0);
      assert.equal(document.querySelector("#grid [data-type='seat'][data-index='1']").style["grid-area"], "2/5/3/6");
      assert.equal(document.querySelector("#grid [data-type='seat'][data-index='4']").style["grid-area"], "2/1/3/2");
    });
  });

  describe("Building seats from initial Shuttle bus template.", () => {
    it("Should process settings properly.", () => {
      assert.equal(sectionShuttleBus.availableCols, 4);
      assert.equal(sectionShuttleBus.seats.length, 22);
      assert.equal(sectionShuttleBus.getCapacity(), 22);
      assert.equal(sectionShuttleBus.facilities.filter((e) => e.type === "driver").length, 1);
      assert.equal(sectionShuttleBus.facilities.filter((e) => e.type === "door").length, 1);
      assert.equal(sectionShuttleBus.facilities.length, 2);
      assert.equal(sectionShuttleBus.corridor.length, 6);
      assert.equal(sectionShuttleBus.seats.filter((s) => s.rowLabel === "G").length, sectionShuttleBus.availableCols);
      assert.equal(sectionShuttleBus.corridor.map((c) => c.label).join(","), "A,B,C,D,E,F");
    });

    it("Should draw the seatmap properly.", () => {
      sectionShuttleBus.draw();
      assert.equal(document.querySelectorAll("#grid [data-type='driver']").length, 1);
      assert.equal(document.querySelectorAll("#grid [data-type='door']").length, 1);
      assert.equal(document.querySelectorAll("#grid [data-type='seat'][data-status='available']").length, 22);
      assert.equal(document.querySelectorAll("#grid [data-type='seat'][data-status='unavailable']").length, 0);
      assert.equal(document.querySelector("#grid [data-type='seat'][data-index='1']").style["grid-area"], "2/1/3/2");
      assert.equal(document.querySelector("#grid [data-type='seat'][data-index='3']").style["grid-area"], "2/4/3/5");
    });
  });

})
