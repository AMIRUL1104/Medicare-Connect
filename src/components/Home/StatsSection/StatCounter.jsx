"use client";

import CountUp from "react-countup";

/**
 * StatCounter — minimal client island.
 * react-countup needs the browser to animate the number — this is the
 * only piece of the stats card that requires "use client". The parent
 * StatsSection and StatCard stay Server Components.
 */
export default function StatCounter({ value, suffix = "" }) {
  console.log(value);

  return (
    <CountUp
      start={0}
      end={value}
      duration={2}
      separator=","
      suffix={suffix}
      redraw={false}
    />
  );
}
