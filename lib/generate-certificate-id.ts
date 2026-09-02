export function generateCertificateId() {
  const year =
    new Date().getFullYear();

  const random =
    Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

  return `AJFT-CERT-${year}-${random}`;
}