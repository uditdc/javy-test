(() => {
  // src/index.ts
  async function main() {
    const sab = new SharedArrayBuffer(1024);
    const httpWorker = new Worker("./workers/shared.js");
    httpWorker.postMessage({
      sab
    });
    const worker = new Worker("./workers/wasm.js", { type: "module" });
    worker.postMessage({
      eventType: "INITIALISE",
      eventData: "modulePath",
      sab
    });
    worker.onmessage = (e) => {
      console.log("got reply back!!!", e.data);
    };
  }
  main();
})();
