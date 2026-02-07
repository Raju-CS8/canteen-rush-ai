import { Link } from "react-router-dom";
import { Clock, Zap, ArrowRight, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BREAK_TIME, CURRENT_TIME } from "@/lib/data";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 flex flex-col items-center text-center gap-10">
      {/* Hero */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
          <Zap className="h-3.5 w-3.5" />
          AI-Powered Queue Elimination
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Skip the Line.<br />
          <span className="text-primary">Grab & Go.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Pre-order during class, get a predicted pickup time, and arrive only when your food is ready. No more wasted breaks.
        </p>
      </div>

      {/* Break countdown */}
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">Next Break</span>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="font-mono text-4xl font-bold tracking-wider">{BREAK_TIME}</div>
        <p className="text-sm text-muted-foreground mt-2">Current time: {CURRENT_TIME} · 45 min remaining</p>
        <Link to="/pre-order" className="block mt-5">
          <Button size="lg" className="w-full text-base gap-2 font-semibold">
            Pre-Order Food <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
        {[
          { icon: TrendingUp, label: "Avg. Wait Saved", value: "12 min" },
          { icon: Users, label: "Active Students", value: "284" },
          { icon: Zap, label: "Orders Today", value: "147" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-4 text-center">
            <s.icon className="h-5 w-5 mx-auto text-primary mb-2" />
            <div className="text-xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
