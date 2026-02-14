import { useEffect, useMemo, useState } from "react";
import {
  Card,
  Divider,
  Form,
  Space,
  Steps,
  Switch,
  Tag,
  Typography,
} from "..";
import { LNG } from "../../language";
import { proposalInitialValues } from "../../config/dummyData";
import { proposalStages, riskLevelOptions } from "../../db/proposalConfig";
import {
  buildProposalDocument,
  buildProposalSections,
  interpolate,
} from "../../utilities/proposalUtils";
import ProposalActions from "./ProposalActions";
import ProposalForm from "./ProposalForm";
import ProposalPreview from "./ProposalPreview";
import ProposalStatus from "./ProposalStatus";
import "./ProposalGenerator.css";

const ProposalGenerator = ({ themeMode, onToggleTheme }) => {
  const copy = LNG.eng.proposalGenerator;
  const resolvedTheme = themeMode === "dark" ? "dark" : "light";
  const handleThemeChange = onToggleTheme || (() => {});
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState(proposalInitialValues);
  const [stage, setStage] = useState("input");
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [typedDraft, setTypedDraft] = useState("");
  const [progress, setProgress] = useState(0);
  const [downloadNotice, setDownloadNotice] = useState("");

  const sections = useMemo(
    () => buildProposalSections({ values: formValues, copy }),
    [formValues, copy]
  );

  const header = useMemo(() => {
    const subtitle = interpolate(copy.template.headerSubtitle, {
      clientName: formValues.clientName || copy.defaults.clientName,
    });
    return {
      title: copy.template.headerTitle,
      subtitle,
    };
  }, [copy, formValues.clientName]);

  const proposalDocument = useMemo(
    () =>
      buildProposalDocument({
        header,
        sections,
        footer: copy.template.footer,
      }),
    [header, sections, copy.template.footer]
  );

  const fullDraft = useMemo(
    () => sections.map((section) => section.content).join(" "),
    [sections]
  );

  const completion = useMemo(() => {
    const requiredFields = ["projectName", "clientName", "scope"];
    const completed = requiredFields.filter((field) => {
      const value = formValues[field];
      return Boolean(value && String(value).trim());
    }).length;
    return Math.round((completed / requiredFields.length) * 100);
  }, [formValues]);

  const stageIndex = proposalStages.findIndex((item) => item.key === stage);

  const stageStatusLabel = {
    input: copy.generation.statusIdle,
    generating: copy.generation.statusGenerating,
    review: copy.generation.statusReview,
    finalize: copy.generation.statusFinal,
  }[stage];

  useEffect(() => {
    if (!autoGenerate || stage === "finalize" || stage === "generating") return;
    const timeout = setTimeout(() => {
      setStage("generating");
    }, 600);
    return () => clearTimeout(timeout);
  }, [autoGenerate, formValues, stage]);

  useEffect(() => {
    if (stage !== "generating") return;
    if (!fullDraft) {
      setTypedDraft("");
      setProgress(0);
      setStage("review");
      return;
    }

    let index = 0;
    setTypedDraft("");
    setProgress(0);

    const interval = setInterval(() => {
      index += 1;
      setTypedDraft(fullDraft.slice(0, index));
      setProgress(Math.round((index / fullDraft.length) * 100));

      if (index >= fullDraft.length) {
        clearInterval(interval);
        setStage("review");
      }
    }, 18);

    return () => clearInterval(interval);
  }, [stage, fullDraft]);

  useEffect(() => {
    if (!downloadNotice) return;
    const timeout = setTimeout(() => setDownloadNotice(""), 4000);
    return () => clearTimeout(timeout);
  }, [downloadNotice]);

  const handleValuesChange = (_, allValues) => {
    setFormValues(allValues);
  };

  const handleGenerate = () => {
    setStage("generating");
  };

  const handleFinalize = () => {
    setStage("finalize");
  };

  const handleDownload = (format) => {
    const fileBase =
      formValues.projectName ||
      copy.defaults.projectName ||
      copy.defaults.fileNameFallback;
    const fileName = fileBase.trim().replace(/\s+/g, "-").toLowerCase();
    const mimeType =
      format === "pdf"
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    const blob = new Blob([proposalDocument], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.${format}`;
    link.click();
    URL.revokeObjectURL(link.href);
    setDownloadNotice(copy.download.ready);
  };

  const stageLabel =
    stage === "finalize"
      ? {
          title: copy.preview.finalTitle,
          subtitle: copy.preview.finalSubtitle,
          stageTag: copy.stages.finalize,
        }
      : {
          title: copy.preview.draftTitle,
          subtitle: copy.preview.draftSubtitle,
          stageTag: copy.stages[stage] || copy.stages.input,
        };

  const draftToDisplay = stage === "generating" ? typedDraft : fullDraft;

  return (
    <div className={`proposal-app stage-${stage}`}>
      <header className="proposal-header">
        <div>
          <Typography.Title level={2} className="proposal-title">
            {copy.header.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            {copy.header.subtitle}
          </Typography.Paragraph>
        </div>
        <Space wrap className="proposal-header__meta">
          <Tag color="geekblue">{copy.header.templateTag}</Tag>
          <div className="proposal-theme-toggle">
            <Typography.Text>{copy.header.darkMode}</Typography.Text>
            <Switch
              checked={resolvedTheme === "dark"}
              onChange={handleThemeChange}
            />
          </div>
        </Space>
      </header>

      <Card className="proposal-card proposal-steps">
        <Space direction="vertical" size="middle" className="proposal-steps__body">
          <Steps
            current={stageIndex < 0 ? 0 : stageIndex}
            items={proposalStages.map((item) => ({ title: item.label }))}
            size="small"
          />
          <Divider className="proposal-divider" />
          <Typography.Text type="secondary">{stageStatusLabel}</Typography.Text>
        </Space>
      </Card>

      <div className="proposal-grid">
        <div className="proposal-grid__left">
          <Card className="proposal-card">
            <ProposalForm
              form={form}
              values={proposalInitialValues}
              onValuesChange={handleValuesChange}
              autoGenerate={autoGenerate}
              onToggleAutoGenerate={setAutoGenerate}
              completion={completion}
              copy={copy}
              riskOptions={riskLevelOptions}
            />
          </Card>
          <Card className="proposal-card">
            <ProposalStatus
              stage={stage}
              stageLabel={stageLabel}
              statusLabel={stageStatusLabel}
              progress={progress}
              draft={draftToDisplay}
            />
          </Card>
        </div>
        <div className="proposal-grid__right">
          <Card className="proposal-card proposal-preview-card">
            <ProposalPreview
              header={header}
              sections={sections}
              values={formValues}
              copy={copy}
            />
          </Card>
        </div>
      </div>

      <Card className="proposal-card">
        <ProposalActions
          stage={stage}
          copy={copy}
          onGenerate={handleGenerate}
          onFinalize={handleFinalize}
          onDownload={handleDownload}
          downloadNotice={downloadNotice}
        />
      </Card>
    </div>
  );
};

export default ProposalGenerator;
