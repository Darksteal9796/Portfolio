"use client";

import { useSyncExternalStore } from "react";

const TIME_FORMAT = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

function subscribe(callback: () => void): () => void {
  const id = window.setInterval(callback, 1000);
  return () => window.clearInterval(id);
}

function getSnapshot(): string {
  return TIME_FORMAT.format(new Date());
}

// Renders a stable placeholder on the server to avoid a hydration mismatch.
// The real time is populated on the client via the useSyncExternalStore
// subscription.
function getServerSnapshot(): string {
  return "--:--";
}

export function LocationTile() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Location
      </h2>
      <div className="mt-4">
        <p className="text-sm text-foreground">Pune, India · IST</p>
        <p className="mt-2 font-mono text-3xl font-medium tabular-nums">
          {time}
        </p>
      </div>
    </div>
  );
}
