import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export function usePreferences() {
  const [language, setLanguage] = useLocalStorage('skillatlasLanguage', 'Tamil');
  const [level, setLevel] = useLocalStorage('skillatlasLevel', 'Beginner');
  const [onboardingDone, setOnboardingDone] = useLocalStorage('skillatlasOnboarded', false);
  const [interests, setInterests] = useLocalStorage('skillatlasInterests', []);

  return {
    language, setLanguage,
    level, setLevel,
    onboardingDone, setOnboardingDone,
    interests, setInterests,
  };
}

export function useSavedResources() {
  const [saved, setSaved] = useLocalStorage('skillatlasSaved', []);

  const saveResource = (resource) => {
    setSaved(prev => {
      const exists = prev.find(r => r.id === resource.id);
      if (exists) return prev;
      return [...prev, { ...resource, savedAt: new Date().toISOString() }];
    });
  };

  const removeResource = (id) => {
    setSaved(prev => prev.filter(r => r.id !== id));
  };

  const isSaved = (id) => saved.some(r => r.id === id);

  return { saved, saveResource, removeResource, isSaved };
}

export function useProgress() {
  const [progress, setProgress] = useLocalStorage('skillatlasProgress', {
    topicsCompleted: 3,
    videosWatched: 12,
    practiceProblems: 5,
    streak: 4,
    weeklyActivity: [2, 4, 1, 3, 5, 2, 3],
    currentTopic: 'Java Arrays',
    currentProgress: 65,
    recentlyViewed: ['Java Arrays', 'SQL Joins', 'Git Basics'],
  });

  return { progress, setProgress };
}
