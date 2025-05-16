'use client';

import { useState, useRef, useEffect } from 'react';

export default function Node({ id, x, y, onChange, onAddChild }) {
  const [position, setPosition] = useState({ x, y });
  const [text, setText] = useState('');
  const nodeRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const newX = e.clientX - offset.current.x;
      const newY = e.clientY - offset.current.y;
      setPosition({ x: newX, y: newY });
      onChange?.(id, { x: newX, y: newY });
    };

    const stopDragging = () => (isDragging.current = false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDragging);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, []);

  const startDrag = (e) => {
    isDragging.current = true;
    const rect = nodeRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleInput = (e) => {
    setText(e.target.value);
    if (e.target.value.length === 1) {
      onAddChild?.(id);
    }
  };

  return (
    <div
      ref={nodeRef}
      onMouseDown={startDrag}
      className="absolute p-3 min-w-[120px] rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 cursor-move transition-all"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <input
        className="w-full bg-transparent outline-none text-black dark:text-white"
        value={text}
        onChange={handleInput}
        placeholder="Type here..."
      />
    </div>
  );
}
