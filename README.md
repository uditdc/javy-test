Javy js2wasm
===

This repository contains a set of examples, using Javy, to compile JS code to WASM.

Runtime: Wasmtime / Wasmedge

### Run with preloaded quickjs provider

Compile with dynamic linked provider
```
./bin/cli compile -d
```

Run with a preloaded provider:
```
echo '{ "n": 2, "v": "abc" }' | wasmtime run --preload javy_quickjs_provider_v1=./bin/provider.wasm build/index.wasm
```

Compile with experimental even loop:
```
cargo build --features=experimental_event_loop -p javy-core --target=wasm32-wasi -r
```