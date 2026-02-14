import { Progress, Skeleton, Space, Tag, Typography } from "..";

const ProposalStatus = ({ stage, stageLabel, statusLabel, progress, draft }) => {
  const isGenerating = stage === "generating";
  const showDraft = Boolean(draft);

  return (
    <Space
      direction="vertical"
      size="middle"
      className={`proposal-status ${isGenerating ? "is-generating" : ""}`}
    >
      <div className="proposal-status__header">
        <div>
          <Typography.Title level={4} className="proposal-title">
            {stageLabel.title}
          </Typography.Title>
          <Typography.Text type="secondary">
            {stageLabel.subtitle}
          </Typography.Text>
        </div>
        <Tag color={isGenerating ? "blue" : "green"}>{stageLabel.stageTag}</Tag>
      </div>

      <Progress
        percent={progress}
        status={isGenerating ? "active" : "normal"}
        showInfo={false}
      />

      <Typography.Text className="proposal-status__message">
        {statusLabel}
      </Typography.Text>

      {showDraft ? (
        <Typography.Paragraph className="proposal-status__draft">
          {draft}
          {isGenerating ? (
            <span className="typing-cursor" aria-hidden="true">
              |
            </span>
          ) : null}
        </Typography.Paragraph>
      ) : (
        <Skeleton active paragraph={{ rows: 4 }} />
      )}
    </Space>
  );
};

export default ProposalStatus;
