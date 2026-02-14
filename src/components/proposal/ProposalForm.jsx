import {
  Form,
  Input,
  InputNumber,
  Progress,
  Select,
  Space,
  Switch,
  Typography,
} from "..";

const ProposalForm = ({
  form,
  values,
  onValuesChange,
  autoGenerate,
  onToggleAutoGenerate,
  completion,
  copy,
  riskOptions,
}) => {
  return (
    <Space direction="vertical" size="large" className="proposal-form">
      <div className="proposal-form__header">
        <div>
          <Typography.Title level={4} className="proposal-title">
            {copy.form.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            {copy.form.description}
          </Typography.Paragraph>
        </div>
        <div className="proposal-toggle">
          <Typography.Text>{copy.form.autoGenerate}</Typography.Text>
          <Switch checked={autoGenerate} onChange={onToggleAutoGenerate} />
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
      >
        <div className="proposal-form__grid">
          <Form.Item
            name="projectName"
            label={copy.form.projectName.label}
            rules={[{ required: true, message: copy.form.projectName.required }]}
          >
            <Input placeholder={copy.form.projectName.placeholder} />
          </Form.Item>
          <Form.Item
            name="clientName"
            label={copy.form.clientName.label}
            rules={[{ required: true, message: copy.form.clientName.required }]}
          >
            <Input placeholder={copy.form.clientName.placeholder} />
          </Form.Item>
          <Form.Item
            name="scope"
            label={copy.form.scope.label}
            rules={[{ required: true, message: copy.form.scope.required }]}
            className="proposal-span-2"
          >
            <Input.TextArea
              placeholder={copy.form.scope.placeholder}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item name="timelineStart" label={copy.form.timelineStart.label}>
            <Input type="date" placeholder={copy.form.timelineStart.placeholder} />
          </Form.Item>
          <Form.Item name="timelineEnd" label={copy.form.timelineEnd.label}>
            <Input type="date" placeholder={copy.form.timelineEnd.placeholder} />
          </Form.Item>
          <Form.Item
            name="objectives"
            label={copy.form.objectives.label}
            className="proposal-span-2"
          >
            <Input.TextArea
              placeholder={copy.form.objectives.placeholder}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            name="deliverables"
            label={copy.form.deliverables.label}
            className="proposal-span-2"
          >
            <Input.TextArea
              placeholder={copy.form.deliverables.placeholder}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item name="budget" label={copy.form.budget.label}>
            <InputNumber
              min={0}
              placeholder={copy.form.budget.placeholder}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="riskLevel" label={copy.form.riskLevel.label}>
            <Select
              placeholder={copy.form.riskLevel.placeholder}
              options={riskOptions}
            />
          </Form.Item>
          <Form.Item
            name="techStack"
            label={copy.form.techStack.label}
            className="proposal-span-2"
          >
            <Input placeholder={copy.form.techStack.placeholder} />
          </Form.Item>
          <Form.Item
            name="notes"
            label={copy.form.notes.label}
            className="proposal-span-2"
          >
            <Input.TextArea
              placeholder={copy.form.notes.placeholder}
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
        </div>
      </Form>
    </Space>
  );
};

export default ProposalForm;
