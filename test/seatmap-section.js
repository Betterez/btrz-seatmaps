describe("Seatmap section", function () {

  let SeatmapSection = require("../src/seatmap-section.js");
  let expect = require("chai").expect;
  let JSDOM = require("jsdom").JSDOM;
  const sectionCoachBus = new SeatmapSection(
    "grid",
    {
      rowsEnumNoGaps: true,
      seatsPerRowLeft: 2,
      seatsPerRowRight: 2,
      elements: [
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
      seatsWithStatus: [],
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
      elements: [
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
      seatsWithStatus: [],
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
      expect(sectionCoachBus.availableCols).to.eql(5);
      expect(sectionCoachBus.seats.length).to.eql(57);
      expect(sectionCoachBus.getCapacity()).to.eql(57);
      expect(sectionCoachBus.elements.filter((e) => e.type === "driver").length).to.eql(1);
      expect(sectionCoachBus.elements.filter((e) => e.type === "door").length).to.eql(1);
      expect(sectionCoachBus.elements.length).to.eql(2);
      expect(sectionCoachBus.corridor.length).to.eql(13);
      expect(sectionCoachBus.seats.filter((s) => s.rowLabel === 14).length).to.eql(sectionCoachBus.availableCols);
      expect(sectionCoachBus.corridor.map((c) => c.label).join(",")).to.eql("1,2,3,4,5,6,7,8,9,10,11,12,13");
    });

    it("Should build seat titles properly.", () => {
      sectionCoachBus.draw();
      expect(document.querySelectorAll("#grid [data-type='seat'][data-index='1'][data-status='available']")[0].title).to.eql("Section: Main \nRow: 1 \nSeat: 1 \nStatus: Available \n");
      new SeatmapSection("grid", {}, {labels: {section: "Section", row: "Rangée", seat: "Siège", status: "Statut"}}).draw();
      expect(document.querySelectorAll("#grid [data-type='seat'][data-index='1'][data-status='available']")[0].title).to.eql("Section: Main section \nRangée: 1 \nSiège: 1 \nStatut: Available \n");
    });

    it("Should draw the seatmap properly.", () => {
      sectionCoachBus.draw();
      expect(document.querySelectorAll("#grid [data-type='driver']").length).to.eql(1);
      expect(document.querySelectorAll("#grid [data-type='door']").length).to.eql(1);
      expect(document.querySelectorAll("#grid [data-type='seat'][data-status='available']").length).to.eql(57);
      expect(document.querySelectorAll("#grid [data-type='seat'][data-status='unavailable']").length).to.eql(0);
      expect(document.querySelector("#grid [data-type='seat'][data-index='1']").style["grid-area"]).to.eql("2/5/3/6");
      expect(document.querySelector("#grid [data-type='seat'][data-index='4']").style["grid-area"]).to.eql("2/1/3/2");
    });
  });

  describe("Building seats from initial Shuttle bus template.", () => {
    it("Should process settings properly.", () => {
      expect(sectionShuttleBus.availableCols).to.eql(4);
      expect(sectionShuttleBus.seats.length).to.eql(22);
      expect(sectionShuttleBus.getCapacity()).to.eql(22);
      expect(sectionShuttleBus.elements.filter((e) => e.type === "driver").length).to.eql(1);
      expect(sectionShuttleBus.elements.filter((e) => e.type === "door").length).to.eql(1);
      expect(sectionShuttleBus.elements.length).to.eql(2);
      expect(sectionShuttleBus.corridor.length).to.eql(6);
      expect(sectionShuttleBus.seats.filter((s) => s.rowLabel === "G").length).to.eql(sectionShuttleBus.availableCols);
      expect(sectionShuttleBus.corridor.map((c) => c.label).join(",")).to.eql("A,B,C,D,E,F");
    });

    it("Should draw the seatmap properly.", () => {
      sectionShuttleBus.draw();
      expect(document.querySelectorAll("#grid [data-type='driver']").length).to.eql(1);
      expect(document.querySelectorAll("#grid [data-type='door']").length).to.eql(1);
      expect(document.querySelectorAll("#grid [data-type='seat'][data-status='available']").length).to.eql(22);
      expect(document.querySelectorAll("#grid [data-type='seat'][data-status='unavailable']").length).to.eql(0);
      expect(document.querySelector("#grid [data-type='seat'][data-index='1']").style["grid-area"]).to.eql("2/1/3/2");
      expect(document.querySelector("#grid [data-type='seat'][data-index='3']").style["grid-area"]).to.eql("2/4/3/5");
    });
  });

})
