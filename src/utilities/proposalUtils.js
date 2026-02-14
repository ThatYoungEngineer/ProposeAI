const interpolate = (template, values) => {
  if (!template) return "";
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return values[key] ?? match;
  });
};

const formatCurrency = (value, { locale, currency }) => {
  if (!value && value !== 0) return "";
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) return value;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(numberValue);
};

const formatTimeline = ({ startDate, endDate, fallback }) => {
  if (!startDate && !endDate) return fallback;
  if (startDate && endDate) return `${startDate} - ${endDate}`;
  return startDate || endDate || fallback;
};

const buildProposalSections = ({ values, copy }) => {
  const timelineLabel = formatTimeline({
    startDate: values.timelineStart,
    endDate: values.timelineEnd,
    fallback: copy.defaults.timelineFallback,
  });

  const objectiveList = values.objectives
    ? values.objectives
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const deliverableList = values.deliverables
    ? values.deliverables
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const resolvedRiskLevel = values.riskLevel || copy.defaults.riskLevel;
  const riskLabel = copy.riskOptions?.[resolvedRiskLevel] || resolvedRiskLevel;

  const interpolatedValues = {
    projectName: values.projectName || copy.defaults.projectName,
    clientName: values.clientName || copy.defaults.clientName,
    scope: values.scope || copy.defaults.scope,
    timeline: timelineLabel,
    objectives: objectiveList.length
      ? objectiveList.join(", ")
      : copy.defaults.objectives,
    deliverables: deliverableList.length
      ? deliverableList.join(", ")
      : copy.defaults.deliverables,
    budget:
      values.budget || values.budget === 0
        ? formatCurrency(values.budget, {
          locale: copy.defaults.currencyLocale,
          currency: copy.defaults.currencyCode,
        })
        : copy.defaults.budget,
    techStack: values.techStack || copy.defaults.techStack,
    riskLevel: riskLabel,
    notes: values.notes || copy.defaults.notes,
  };

  return copy.template.sections.map((section) => ({
    ...section,
    content: interpolate(section.content, interpolatedValues),
  }));
};

const buildProposalDocument = ({ header, sections, footer }) => {
  const lines = [header.title, header.subtitle, "", ...sections.flatMap((section) => [
    section.title,
    section.content,
    "",
  ]), footer];

  return lines.filter(Boolean).join("\n");
};

export {
  buildProposalDocument,
  buildProposalSections,
  formatCurrency,
  formatTimeline,
  interpolate,
};
