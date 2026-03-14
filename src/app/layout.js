import "./globals.css";

export const metadata = {
  title: "3 Years of Us",
  description: "Website anniversary 3 tahun untuk orang tersayang.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
