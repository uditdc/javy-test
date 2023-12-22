import { wasmInstance } from "./wasm";

/**
 * This is the entry method to initalize blockless_http host API
 *
 * @returns
 */
export function initLegacyFetch(sab: SharedArrayBuffer) {
  let nextFileDescriptor = 1;
  const responseBodyMap = new Map<number, SharedArrayBuffer>();
  const responseHeaderMap = new Map<number, SharedArrayBuffer>();
  const responseWorkerMap = new Map<number, Worker>();

  /**
   * Update the file descriptor on each call
   *
   * @returns
   */
  function generateFileDescriptor(): number {
    return nextFileDescriptor++;
  }

  /**
   * Initalize a http request, pass the request to a worker
   * and store the relevant buffer/worker in a response map.
   *
   * @param urlPtr
   * @param urlLen
   * @param optsPtr
   * @param optsLen
   * @param fdPtr
   * @returns
   */
  function http_req(
    urlPtr: number,
    urlLen: number,
    optsPtr: number,
    optsLen: number,
    fdPtr: number
  ): number {
    const memory = new Uint8Array(
      (wasmInstance?.exports.memory as WebAssembly.Memory).buffer
    );

    // Decode the URL
    const urlBytes = memory.slice(urlPtr, urlPtr + urlLen);
    const url = new TextDecoder().decode(urlBytes);

    // Decode the opts
    const optsBytes = memory.slice(optsPtr, optsPtr + optsLen);
    const optsStr = new TextDecoder().decode(optsBytes);
    let opts = {};

    try {
      opts = JSON.parse(optsStr);
    } catch (error) {
      console.log("failed to parse fetch options", error);
    }

    const fd = generateFileDescriptor();
    console.log(`[httpOpen] Opening FD ${fd} for URL: ${url}`);

    // const worker = new Worker("./http.js");

    // ----------------

    const int32 = new Int32Array(sab);
    // console.log("sabbbb", int32.toString());
    Atomics.store(int32, 0, 1);
    Atomics.notify(int32, 0);
    console.log("[httpOpen]", "Notify shared worker");

    // ----------------

    responseBodyMap.set(fd, new SharedArrayBuffer(4096));
    responseHeaderMap.set(fd, new SharedArrayBuffer(4096));
    // responseWorkerMap.set(fd, worker);
    new DataView(memory.buffer).setUint8(fdPtr, fd);

    try {
      // console.log("post message for worker");
      // worker.postMessage({
      //   url,
      //   opts,
      //   bodyBuffer: responseBodyMap.get(fd),
      //   headerBuffer: responseHeaderMap.get(fd),
      // });
      return 0;
    } catch (error) {
      console.error("HTTP request failed:", error);
      return 1;
    }
  }

  /**
   * Called during an active poll to check the fetch request's
   * status.
   *
   * @param fd
   * @param bufPtr
   * @param bufLen
   * @param numPtr
   * @returns
   */
  function http_read_body(
    fd: number,
    bufPtr: number,
    _bufLen: number,
    numPtr: number
  ): number {
    console.log(`[httpReadBody] Reading body with FD: ${fd}`);

    const int32 = new Int32Array(sab);
    console.log(Atomics.wait(int32, 1, 0));

    console.log("done!!!!");
    return 0;

    // try {
    //   // Get the fd's shared array buffer
    //   const sab = responseBodyMap.get(fd);
    //   const sabArray = new Uint8Array(sab);
    //   // console.log('sab', sab)

    //   // If shared buffer exists and is empty, poll without numBuffer
    //   if (sabArray.length > 0 && !sabArray[0]) {
    //     return -1;
    //   }

    //   if (sabArray.length > 0) {
    //     // Strip the buffer
    //     let lastNonZeroIndex = sabArray.length - 1;
    //     while (lastNonZeroIndex >= 0 && sabArray[lastNonZeroIndex] === 0) {
    //       lastNonZeroIndex--;
    //     }

    //     // Create a new Uint8Array without trailing zeros
    //     const trimmedSabArray = sabArray.subarray(0, lastNonZeroIndex + 1);
    //     const memory = new Uint8Array(
    //       (wasmInstance?.exports.memory as WebAssembly.Memory).buffer
    //     );

    //     // Set the trimmed shared buffer array to wasm shared memory
    //     memory.set(trimmedSabArray, bufPtr);

    //     // Update chunk length to the num pointer
    //     new DataView(memory.buffer).setUint32(
    //       numPtr,
    //       trimmedSabArray.length,
    //       true
    //     );

    //     // Remove the fd's shared array buffer
    //     responseBodyMap.set(fd, new SharedArrayBuffer(0));
    //   } else {
    //     // If shared array buffer does not exist, send a 0 length chunk
    //     // to close the operation
    //     const memory = new Uint8Array(
    //       (wasmInstance?.exports.memory as WebAssembly.Memory).buffer
    //     );
    //     new DataView(memory.buffer).setUint32(numPtr, 0, true);
    //   }

    //   return 0;
    // } catch (error) {
    //   console.error("Failed to read HTTP body:", error);
    //   return 2;
    // }
  }

  /**
   * Closes the fetch request and terminates the worker.
   *
   * @param fd
   * @returns
   */
  function http_close(fd: number): number {
    // console.log(`[httpClose] Closing FD: ${fd}`);

    const int32 = new Int32Array(sab);
    // console.log(Atomics.store(int32, 0, 0));
    // console.log(Atomics.notify(int32, 0));

    // try {
    //   const response = responseBodyMap.get(fd);
    //   const worker = responseWorkerMap.get(fd);
    //   if (!response || !worker) {
    //     console.error("Invalid file descriptor:", fd);
    //     return 1;
    //   }


    //   // worker.terminate();
    //   responseBodyMap.delete(fd);
    //   responseWorkerMap.delete(fd);
    //   return 0;
    // } catch (error) {
    //   console.error("Failed to close HTTP connection:", error);
    //   return 1;
    // }
    
    return 0
  }

  return {
    blockless_http: {
      http_req,
      http_read_body,
      http_close,
    },
  };
}
