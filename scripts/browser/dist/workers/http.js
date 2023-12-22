/**
 *
 * @param e
 * @returns
 */
onmessage = async function httpWorkerEventListener(e) {
  // Bail early if no data is passed through
  console.log("start worker ?", e.data);
  if (!e.data) return;

  try {
    // Process the fetch request
    const { url, opts, headerBuffer, bodyBuffer } = e.data;
    const response = await fetch(url, {
      method: opts.method,
      body: opts.body,
    });

    // Parse headers
    const headerMap = {};

    // biome-ignore lint/complexity/noForEach: <explanation>
    response.headers.forEach((v, k) => {
      headerMap[k] = v;
    });

    const headerBytes = new TextEncoder().encode(JSON.stringify(headerMap));
    const headerSharedArray = new Uint8Array(headerBuffer);

    if (headerBytes.length > headerSharedArray.length) {
      console.error("Data is too large for the SharedArrayBuffer.");
    } else {
      headerSharedArray.set(headerBytes);
    }

    // Parse body
    const body = await response.json();
    const bodyBytes = new TextEncoder().encode(JSON.stringify(body));
    const bodySharedArray = new Uint8Array(bodyBuffer);

    if (bodyBytes.length > bodySharedArray.length) {
      console.error("Data is too large for the SharedArrayBuffer.");
    } else {
      bodySharedArray.set(bodyBytes);
    }

    console.log("bodysharedarray", bodySharedArray);
  } catch (error) {
    console.error("Failed to process fetch request", error);
  }

  self.close();
};
