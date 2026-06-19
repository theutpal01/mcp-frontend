import { TiltCard } from "@/components/ui/tilt-card";
import { Layers, Sparkles, Terminal, Activity, RotateCcw, CloudLightning } from "lucide-react";

export function FeaturesGrid() {
  // Mapping explicit capabilities pulled directly from project schema criteria
  const tools = [
    {
      icon: <Layers className="w-5 h-5 text-brand-blue" />,
      title: "Universal Ingest Architecture",
      desc: "Accept OpenAPI specification docs, Swagger 2.x, or active live MCP server URLs to yield standardized canonical structures flawlessly[cite: 2].",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-brand-blue" />,
      title: "Intelligent LLM Tuning",
      desc: "Automatically merges duplicate tools, cleans ambiguous endpoint definitions, and crafts crisp instructions context-built for AI model execution[cite: 2].",
    },
    {
      icon: <Terminal className="w-5 h-5 text-brand-blue" />,
      title: "Automated Evaluation Harness",
      desc: "Spawns automated native agent loops to rigorously isolate tool behavior, testing trajectories before deployment configurations solidify.",
    },
    {
      icon: <Activity className="w-5 h-5 text-brand-blue" />,
      title: "Adversarial Test Matrices",
      desc: "Auto-generates task paths along with deceptive validation traps to score models objectively without demanding brittle manual templates.",
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-brand-blue" />,
      title: "Self-Healing Convergence Loops",
      desc: "Pipes failure transcript sequences right back into correction cycles, fine-tuning until execution scores hit verified stability plateaus.",
    },
    {
      icon: <CloudLightning className="w-5 h-5 text-brand-blue" />,
      title: "Instant Proxy Deployment",
      desc: "Host perfectly sanitized manifests over standard stdio frameworks, cleanly routing execution parameters back safely to original APIs.",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold text-brand-yellow tracking-tight sm:text-4xl">
          Engineered for Clean Agent Execution
        </h2>
        <p className="mt-4 text-brand-blue font-medium text-sm sm:text-base">
          Converting an API to an MCP endpoint takes seconds. PlugFit eliminates the overlapping tools and vague manifests that cause model execution failures[cite: 2].
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((item, idx) => (
          <TiltCard
            key={idx}
            maxRotation={6}
            scale={1.02}
            className="bg-glass-bg backdrop-blur-xl border border-glass-border p-6 rounded-2xl flex flex-col space-y-4"
          >
            <div className="p-2.5 bg-brand-blue/5 rounded-xl border border-brand-blue/10 w-fit">
              {item.icon}
            </div>
            <h3 className="text-lg font-medium text-brand-yellow">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed flex-grow">
              {item.desc}
            </p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}