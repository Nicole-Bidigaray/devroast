"use client";

import NumberFlow, { continuous } from "@number-flow/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useTRPC } from "@/trpc/client";

const ROASTED_CODES_ANIMATION_DURATION_MS = 2000;

const numberFlowTiming = {
  duration: 4200,
  easing: "linear",
};

const slowNumberFlowTiming = {
  duration: 6800,
  easing: "linear",
};

const numberFlowOpacityTiming = {
  duration: 700,
  easing: "ease-out",
};

export function HomeMetrics() {
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

  return (
    <section className="flex items-center gap-6">
      <p className="font-sans text-xs text-text-tertiary">
        <NumberFlow
          className="font-mono tabular-nums"
          format={{ maximumFractionDigits: 0 }}
          opacityTiming={numberFlowOpacityTiming}
          plugins={[continuous]}
          spinTiming={slowNumberFlowTiming}
          transformTiming={slowNumberFlowTiming}
          value={roastedCodes}
        />{" "}
        codes roasted
      </p>

      <p className="font-mono text-xs text-text-tertiary">·</p>

      <p className="font-sans text-xs text-text-tertiary">
        avg score:{" "}
        <NumberFlow
          className="font-mono tabular-nums"
          format={{
            maximumFractionDigits: 1,
            minimumFractionDigits: 1,
          }}
          opacityTiming={numberFlowOpacityTiming}
          spinTiming={numberFlowTiming}
          transformTiming={numberFlowTiming}
          value={avgScore}
        />
        /10
      </p>
    </section>
  );
}
