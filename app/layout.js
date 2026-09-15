import "./globals.css";

export const metadata = {
  title: {
    default: "Envision LawnCare | Reliable Lawn Care in Luck, WI",
    template: "%s | Envision LawnCare",
  },
  description:
    "Reliable lawn care and property maintenance that keeps your outdoor space looking its best.",
  openGraph: {
    title: "Envision LawnCare",
    description: "Dependable lawn and property care, handled on schedule and done right.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
