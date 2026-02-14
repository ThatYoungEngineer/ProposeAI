import { Button, Space } from "..";

const ProposalActions = ({ copy, onGenerate, isSubmitting, isGenerateDisabled }) => {
  return (
    <Space direction="vertical" size="middle" className="proposal-actions">
      <Space direction="vertical" size="small">
        <Button
          type="primary"
          onClick={onGenerate}
          loading={isSubmitting}
          disabled={isSubmitting || isGenerateDisabled}
        >
          {isSubmitting ? copy.actions.generating : copy.actions.generate}
        </Button>
      </Space>
    </Space>
  );
};

export default ProposalActions;
