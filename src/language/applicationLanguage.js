export default {
  eng: {
    proposalGenerator: {
      header: {
        title: "AI-Powered Proposal Studio",
        subtitle:
          "Design, generate, and refine client-ready proposals with real-time AI drafting and a compliant company template.",
        templateTag: "Company Template v2.1",
        liveBadge: "Live",
        darkMode: "Dark mode",
      },
      stages: {
        input: "Input",
        generating: "Generating",
        review: "Preview",
        finalize: "Finalize",
      },
      form: {
        title: "Project Details",
        description:
          "Provide the key project details. The proposal updates in real time as you type.",
        projectName: {
          label: "Project name",
          placeholder: "Horizon CRM Rebuild",
          required: "Project name is required.",
        },
        clientName: {
          label: "Client name",
          placeholder: "Northwind Logistics",
          required: "Client name is required.",
        },
        scope: {
          label: "Scope overview",
          placeholder:
            "Modernize the CRM to improve sales forecasting, lead qualification, and reporting.",
          required: "Scope overview is required.",
        },
        timelineStart: {
          label: "Start date",
          placeholder: "2026-03-02",
        },
        timelineEnd: {
          label: "Target completion",
          placeholder: "2026-07-30",
        },
        objectives: {
          label: "Objectives (one per line)",
          placeholder:
            "Increase win rate by 15%\nAutomate weekly pipeline reporting\nImprove lead response time",
        },
        deliverables: {
          label: "Key deliverables (one per line)",
          placeholder:
            "Discovery workshop\nAI-assisted lead scoring\nExecutive dashboards",
        },
        budget: {
          label: "Estimated budget (USD)",
          placeholder: "150000",
        },
        techStack: {
          label: "Preferred tech stack",
          placeholder: "React, Node.js, PostgreSQL, OpenAI",
        },
        riskLevel: {
          label: "Risk profile",
          placeholder: "Select risk level",
        },
        notes: {
          label: "Special notes",
          placeholder:
            "Include rollout support and enablement for regional sales teams.",
        },
        autoGenerate: "Auto-generate draft",
        completionLabel: "Completion",
      },
      actions: {
        generate: "Generate proposal",
        regenerate: "Regenerate draft",
        finalize: "Finalize proposal",
        downloadPdf: "Download PDF",
        exportDocx: "Export DOCX",
      },
      preview: {
        title: "Live Proposal Preview",
        subtitle: "Template-compliant preview with injected client data.",
        draftTitle: "AI Draft",
        draftSubtitle:
          "Streaming draft content while the AI composes your proposal.",
        finalTitle: "Finalized Proposal",
        finalSubtitle:
          "Review the fully injected document before exporting.",
        complianceTitle: "Template Compliance",
        complianceSubtitle: "All sections align with the company format.",
      },
      generation: {
        statusIdle: "Awaiting project inputs.",
        statusGenerating: "Generating proposal draft...",
        statusReview: "Draft ready for review.",
        statusFinal: "Proposal finalized and export-ready.",
        typingLabel: "AI is drafting",
      },
      download: {
        helper:
          "Exports are provided as placeholder text files until backend document generation is connected.",
        ready: "Your download is ready.",
      },
      template: {
        headerTitle: "Company Proposal",
        headerSubtitle: "Prepared for {clientName}",
        footer: "Confidential - Internal Proposal",
        sections: [
          {
            key: "summary",
            title: "Executive Summary",
            content:
              "{projectName} will elevate {clientName}'s delivery performance by focusing on {scope}.",
          },
          {
            key: "objectives",
            title: "Strategic Objectives",
            content:
              "Primary outcomes include {objectives} while maintaining a {riskLevel} risk profile.",
          },
          {
            key: "approach",
            title: "Proposed Approach",
            content:
              "We will deliver a phased program across {timeline} using {techStack} to ensure adoption and scalability.",
          },
          {
            key: "deliverables",
            title: "Key Deliverables",
            content:
              "The engagement includes {deliverables} alongside enablement and rollout support.",
          },
          {
            key: "investment",
            title: "Investment & Commercials",
            content:
              "Estimated investment is {budget}, inclusive of discovery, build, and rollout phases.",
          },
          {
            key: "notes",
            title: "Special Considerations",
            content: "Additional notes: {notes}.",
          },
        ],
      },
      defaults: {
        projectName: "Next-Gen CRM Modernization",
        clientName: "Northwind Logistics",
        scope:
          "streamlined opportunity management, unified customer data, and AI-driven forecasting",
        objectives:
          "higher pipeline visibility, faster lead response, and sales enablement automation",
        deliverables:
          "discovery workshops, AI scoring, dashboard rollout, and enablement",
        budget: "$150,000",
        techStack: "React, Node.js, PostgreSQL, OpenAI",
        riskLevel: "moderate",
        notes: "Include rollout support and enablement for regional sales teams.",
        timelineFallback: "Q2 2026",
        currencyLocale: "en-US",
        currencyCode: "USD",
        fileNameFallback: "proposal",
      },
      riskOptions: {
        low: "Low",
        moderate: "Moderate",
        high: "High",
      },
    },
  },
};
