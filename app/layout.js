// app/layout.js
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'MindMap Flow',
  description: 'Visual mind mapping with optional AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white font-sans">
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
