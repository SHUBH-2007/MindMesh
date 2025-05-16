'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [launched, setLaunched] = useState(false);

  if (launched) return <Editor />;

  return (
    <main className="min-h-screen w-full bg-white text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-500 relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 dark:from-indigo-900 dark:via-gray-950 dark:to-indigo-900 opacity-40"></div>

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-12 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fadeInDown">
          MindMap Flow
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl animate-fadeInUp">
          A minimal, fast, and interactive mind mapping tool — designed for thinkers, makers, and doers. No setup. Just flow.
        </p>

        <button
          onClick={() => setLaunched(true)}
          className="mt-12 inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-400"
          aria-label="Launch MindMap Flow app"
        >
          Launch App <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Try a Mini Demo
        </h2>
        <MiniMindMapDemo />
      </section>

      <section className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-6 pb-24 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </section>

      <footer className="relative z-10 text-center py-10 text-sm text-gray-500 dark:text-gray-600 select-none">
        © 2025 MindMap Flow. Built with Next.js + Tailwind CSS.
      </footer>

      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
      `}</style>
    </main>
  );
}

const features = [
  { title: '🧠 Auto-Expanding Nodes', desc: 'As you type, new child nodes appear automatically — like your thoughts unfolding.' },
  { title: '🖱️ Drag & Drop', desc: 'Freely move nodes around the canvas to visually organize your thoughts.' },
  { title: '🌙 Light & Dark Mode', desc: 'Switch themes to match your environment or mood.' },
  { title: '🔗 Smart Connections', desc: 'Lines animate and connect ideas clearly and intelligently.' },
  { title: '📦 LocalStorage Save', desc: 'Your map stays in your browser — no accounts or syncing needed.' },
  { title: '📤 Export as PNG', desc: 'Share your map anywhere with one-click export (coming soon).' },
];

function FeatureCard({ title, desc }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-default">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  );
}

function Editor() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <p className="text-xl text-gray-600 dark:text-gray-400 select-none">
        [🧩 Mind Map UI Coming Here]
      </p>
    </div>
  );
}

function MiniMindMapDemo() {
  const [nodes, setNodes] = useState([{ id: 0, text: 'Root Node', x: 250, y: 150, parent: null }]);
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [showingDemo, setShowingDemo] = useState(true);
  const containerRef = useRef();
  const autoStepRef = useRef(0);

  useEffect(() => {
    if (sessionStorage.getItem('demoShown')) {
      setShowingDemo(false);
      return;
    }
    const steps = [
      () => addChildNode(0),
      () => addChildNode(1),
      () => addChildNode(1),
      () => addChildNode(2),
    ];
    const interval = setInterval(() => {
      if (autoStepRef.current < steps.length) {
        steps[autoStepRef.current++]();
      } else {
        clearInterval(interval);
        setShowingDemo(false);
        sessionStorage.setItem('demoShown', '1');
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  function addChildNode(parentId) {
    const newNodeId = nodes.length;
    const parentNode = nodes.find((n) => n.id === parentId);
    if (!parentNode) return;
    const newNode = {
      id: newNodeId,
      text: `Node ${newNodeId}`,
      x: parentNode.x + 120,
      y: parentNode.y + 80,
      parent: parentId,
    };
    setNodes((prev) => [...prev, newNode]);
  }

  function handleMouseDown(e, id) { e.stopPropagation(); setDraggingNodeId(id); }
  function handleMouseUp() { setDraggingNodeId(null); }
  function handleMouseMove(e) {
    if (draggingNodeId === null) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setNodes((nodes) => nodes.map((n) => (n.id === draggingNodeId ? { ...n, x: mouseX, y: mouseY } : n)));
  }
  function handleTouchMove(e) {
    if (draggingNodeId === null) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    setNodes((nodes) => nodes.map((n) => (n.id === draggingNodeId ? { ...n, x: touchX, y: touchY } : n)));
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      className="relative border border-gray-300 dark:border-gray-700 rounded-lg w-full h-[360px] bg-white dark:bg-gray-900 shadow-lg select-none touch-none overflow-hidden"
      aria-label="Mini mind map demo"
    >
      {showingDemo && (
        <div className="absolute top-2 left-3 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          ⏳ Showing demo...
        </div>
      )}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node) => {
          if (node.parent === null) return null;
          const parentNode = nodes.find((n) => n.id === node.parent);
          if (!parentNode) return null;
          return (
            <line
              key={`${node.id}-line`}
              x1={parentNode.x + 50}
              y1={parentNode.y + 25}
              x2={node.x + 50}
              y2={node.y + 25}
              stroke="#8b5cf6"
              strokeWidth={3}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          );
        })}
      </svg>
      {nodes.map((node) => (
        <div
          key={node.id}
          onClick={() => addChildNode(node.id)}
          onMouseDown={(e) => handleMouseDown(e, node.id)}
          onTouchStart={(e) => handleMouseDown(e, node.id)}
          style={{ top: node.y, left: node.x }}
          className="absolute cursor-pointer bg-indigo-600 dark:bg-indigo-400 text-white dark:text-gray-900 rounded-full px-5 py-2 shadow-lg text-sm font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors"
          role="button"
          tabIndex={0}
          aria-label={`Node ${node.text}. Click to add child node.`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              addChildNode(node.id);
              e.preventDefault();
            }
          }}
        >
          {node.text}
        </div>
      ))}
      <p className="absolute bottom-2 right-3 text-xs text-gray-400 dark:text-gray-500 select-none pointer-events-none">
        Click a node to add a child. Drag nodes to move.
      </p>
    </div>
  );
}
