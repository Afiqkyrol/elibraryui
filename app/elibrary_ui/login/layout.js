export const metadata = {
  title: "Online Library",
  description: "Online Library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
