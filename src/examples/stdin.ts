import { main } from "../lib/index";

import { AbiCoder } from "ethers";

interface InputProps {
  n: number;
  v: string;
}

async function someValue(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(40);
    }, 300)
  });
}

main(async (input: InputProps) => {
  const coder = AbiCoder.defaultAbiCoder();
  const coded = coder.encode(["string"], [input.v]);

  return { nonce: 4 + (await someValue()), value: coded };
});
