import { OpenFile, WASI, File, Fd } from "@bjorn3/browser_wasi_shim";
import { initLegacyFetch } from "./wasi";

export let wasmInstance: WebAssembly.Instance | null = null;

onmessage = (event) => {
  const { eventType, eventData, eventId, sab } = event.data;

  const args = [];
  const env = [];
  const fds = [
    new OpenFile(new File([])), // stdin
    new OpenFile(new File([])), // stdout
    new OpenFile(new File([])), // stderr
  ];
  const wasi = new WASI(args, env, fds);

  WebAssembly.instantiateStreaming(fetch("../index.wasm"), {
    wasi_snapshot_preview1: wasi.wasiImport,
    ...initLegacyFetch(sab),
  }).then((instantiatedModule) => {
    const wasmExports = instantiatedModule.instance.exports;

    wasmInstance = instantiatedModule.instance;

    try {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      wasi.start(instantiatedModule.instance as any);
    } catch (error) {
      console.log("cant start wasi", error);
    }

    console.log("stdout", new TextDecoder().decode(fds[1].file.data));
    console.log("stderr", new TextDecoder().decode(fds[2].file.data));

    // // const httpWorker = new SharedWorker("./workers/http.js")
    // httpWorker.port.start()

    // console.log("httpWorker", httpWorker, httpWorker);

    // Send back initialised message to main thread
    self.postMessage({
      eventType: "INITIALISED",
      eventData: Object.keys(wasmExports),
    });
  });
};
