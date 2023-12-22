import { OpenFile, WASI, File, Fd } from "@bjorn3/browser_wasi_shim";
import { initLegacyFetch } from "./wasi";

// class XtermStdio extends Fd {
//   fd_write(
//     view8 /*: Uint8Array*/,
//     iovs /*: [wasi.Iovec]*/
//   ) /*: {ret: number, nwritten: number}*/ {
//     let nwritten = 0;
//     for (const iovec of iovs) {
//       console.log(
//         iovec.buf_len,
//         iovec.buf_len,
//         view8.slice(iovec.buf, iovec.buf + iovec.buf_len)
//       );
//       const buffer = view8.slice(iovec.buf, iovec.buf + iovec.buf_len);
//       // this.term.writeUtf8(buffer);
//       console.log(new TextDecoder().decode(buffer))
//       nwritten += iovec.buf_len;
//     }
//     return { ret: 0, nwritten };
//   }
// }

// export let wasmInstance: WebAssembly.Instance | null = null;

async function main() {
  // const args = [];
  // const env = [];
  // const fds = [
  //   new OpenFile(new File([])), // stdin
  //   new OpenFile(new File([])), // stdout
  //   new OpenFile(new File([])), // stderr
  // ];
  // const wasi = new WASI(args, env, fds);

  // const wasmFile = await fetch("./index.wasm");
  // const wasmFileBuffer = await wasmFile.arrayBuffer();

  // const instance = await WebAssembly.instantiate(wasmFileBuffer, {
  //   wasi_snapshot_preview1: wasi.wasiImport,
  //   ...initLegacyFetch()
  // });

  // console.log("starting ...");

  // wasmInstance = instance.instance

  // try {
  //   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  //   wasi.start(instance.instance as any);
  // } catch (error) {
  //   console.log("cant start wasi", error);
  // }

  // console.log("stdout", new TextDecoder().decode(fds[1].file.data));
  // console.log("stderr", new TextDecoder().decode(fds[2].file.data));

  // Shared wasm worker

  const sab = new SharedArrayBuffer(1024)

  const httpWorker = new Worker("./workers/shared.js");
  httpWorker.postMessage({
    sab
  })


  const worker = new Worker("./workers/wasm.js", { type: "module" });
  worker.postMessage({
    eventType: "INITIALISE",
    eventData: "modulePath",
    sab,
  });

  worker.onmessage = (e) => {
    console.log("got reply back!!!", e.data);
  };
}

main();
