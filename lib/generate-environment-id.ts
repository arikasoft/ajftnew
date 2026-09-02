function randomDigits(
  length = 8
) {
  let result = "";

  for (
    let index = 0;
    index < length;
    index += 1
  ) {
    result += Math.floor(
      Math.random() * 10
    ).toString();
  }

  return result;
}

export function generateParticipantId() {
  const year =
    new Date().getFullYear();

  return `AJFT-ENV-${year}-${randomDigits(
    8
  )}`;
}

export function generatePlantationId() {
  const year =
    new Date().getFullYear();

  return `AJFT-TREE-${year}-${randomDigits(
    8
  )}`;
}

export function generatePaymentId() {
  const year =
    new Date().getFullYear();

  return `AJFT-PAY-${year}-${randomDigits(
    8
  )}`;
}

export function generateTransactionId() {
  const year =
    new Date().getFullYear();

  return `AJFT-TXN-${year}-${randomDigits(
    10
  )}`;
}

export function generateEnvironmentPassword() {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

  let password = "";

  for (
    let index = 0;
    index < 8;
    index += 1
  ) {
    password +=
      chars[
        Math.floor(
          Math.random() *
            chars.length
        )
      ];
  }

  return password;
}