import { Alert, Badge, Divider, Space, Tag, Typography } from "..";
import { formatCurrency, formatTimeline } from "../../utilities/proposalUtils";

const ProposalPreview = ({ header, sections, values, copy }) => {
  const timelineLabel = formatTimeline({
    startDate: values.timelineStart,
    endDate: values.timelineEnd,
    fallback: copy.defaults.timelineFallback,
  });

  const resolvedRiskLevel = values.riskLevel || copy.defaults.riskLevel;
  const riskLabel = copy.riskOptions[resolvedRiskLevel] || resolvedRiskLevel;

  const previewTags = [
    {
      label: copy.form.projectName.label,
      value: values.projectName || copy.defaults.projectName,
    },
    {
      label: copy.form.clientName.label,
      value: values.clientName || copy.defaults.clientName,
    },
    {
      label: copy.form.timelineStart.label,
      value: timelineLabel,
    },
    {
      label: copy.form.budget.label,
      value:
        values.budget || values.budget === 0
          ? formatCurrency(values.budget, {
              locale: copy.defaults.currencyLocale,
              currency: copy.defaults.currencyCode,
            })
          : copy.defaults.budget,
    },
    {
      label: copy.form.riskLevel.label,
      value: riskLabel,
    },
  ];

  return (
    <Space direction="vertical" size="large" className="proposal-preview">
      <div className="proposal-preview__intro">
        <Typography.Title level={4} className="proposal-title">
          {copy.preview.title}
        </Typography.Title>
        <Typography.Text type="secondary">{copy.preview.subtitle}</Typography.Text>
      </div>
      <div className="proposal-preview__header">
        <div>
          <Typography.Title level={3} className="proposal-title">
            {header.title}
          </Typography.Title>
          <Typography.Text type="secondary">{header.subtitle}</Typography.Text>
        </div>
        <Badge count={copy.header.liveBadge} className="proposal-badge" />
      </div>

      <Space wrap className="proposal-preview__tags">
        {previewTags.map((item) => (
          <Tag key={item.label} className="proposal-tag">
            {item.label}: {item.value}
          </Tag>
        ))}
      </Space>

      <Divider />

      {sections.map((section) => (
        <div key={section.key} className="proposal-preview__section">
          <Typography.Title level={5} className="proposal-section-title">
            {section.title}
          </Typography.Title>
          <Typography.Paragraph>{section.content}</Typography.Paragraph>
        </div>
      ))}

      <Divider />
      <Typography.Text type="secondary" className="proposal-footer">
        {copy.template.footer}
      </Typography.Text>

      <Alert
        type="success"
        showIcon
        message={copy.preview.complianceTitle}
        description={copy.preview.complianceSubtitle}
      />
    </Space>
  );
};

export default ProposalPreview;
