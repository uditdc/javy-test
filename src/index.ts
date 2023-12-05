import { main } from "./lib/index";
import { AbiCoder } from "ethers";

interface InputProps {
  n: number;
  v: string;
}

main((input: InputProps) => {
  const coder = AbiCoder.defaultAbiCoder();
  const coded = coder.encode(["string"], ["Some randome string"]);

  return { nonce: input.n + 1, value: coded };
});
