import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  // * Transition the card states  *
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => [...(replace ? prev.slice(0, -1) : prev), newMode]);
  }

  // * fuction to revert the card previous state *
  const back = () => {
    if (history.length === 1) return;
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  }

  return { mode, transition, back, history };
}