import Image from "next/image";

export default function Brand({ footer = false }) {
  return (
    <Image
      className={`brand-logo-image${footer ? " brand-logo-footer" : ""}`}
      src="/images/envision-logo.png"
      alt="Envision LawnCare"
      width={792}
      height={360}
      priority={!footer}
    />
  );
}
