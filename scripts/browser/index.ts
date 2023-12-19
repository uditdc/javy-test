import {
  WASI,
  File,
  OpenFile,
} from "@bjorn3/browser_wasi_shim";

const args = ["bin", "arg1", "arg2"];
const env = ["FOO=bar"];
const fds = [
  new OpenFile(new File([])), // stdin
  new OpenFile(new File([])), // stdout
  new OpenFile(new File([])), // stderr
];
const wasi = new WASI(args, env, fds);

const wasm = await WebAssembly.compileStreaming(fetch("bin.wasm"));
const inst = await WebAssembly.instantiate(wasm, {
  wasi_snapshot_preview1: wasi.wasiImport,
});
wasi.start(inst);
