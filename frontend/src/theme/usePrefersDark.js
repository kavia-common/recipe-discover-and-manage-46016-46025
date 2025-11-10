import { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export function usePrefersDark() {
  /** Returns boolean reflecting system dark mode preference. */
  const [prefersDark, setPrefersDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (mq) {
      setPrefersDark(mq.matches);
      const listener = (e) => setPrefersDark(e.matches);
      mq.addEventListener ? mq.addEventListener('change', listener) : mq.addListener(listener);
      return () => {
        mq.removeEventListener ? mq.removeEventListener('change', listener) : mq.removeListener(listener);
      };
    }
  }, []);

  return prefersDark;
}
