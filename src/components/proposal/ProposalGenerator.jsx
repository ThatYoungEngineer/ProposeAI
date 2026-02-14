import { useMemo, useRef, useState } from "react";
import { Button, Dropdown, Form, Steps, Typography } from "..";
import { LNG } from "../../language";
import { proposalInitialValues } from "../../config/dummyData";
import proposalsApi from "../../api/proposals";
import ProposalActions from "./ProposalActions";
import ProposalForm from "./ProposalForm";
import "./ProposalGenerator.css";
import { IMGS, ROUTES } from "@/constants";
import { Link } from "react-router-dom";
import ElectricBorder from "../../ui/ElectricBorder";

const ProposalGenerator = () => {
  const copy = LNG.eng.proposalGenerator;
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState(proposalInitialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const previewRef = useRef(null);

  const requiredFields = useMemo(
    () => [
      "clientName",
      "projectTitle",
      "projectScope",
      "objectives",
      "deliverables",
      "timelineEstimate",
    ],
    [],
  );

  const completion = useMemo(() => {
    const completed = requiredFields.filter((field) => {
      const value = formValues[field];
      return Boolean(value && String(value).trim());
    }).length;
    return Math.round((completed / requiredFields.length) * 100);
  }, [formValues, requiredFields]);

  const isGenerateDisabled = requiredFields.some((field) => {
    const value = formValues[field];
    return !(value && String(value).trim());
  });

  const handleValuesChange = (_, allValues) => {
    setFormValues(allValues);
  };

  const extractHtml = (response) => {
    if (!response) return "";
    const logoUrl =
      "https://cdn-lfcdh.nitrocdn.com/mFNjcNCLPSOgjCCHrmuVFgbsPhpOopSJ/assets/images/optimized/rev-42e4ec9/hazentech.com/wp-content/uploads/2025/09/light-logo.svg";
    const rawHtml =
      typeof response === "string"
        ? response
        : typeof response.data === "string"
          ? response.data
          : typeof response.data?.html === "string"
            ? response.data.html
            : typeof response.data?.content === "string"
              ? response.data.content
              : "";
    if (!rawHtml) return "";
    return rawHtml.replace(/<img\b[^>]*>/gi, (tag) => {
      if (/src\s*=/.test(tag)) {
        return tag.replace(/src\s*=\s*(['"]).*?\1/i, `src="${logoUrl}"`);
      }
      return tag.replace("<img", `<img src="${logoUrl}"`);
    });
  };

  const handleGenerate = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await form.validateFields(requiredFields);
      setCurrentStep(1);
      const payload = {
        client_name: formValues.clientName,
        title: formValues.projectTitle,
        description: formValues.projectScope,
        objectives: formValues.objectives,
        deliverables: formValues.deliverables,
        timeline: formValues.timelineEstimate,
        budget_range: formValues.budgetRange || "",
        tech_stack: formValues.technologyStack || "",
        assumptions: formValues.assumptions || "",
        risks: formValues.risks || "",
        team_structure: formValues.teamStructure || "",
        support_model: formValues.supportModel || "",
      };

      const response = await proposalsApi.addProposal(payload);
      if (!response?.ok) {
        setErrorMessage(copy.previewModal.error);
        setCurrentStep(0);
        return;
      }

      const html = extractHtml(response);
      if (!html) {
        setErrorMessage(copy.previewModal.empty);
        setCurrentStep(0);
        return;
      }

      setPreviewHtml(html);
      setIsEditing(false);
      setHasGenerated(true);
      setCurrentStep(2);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    const updatedHtml = previewRef.current?.innerHTML || previewHtml;
    setPreviewHtml(updatedHtml);
    setIsEditing(false);
  };

  const handleDownloadPdf = () => {
    const htmlToPrint = previewRef.current?.innerHTML || previewHtml;
    if (!htmlToPrint) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${copy.previewModal.downloadTitle}</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; }
      h1, h2, h3 { margin: 0 0 12px; }
      p { margin: 0 0 12px; line-height: 1.6; }
    </style>
  </head>
  <body>
    ${htmlToPrint}
  </body>
</html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleExport = ({ key }) => {
    if (key === "pdf") handleDownloadPdf();
  };

  const stepItems = [
    { title: copy.steps.input },
    { title: copy.steps.generating },
    { title: copy.steps.preview },
  ];

  const exportMenu = {
    items: [
      { key: "pdf", label: copy.previewModal.exportPdf },
    ],
    onClick: handleExport,
  };

  return (
    <div className="mx-auto w-screen max-h-[100dvh] h-dvh overflow-auto rounded-2xl">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-0 mt-10">
        <ElectricBorder color="#38bdf8" speed={1.1} chaos={0.03} borderRadius={22}>
          <div className="relative overflow-visible rounded-3xl border border-white/20 bg-white/10 !p-5">
            <Link
              className="w-fit mx-auto flex items-center justify-center"
              to={ROUTES.INDEX}
            >
              <img src={IMGS.COMPLETE_LOGO} alt="" className="w-40 bg-transparent" />
            </Link>
            <div className="mt-6">
              <Steps current={currentStep} items={stepItems} size="small" />
            </div>
            {currentStep === 0 ? (
              <>
                <ProposalForm
                  form={form}
                  values={proposalInitialValues}
                  onValuesChange={handleValuesChange}
                  completion={completion}
                  copy={copy}
                  requiredFields={requiredFields}
                />
                {errorMessage ? (
                  <Typography.Text type="danger">{errorMessage}</Typography.Text>
                ) : null}
                <section className="w-full flex items-center justify-end my-5">
                  <ProposalActions
                    copy={copy}
                    onGenerate={handleGenerate}
                    isGenerateDisabled={isGenerateDisabled}
                    isSubmitting={isSubmitting}
                  />
                </section>
              </>
            ) : null}
            {currentStep === 1 ? (
              <div className="mt-6 rounded-2xl border border-white/20 bg-white/20 p-6 text-center text-slate-700 backdrop-blur">
                <Typography.Title level={4} className="!mb-1">
                  {copy.generating.title}
                </Typography.Title>
                <Typography.Text>{copy.generating.subtitle}</Typography.Text>
              </div>
            ) : null}
            {currentStep === 2 ? (
              <div className="mt-6 flex flex-col gap-6 lg:flex-row !relative">
                <div className="flex-1 rounded-2xl border border-white/30 bg-white/70 p-6 shadow-sm">
                  <div
                    ref={previewRef}
                    className={`text-sm leading-6 text-slate-800 ${
                      isEditing ? "rounded-lg border border-slate-200 p-4" : ""
                    }`}
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </div>
                <aside className="sticky top-6 right-0 w-full h-fit rounded-2xl border border-white/30 bg-white/50 p-5 lg:w-64">
                  <div className="space-y-4">
                    <div>
                      <Typography.Text className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {copy.previewModal.controls}
                      </Typography.Text>
                      <Typography.Title level={5} className="mt-2 !mb-0">
                        {isEditing
                          ? copy.previewModal.editing
                          : copy.previewModal.readOnly}
                      </Typography.Title>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={handleToggleEdit} disabled={isSubmitting}>
                        {isEditing ? copy.previewModal.save : copy.previewModal.edit}
                      </Button>
                      <Button
                        onClick={handleGenerate}
                        loading={isSubmitting}
                        disabled={!hasGenerated || isSubmitting}
                      >
                        {copy.actions.regenerate}
                      </Button>
                      <Dropdown menu={exportMenu} placement="bottomRight">
                        <Button type="primary" disabled={isSubmitting}>
                          {copy.previewModal.export}
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </aside>
              </div>
            ) : null}
          </div>
        </ElectricBorder>
      </div>
    </div>
  );
};

export default ProposalGenerator;
