import { useEffect, useRef, useState } from "react";

interface UseAutoScrollOptions {
  threshold?: number;
}

interface UseAutoScrollReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  shouldAutoScroll: boolean;
  scrollToBottom: () => void;
  handleScroll: () => void;
  checkIfFull: () => boolean;
}

export const useAutoScroll = <T extends unknown>(
  dependencies: T[],
  options: UseAutoScrollOptions = {}
): UseAutoScrollReturn => {
  const { threshold = 100 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !shouldAutoScroll) return;

    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [...dependencies, shouldAutoScroll]);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const isScrollNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      threshold;

    setShouldAutoScroll(isScrollNearBottom);
  };

  const scrollToBottom = () => {
    if (!containerRef.current) return;

    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
    setShouldAutoScroll(true);
  };

  const checkIfFull = () => {
    if (!containerRef.current) return false;
    return (
      containerRef.current.scrollHeight > containerRef.current.clientHeight
    );
  };

  return {
    containerRef,
    shouldAutoScroll,
    scrollToBottom,
    handleScroll,
    checkIfFull,
  };
};
