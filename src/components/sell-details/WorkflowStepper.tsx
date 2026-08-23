import { workflowSteps, type WorkflowStepState } from "@/data/sellDetails";

// Shape geometry measured from the Figma vector paths (fillGeometry) for the
// "work flow" component: each chevron's right point reaches ~10.5px short of
// full width, each notch (all but the first item) cuts ~9px in from the left
// edge, and every vertex — including the notch/point tips — carries a small
// ~2px rounding rather than a hard corner. Frames overlap by 6px (marginLeft
// on every item but the first), which is what leaves the small sliver of
// page background visible between steps.
const HEIGHT = 32;
const POINT = 10.5;
const NOTCH = 9;
const OVERLAP = 6;
const RADIUS = 2;

// Widths are NOT copied from Figma — those were tuned for Figma's own text
// measurements and don't line up evenly with this font stack's rendered
// widths. These are sized from this project's own rendered label widths
// plus a fixed breathing-room padding, so every chip keeps the same visual
// margin around its text.
const WIDTHS: Record<string, number> = {
  Draft: 69,
  "Internal Review": 132,
  "Customer Service Review": 185,
  "Collections Confirmation": 182,
  "e-PMS Receipts Confirmation": 206,
  Completed: 99,
};

type Pt = [number, number];

function roundedPolygonPath(points: Pt[], radius: number): string {
  const n = points.length;
  const commands: string[] = [];
  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const curr = points[i];
    const next = points[(i + 1) % n];
    const distTo = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);
    const dirTo = (a: Pt, b: Pt, len: number): Pt => [(b[0] - a[0]) / len, (b[1] - a[1]) / len];

    const distPrev = distTo(curr, prev);
    const distNext = distTo(curr, next);
    const r = Math.min(radius, distPrev / 2, distNext / 2);
    const towardPrev = dirTo(curr, prev, distPrev);
    const towardNext = dirTo(curr, next, distNext);
    const enter: Pt = [curr[0] + towardPrev[0] * r, curr[1] + towardPrev[1] * r];
    const exit: Pt = [curr[0] + towardNext[0] * r, curr[1] + towardNext[1] * r];

    commands.push(i === 0 ? `M ${enter[0]} ${enter[1]}` : `L ${enter[0]} ${enter[1]}`);
    commands.push(`Q ${curr[0]} ${curr[1]} ${exit[0]} ${exit[1]}`);
  }
  commands.push("Z");
  return commands.join(" ");
}

function verticesFor(width: number, isFirst: boolean, isLast: boolean): Pt[] {
  const pts: Pt[] = [[0, 0]];
  if (isLast) {
    pts.push([width, 0], [width, HEIGHT]);
  } else {
    pts.push([width - POINT, 0], [width, HEIGHT / 2], [width - POINT, HEIGHT]);
  }
  pts.push([0, HEIGHT]);
  if (!isFirst) {
    pts.push([NOTCH, HEIGHT / 2]);
  }
  return pts;
}

function toneFor(state: WorkflowStepState) {
  switch (state) {
    case "done":
      return "bg-accent text-white";
    case "current":
      return "bg-[#598dff] text-white";
    case "pending":
      return "bg-[#e4eaf2] text-label";
  }
}

export function WorkflowStepper() {
  const total = workflowSteps.length;
  return (
    <div className="flex h-8 flex-none items-stretch">
      {workflowSteps.map((step, i) => {
        const isFirst = i === 0;
        const isLast = i === total - 1;
        const width = WIDTHS[step.label];
        return (
          <span
            key={step.label}
            className={
              "flex flex-none items-center justify-center whitespace-nowrap font-body text-[12px] font-medium " +
              toneFor(step.state)
            }
            style={{
              width,
              clipPath: `path('${roundedPolygonPath(verticesFor(width, isFirst, isLast), RADIUS)}')`,
              marginLeft: isFirst ? 0 : -OVERLAP,
              paddingLeft: isFirst ? 0 : NOTCH,
              paddingRight: isLast ? 0 : POINT,
            }}
          >
            {step.label}
          </span>
        );
      })}
    </div>
  );
}
