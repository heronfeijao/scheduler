import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    const newHistory = history;
    if (replace) {
      newHistory.pop();
    }
    setMode(newMode)
    setHistory([...newHistory, newMode]);
  }

  const back = () => {
    if (history.length === 1) return;
    const newHistory = history
    newHistory.pop()
    setHistory(newHistory)
    setMode(newHistory[newHistory.length - 1]);
  }

  return { mode, transition, back, history };
}