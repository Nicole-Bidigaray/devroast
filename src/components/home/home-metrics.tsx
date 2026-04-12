"use client";

import NumberFlow from "@number-flow/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useTRPC } from "@/trpc/client";

export function HomeMetrics() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.metrics.home.queryOptions());
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const roastedCodes = animate ? data.totalRoastedCodes : 0;
  const avgScore = animate ? data.avgScore : 0;

  return (
    <section className="flex items-center gap-6">
      <p className="font-sans text-xs text-text-tertiary">
        <NumberFlow
          className="font-mono tabular-nums"
          format={{ maximumFractionDigits: 0 }}
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
          value={avgScore}
        />
        /10
      </p>
    </section>
  );
}

export function HomeMetricsSkeleton() {
  return (
    <section className="flex items-center gap-6">
      <div className="h-3 w-36 animate-pulse bg-bg-surface" />
      <div className="h-3 w-2 animate-pulse bg-bg-surface" />
      <div className="h-3 w-26 animate-pulse bg-bg-surface" />
    </section>
  );
}
