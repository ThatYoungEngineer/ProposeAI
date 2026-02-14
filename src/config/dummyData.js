import { LNG } from "../language";

const copy = LNG.eng.proposalGenerator;

export const proposalInitialValues = {
  projectName: copy.defaults.projectName,
  clientName: copy.defaults.clientName,
  scope: copy.defaults.scope,
  timelineStart: copy.form.timelineStart.placeholder,
  timelineEnd: copy.form.timelineEnd.placeholder,
  objectives: copy.form.objectives.placeholder,
  deliverables: copy.form.deliverables.placeholder,
  budget: 150000,
  techStack: copy.defaults.techStack,
  riskLevel: copy.defaults.riskLevel,
  notes: copy.defaults.notes,
};
