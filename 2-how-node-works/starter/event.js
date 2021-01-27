const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
    console.log("there a new Sales!");
});

myEmitter.on("newSale", () => {
    console.log("Customer name: Jonas");
});

myEmitter.emit("newSale");