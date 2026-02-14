export default {
  eng: {
    landingPage: {
      title: "AI-Powered Proposal Generation",
      subtitle:
        "Capture project details in a clean, validated form and generate client-ready proposals with confidence.",
      cta: "Generate Proposal",
      customize: {
        title: "Customize",
        mouseInteraction: "Mouse Interaction",
        mouseRepulsion: "Mouse Repulsion",
        sliders: [
          {
            key: "density",
            label: "Density",
            min: 0.2,
            max: 2,
            step: 0.1,
            format: (value) => value.toFixed(1),
            onChange:
              ({ setDensity }) =>
              (value) =>
                setDensity(value),
          },
          {
            key: "glowIntensity",
            label: "Glow Intensity",
            min: 0,
            max: 1,
            step: 0.05,
            format: (value) => value.toFixed(2),
            onChange:
              ({ setGlowIntensity }) =>
              (value) =>
                setGlowIntensity(value),
          },
          {
            key: "saturation",
            label: "Saturation",
            min: 0,
            max: 1,
            step: 0.05,
            format: (value) => value.toFixed(2),
            onChange:
              ({ setSaturation }) =>
              (value) =>
                setSaturation(value),
          },
          {
            key: "hueShift",
            label: "Hue Shift",
            min: 0,
            max: 360,
            step: 5,
            format: (value) => `${Math.round(value)}°`,
            onChange:
              ({ setHueShift }) =>
              (value) =>
                setHueShift(value),
          },
          {
            key: "twinkleIntensity",
            label: "Twinkle Intensity",
            min: 0,
            max: 1,
            step: 0.05,
            format: (value) => value.toFixed(2),
            onChange:
              ({ setTwinkleIntensity }) =>
              (value) =>
                setTwinkleIntensity(value),
          },
          {
            key: "rotationSpeed",
            label: "Rotation Speed",
            min: 0,
            max: 0.6,
            step: 0.02,
            format: (value) => value.toFixed(2),
            onChange:
              ({ setRotationSpeed }) =>
              (value) =>
                setRotationSpeed(value),
          },
          {
            key: "repulsionStrength",
            label: "Repulsion Strength",
            min: 0,
            max: 6,
            step: 0.2,
            format: (value) => value.toFixed(1),
            onChange:
              ({ setRepulsionStrength }) =>
              (value) =>
                setRepulsionStrength(value),
          },
          {
            key: "autoCenterRepulsion",
            label: "Auto Center Repulsion",
            min: 0,
            max: 2,
            step: 0.1,
            format: (value) => value.toFixed(1),
            onChange:
              ({ setAutoCenterRepulsion }) =>
              (value) =>
                setAutoCenterRepulsion(value),
          },
          {
            key: "starSpeed",
            label: "Star Speed",
            min: 0,
            max: 2,
            step: 0.1,
            format: (value) => value.toFixed(1),
            onChange:
              ({ setStarSpeed }) =>
              (value) =>
                setStarSpeed(value),
          },
          {
            key: "animationSpeed",
            label: "Animation Speed",
            min: 0,
            max: 4,
            step: 0.1,
            format: (value) => value.toFixed(1),
            onChange:
              ({ setAnimationSpeed }) =>
              (value) =>
                setAnimationSpeed(value),
          },
        ],
      },
    },
    minimalNavbar: {
      brand: "React Bits",
      links: [
        { key: "home", label: "Home", href: "/" },
        { key: "docs", label: "Docs", href: "/generate-propsal" },
      ],
    },
    proposalGenerator: {
      header: {
        title: "ProposeAI",
        subtitle:
          "Design, generate, and refine client-ready proposals with real-time AI drafting and a compliant company template.",
        templateTag: "",
        liveBadge: "Live",
        darkMode: "Dark mode",
      },
      stages: {
        input: "Input",
        generating: "Generating",
        review: "Preview",
        finalize: "Finalize",
      },
      steps: {
        input: "Input",
        generating: "Generating",
        preview: "Preview",
      },
      form: {
        title: "Proposal Inputs",
        description:
          "Share the client and project details below to generate a tailored proposal.",
        optionalLabel: "Optional",
        clientName: {
          label: "Client name",
          placeholder: "Northwind Logistics",
          required: "Client name is required.",
        },
        projectTitle: {
          label: "Project title",
          placeholder: "Horizon CRM Rebuild",
          required: "Project title is required.",
        },
        projectScope: {
          label: "Project description / scope",
          placeholder:
            "Modernize the CRM to improve sales forecasting, lead qualification, and reporting.",
          required: "Project description is required.",
        },
        timelineEstimate: {
          label: "Timeline estimate",
          placeholder: "10-12 weeks",
          required: "Timeline estimate is required.",
        },
        objectives: {
          label: "Key objectives (one per line)",
          placeholder:
            "Increase win rate by 15%\nAutomate weekly pipeline reporting\nImprove lead response time",
          required: "Objectives are required.",
        },
        deliverables: {
          label: "Deliverables (one per line)",
          placeholder:
            "Discovery workshop\nAI-assisted lead scoring\nExecutive dashboards",
          required: "Deliverables are required.",
        },
        budgetRange: {
          label: "Budget range",
          placeholder: "$50k - $75k",
        },
        technologyStack: {
          label: "Technology stack",
          placeholder: "React, Node.js, PostgreSQL, OpenAI",
        },
        assumptions: {
          label: "Assumptions",
          placeholder: "Client provides weekly stakeholder access and data extracts.",
        },
        risks: {
          label: "Risks",
          placeholder: "Legacy system access delays, change management adoption.",
        },
        teamStructure: {
          label: "Team structure",
          placeholder: "PM, Tech Lead, 2x Engineers, QA, UX",
        },
        supportModel: {
          label: "Support model",
          placeholder: "30-day hypercare with weekly check-ins",
        },
        completionLabel: "Completion",
      },
      actions: {
        generate: "Generate proposal",
        generating: "Generating...",
        regenerate: "Regenerate draft",
        finalize: "Finalize proposal",
        downloadPdf: "Download PDF",
        exportDocx: "Export DOCX",
      },
      previewModal: {
        title: "Generated Proposal",
        edit: "Edit",
        save: "Save",
        download: "Download PDF",
        close: "Close",
        downloadTitle: "Proposal",
        downloadFileName: "proposal",
        export: "Export",
        exportPdf: "Export PDF",
        controls: "Controls",
        readOnly: "Read-only",
        editing: "Editing",
        error: "Failed to generate proposal. Please try again.",
        empty: "The response did not include any HTML to preview.",
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
      generating: {
        title: "Generating proposal",
        subtitle: "We’re creating your proposal based on the latest inputs.",
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
