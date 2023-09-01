describe("Seatmap section", function () {

  let SeatmapSection = require("../src/seatmap-section.js");
  let expect = require("chai").expect;
  let JSDOM = require("jsdom").JSDOM;

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

  describe("Building seats from initial settings", () => {
    it("Should set available cols properly.", function () {  
      const section = new SeatmapSection("grid", {
        showRowLabels: true,
        seatsWithStatus: [
          {status: "unavailable", col: 2, row: 2, label: "B"}
        ]
      }, []);
      expect(section.availableCols).to.eql(5);
    });

  });

  describe("Drawing setmap section", () => {
    it("Should draw the seatmap properly.", function () {
      const section = new SeatmapSection("grid", {
        showRowLabels: true,
        seatsWithStatus: [
          {status: "unavailable", col: 2, row: 2, label: "B"}
        ]
      }, []);
      section.draw();
      expect(document.querySelectorAll("#grid [data-type='driver']").length).to.eql(0);
      expect(document.querySelectorAll("#grid [data-type='seat'] [data-status='unavailable']").length).to.eql(0);
    });

  });

})
