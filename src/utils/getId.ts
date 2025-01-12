import KSUID from "ksuid";

export function getId() {
  const id = KSUID.randomSync().string;
  return id;
}
