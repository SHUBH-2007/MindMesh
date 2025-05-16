export default function SettingsPage() {
  return (
    <main className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Settings</h1>
      <ul className="space-y-2">
        <li>🌙 Toggle Dark/Light Mode</li>
        <li>🤖 Enable/Disable AI Mode</li>
        <li>📤 Export Mind Map</li>
      </ul>
    </main>
  );
}
