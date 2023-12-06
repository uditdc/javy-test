// import { main, fetchGet } from "./lib/index";
// import { AbiCoder } from "ethers";

// interface InputProps {
//   n: number;
//   v: string;
// }

// async function someValue() {
//   return 40;
// }

// main(async (input: InputProps) => {
//   console.log("Print env");
//   fetchGet("NODE_TEST");

//   const coder = AbiCoder.defaultAbiCoder();
//   const coded = coder.encode(["string"], [input.v]);

//   return { nonce: input.n + (await someValue()), value: coded };
// });


import { fetchGet } from "./lib/index";
import { AbiCoder } from "ethers";

fetchGet("https://httpbin.org/ip");

const coder = AbiCoder.defaultAbiCoder();
const coded = coder.encode(["string"], ["sdsd"]);

console.log('ABI: ', coded);
