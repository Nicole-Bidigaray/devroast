"use client";

import NumberFlow from "@number-flow/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useTRPC } from "@/trpc/client";

const numberFlowTiming = {
  duration: 1600,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
};

const numberFlowOpacityTiming = {
  duration: 700,
  easing: "ease-out",
};

export function HomeMetrics() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.metrics.home.queryOptions());
  const [roastedCodes, setRoastedCodes] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    if (!data) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setRoastedCodes(data.totalRoastedCodes);
      setAvgScore(data.avgScore);
    }, 220);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [data]);

  return (
    <section className="flex items-center gap-6">
      <p className="font-sans text-xs text-text-tertiary">
        <NumberFlow
          className="font-mono tabular-nums"
          format={{ maximumFractionDigits: 0 }}
          opacityTiming={numberFlowOpacityTiming}
          spinTiming={numberFlowTiming}
          transformTiming={numberFlowTiming}
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
