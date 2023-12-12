// Rust APIs ported to JS using Javy
declare var Javy: {
  IO: any;
  FetchIO: {
    get: (url: string) => void; // Wrapper to Blockless HTTP Get
  };
};
