"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useTRPC } from "@/hooks/use-trpc";

const ROASTED_CODES_ANIMATION_DURATION_MS = 2000;

type HomeMetricsResult = {
  avgScore: number;
  roastedCodes: number;
};

export function useHomeMetrics(): HomeMetricsResult {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.roast.getStats.queryOptions());
  const [roastedCodes, setRoastedCodes] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    if (!data) {
      return;
    }

    let animationFrameId = 0;
    const target = data.totalRoasts;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(
        elapsed / ROASTED_CODES_ANIMATION_DURATION_MS,
        1,
      );
      const nextValue = Math.round(target * progress);

      setRoastedCodes((currentValue) =>
        currentValue === nextValue ? currentValue : nextValue,
      );

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [data]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setAvgScore(data.avgScore);
  }, [data]);

  return { avgScore, roastedCodes };
}
