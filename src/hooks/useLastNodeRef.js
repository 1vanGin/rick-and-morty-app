import { useCallback } from "react";

export function useLastNodeRef(observer, cb, deps) {
  return useCallback(
    (node) => {
      if (deps.loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        //виден ли элемент на экране
        if (entries[0].isIntersecting && deps.hasMore) {
          cb((prevState) => prevState + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [deps.loading, deps.hasMore]
  );
}
