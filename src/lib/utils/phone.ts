export function normalizeColombianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("57") && digits.length === 12) {
    return digits;
  }

  if (digits.length === 10) {
    return `57${digits}`;
  }

  return digits;
}

export function createWhatsAppUrl(
  phone: string,
  firstName: string,
  orderNumber: string,
): string {
  const message = `Hola ${firstName}, te escribimos respecto a tu pedido #${orderNumber} realizado en Lúmina Feria.`;
  return `https://wa.me/${normalizeColombianPhone(phone)}?text=${encodeURIComponent(message)}`;
}
