const Primus = require("primus");

let go = (server) => {
  let primus = new Primus(server, {});

  primus.on("connection", (spark) => {
    console.log("Connection established");

    spark.on("data", (data) => {
      console.log("Received data: " + data);

      primus.write(data);
    });
  });
};

module.exports.go = go;
