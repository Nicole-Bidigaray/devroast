"use client";

import NumberFlow from "@number-flow/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useTRPC } from "@/trpc/client";

export function HomeMetrics() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.metrics.home.queryOptions());
  const [roastedCodes, setRoastedCodes] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    if (!data) {
      return;
    }

    setRoastedCodes(data.totalRoastedCodes);
    setAvgScore(data.avgScore);
  }, [data]);

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
