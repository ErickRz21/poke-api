import { useEffect, useRef, useState } from "react";

export default function useInView(options = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      options
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, isVisible]);

  return { ref, isVisible };
}
