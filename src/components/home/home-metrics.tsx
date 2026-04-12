"use client";

import NumberFlow, { continuous } from "@number-flow/react";

import { useHomeMetrics } from "@/hooks/use-home-metrics";

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
  const { avgScore, roastedCodes } = useHomeMetrics();

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
