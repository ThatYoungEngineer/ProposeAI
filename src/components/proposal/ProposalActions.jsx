import { Alert, Button, Space, Typography } from "..";

const ProposalActions = ({
  stage,
  copy,
  onGenerate,
  onFinalize,
  onDownload,
  downloadNotice,
}) => {
  const isGenerating = stage === "generating";
  const isReview = stage === "review";
  const isFinal = stage === "finalize";
  const generateLabel = isReview || isFinal ? copy.actions.regenerate : copy.actions.generate;

  return (
    <Space direction="vertical" size="middle" className="proposal-actions">
      <Space wrap>
        <Button
          type="primary"
          onClick={onGenerate}
          loading={isGenerating}
          disabled={isGenerating}
        >
          {generateLabel}
        </Button>
        {isReview ? (
          <Button type="default" onClick={onFinalize}>
            {copy.actions.finalize}
          </Button>
        ) : null}
        {isFinal ? (
          <>
            <Button type="primary" onClick={() => onDownload("pdf")}>
              {copy.actions.downloadPdf}
            </Button>
            <Button onClick={() => onDownload("docx")}>
              {copy.actions.exportDocx}
            </Button>
          </>
        ) : null}
      </Space>

      {isFinal ? (
        <Typography.Text type="secondary">{copy.download.helper}</Typography.Text>
      ) : null}

      {downloadNotice ? (
        <Alert showIcon type="success" message={downloadNotice} />
      ) : null}
    </Space>
  );
};

export default ProposalActions;
