function waitAndProcess(sab) {
  const int32 = new Int32Array(sab);

  console.log("[Shared Worker]", "Waiting ...", int32[0]);
  console.log(Atomics.wait(int32, 0, 0));

  console.log("[Shared Worker]", "Waiting over");
  console.log("[Shared Worker]", "Processing ...");

  fetch("https://reqres.in/api/products/1")
    .then((response) => response.json())
    .then((json) => {
      console.log("[Shared Worker]", "Json", json);
      setTimeout(() => {
        Atomics.store(int32, 1, 5);
        Atomics.notify(int32, 1);

        console.log("[Shared Worker]", "Notified!");
        Atomics.store(int32, 0, 0);
        Atomics.store(int32, 1, 0);

        waitAndProcess(sab);
      }, 1500);
    });
}

onmessage = (e) => {
  const { sab } = e.data;

  waitAndProcess(sab);
};
