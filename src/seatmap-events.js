const {Socket} = require("./phoenix.cjs.js");

class SeatmapEvents{
    constructor(settings) {
        this.socketUrl = settings.socketUrl || "wss://sandbox-api.betterez.com/seatmaps/socket";
        this.idForLiveSeatmap = settings.idForLiveSeatmap || "59b945e1bc459e401b000047_79f90fc0-22b7-4fd5-a884-ed459b512019_2023-09-29";
        this.accessTicket = settings.accessTicket || "SFMyNTY.g3QAAAACZAAEZGF0YXQAAAAAZAAGc2lnbmVkbgYAHld54ooB.FbGpYFosJ1N7zS7XTq9tyeke1K3wJlaQm0A18lFu0Nc";
        this.legFrom = settings.legFrom || "0";
        this.legTo = settings.legTo || "1";

        const socket = new Socket(this.socketUrl, {
                params: {
                    token: this.accessTicket
                }
            });
            socket.connect();
    }
}

try {
  module.exports = SeatmapEvents;
} catch (e) {
}

