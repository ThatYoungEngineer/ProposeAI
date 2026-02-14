import { LNG } from "../language";

const copy = LNG.eng.proposalGenerator;

export const proposalStages = [
  { key: "input", label: copy.stages.input },
  { key: "generating", label: copy.stages.generating },
  { key: "review", label: copy.stages.review },
  { key: "finalize", label: copy.stages.finalize },
];

export const riskLevelOptions = [
  { value: "low", label: copy.riskOptions.low },
  { value: "moderate", label: copy.riskOptions.moderate },
  { value: "high", label: copy.riskOptions.high },
];
