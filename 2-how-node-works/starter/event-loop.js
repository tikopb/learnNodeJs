const fs = require('fs');

fs.readFile('text-file.txt', () => { 
    console.log("I/O Finished");
    console.log("============================");

    setTimeout(() => console.log("Timer 2 Finished"), 0);
    setTimeout(() => console.log("Timer 3 Finished"), 3000);
    setImmediate(() => console.log("Immediate 3 finished"));

    process.nextTick(() => console.log("Process nextTick")); // di runnning ketika pertama kali running pada event loop.
});

console.log("Hello From the top-level code"); 