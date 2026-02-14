import {
  Form,
  Input,
  Progress,
  Space,
  Typography,
} from "..";

const ProposalForm = ({
  form,
  values,
  onValuesChange,
  completion,
  copy,
  requiredFields,
}) => {
  const requiredSet = new Set(requiredFields || []);

  const renderLabel = (label, fieldKey) => {
    const isRequired = requiredSet.has(fieldKey);
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[color:var(--text-primary)]">
          {label}
        </span>
        {isRequired ? (
          <span className="text-xs text-red-500">*</span>
        ) : (
          <span className="text-xs text-[color:var(--text-secondary)]">
            {copy.form.optionalLabel}
          </span>
        )}
      </div>
    );
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      <div className="proposal-form__header mt-5">
        <div>
          <Typography.Title level={4} className="proposal-title">
            {copy.form.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            {copy.form.description}
          </Typography.Paragraph>
        </div>
      </div>

      <div className="proposal-completion">
        <Typography.Text>{copy.form.completionLabel}</Typography.Text>
        <Progress percent={completion} size="small" showInfo={false} />
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={values}
        onValuesChange={onValuesChange}
        requiredMark={false}
        validateTrigger="onChange"
        className="proposal-form-glass"
      >
        <div className="proposal-form__grid">
          <Form.Item
            name="clientName"
            label={renderLabel(copy.form.clientName.label, "clientName")}
            rules={[{ required: true, message: copy.form.clientName.required }]}
            hasFeedback
          >
            <Input placeholder={copy.form.clientName.placeholder} />
          </Form.Item>
          <Form.Item
            name="projectTitle"
            label={renderLabel(copy.form.projectTitle.label, "projectTitle")}
            rules={[{ required: true, message: copy.form.projectTitle.required }]}
            hasFeedback
          >
            <Input placeholder={copy.form.projectTitle.placeholder} />
          </Form.Item>
          <Form.Item
            name="projectScope"
            label={renderLabel(copy.form.projectScope.label, "projectScope")}
            rules={[{ required: true, message: copy.form.projectScope.required }]}
            className="proposal-span-2"
            hasFeedback
          >
            <Input.TextArea
              placeholder={copy.form.projectScope.placeholder}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            name="timelineEstimate"
            label={renderLabel(copy.form.timelineEstimate.label, "timelineEstimate")}
            rules={[
              { required: true, message: copy.form.timelineEstimate.required },
            ]}
            hasFeedback
          >
            <Input placeholder={copy.form.timelineEstimate.placeholder} />
          </Form.Item>
          <Form.Item
            name="objectives"
            label={renderLabel(copy.form.objectives.label, "objectives")}
            className="proposal-span-2"
            rules={[{ required: true, message: copy.form.objectives.required }]}
            hasFeedback
          >
            <Input.TextArea
              placeholder={copy.form.objectives.placeholder}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            name="deliverables"
            label={renderLabel(copy.form.deliverables.label, "deliverables")}
            className="proposal-span-2"
            rules={[{ required: true, message: copy.form.deliverables.required }]}
            hasFeedback
          >
            <Input.TextArea
              placeholder={copy.form.deliverables.placeholder}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            name="budgetRange"
            label={renderLabel(copy.form.budgetRange.label, "budgetRange")}
          >
            <Input placeholder={copy.form.budgetRange.placeholder} />
          </Form.Item>
          <Form.Item
            name="technologyStack"
            label={renderLabel(copy.form.technologyStack.label, "technologyStack")}
          >
            <Input placeholder={copy.form.technologyStack.placeholder} />
          </Form.Item>
          <Form.Item
            name="assumptions"
            label={renderLabel(copy.form.assumptions.label, "assumptions")}
            className="proposal-span-2"
          >
            <Input.TextArea
              placeholder={copy.form.assumptions.placeholder}
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
          <Form.Item
            name="risks"
            label={renderLabel(copy.form.risks.label, "risks")}
            className="proposal-span-2"
          >
            <Input.TextArea
              placeholder={copy.form.risks.placeholder}
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
          <Form.Item
            name="teamStructure"
            label={renderLabel(copy.form.teamStructure.label, "teamStructure")}
            className="proposal-span-2"
          >
            <Input.TextArea
              placeholder={copy.form.teamStructure.placeholder}
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
          <Form.Item
            name="supportModel"
            label={renderLabel(copy.form.supportModel.label, "supportModel")}
            className="proposal-span-2"
          >
            <Input.TextArea
              placeholder={copy.form.supportModel.placeholder}
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
        </div>
      </Form>
    </Space>
  );
};

export default ProposalForm;
