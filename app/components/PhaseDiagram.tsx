type Step = {
  label: string;
  kind?: "input" | "node" | "output";
};

type Phase = {
  title: string;
  caption: string;
  steps: Step[];
};

const phases: Phase[] = [
  {
    title: "Record phase",
    caption: "Everything is real",
    steps: [
      { label: "Real API requests", kind: "input" },
      { label: "Keploy" },
      { label: "Go API" },
      { label: "MySQL" },
      { label: "Tests + mocks saved to disk", kind: "output" },
    ],
  },
  {
    title: "Replay phase",
    caption: "Database is mocked",
    steps: [
      { label: "Recorded test cases", kind: "input" },
      { label: "Keploy" },
      { label: "Go API" },
      { label: "Compare responses" },
      { label: "PASS / FAIL", kind: "output" },
    ],
  },
];

export function PhaseDiagram() {
  return (
    <figure className="phase-diagram" aria-label="Record and replay phases">
      {phases.map((phase, i) => (
        <div className="phase" key={phase.title}>
          <div className="phase-header">
            <span className="phase-index">{i + 1}</span>
            <div>
              <div className="phase-title">{phase.title}</div>
              <div className="phase-caption">{phase.caption}</div>
            </div>
          </div>
          <ol className="phase-steps">
            {phase.steps.map((step, j) => (
              <li
                key={step.label}
                className={`phase-step phase-step--${step.kind ?? "node"}`}
              >
                {j > 0 && <span className="phase-arrow" aria-hidden="true" />}
                <span className="phase-box">{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </figure>
  );
}
