import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";

const CardNav = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#ffffff",
  menuColor = "#000000",
  buttonBgColor = "#111111",
  buttonTextColor = "#ffffff",
  ctaLabel = "Get Started",
  onCtaClick,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);

  const calculateHeight = () => {
    const navElement = navRef.current;
    if (!navElement) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentElement = navElement.querySelector(".card-nav-content");
      if (contentElement) {
        const previousVisibility = contentElement.style.visibility;
        const previousPointerEvents = contentElement.style.pointerEvents;
        const previousPosition = contentElement.style.position;
        const previousHeight = contentElement.style.height;

        contentElement.style.visibility = "visible";
        contentElement.style.pointerEvents = "auto";
        contentElement.style.position = "static";
        contentElement.style.height = "auto";

        contentElement.offsetHeight;

        const topBarHeight = 60;
        const padding = 16;
        const contentHeight = contentElement.scrollHeight;

        contentElement.style.visibility = previousVisibility;
        contentElement.style.pointerEvents = previousPointerEvents;
        contentElement.style.position = previousPosition;
        contentElement.style.height = previousHeight;

        return topBarHeight + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navElement = navRef.current;
    if (!navElement) return null;

    gsap.set(navElement, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const timeline = gsap.timeline({ paused: true });

    timeline.to(navElement, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    timeline.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1"
    );

    return timeline;
  };

  useLayoutEffect(() => {
    const timeline = createTimeline();
    timelineRef.current = timeline;

    return () => {
      timeline?.kill();
      timelineRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!timelineRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        timelineRef.current.kill();
        const newTimeline = createTimeline();
        if (newTimeline) {
          newTimeline.progress(1);
          timelineRef.current = newTimeline;
        }
        return;
      }

      timelineRef.current.kill();
      const resetTimeline = createTimeline();
      if (resetTimeline) {
        timelineRef.current = resetTimeline;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const handleToggleMenu = () => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      timeline.play(0);
      return;
    }

    setIsHamburgerOpen(false);
    timeline.eventCallback("onReverseComplete", () => setIsExpanded(false));
    timeline.reverse();
  };

  const handleToggleKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleToggleMenu();
  };

  const handleCtaClick = () => {
    if (!onCtaClick) return;
    onCtaClick();
  };

  const handleCtaKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleCtaClick();
  };

  const setCardRef = (index) => (element) => {
    if (element) cardsRef.current[index] = element;
  };

  const resolvedItems = Array.isArray(items) ? items.slice(0, 3) : [];

  return (
    <div
      className={`card-nav-container absolute left-1/2 top-[1.2em] z-[99] w-[90%] max-w-[800px] -translate-x-1/2 md:top-[2em] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} relative block h-[60px] rounded-xl p-0 shadow-md will-change-[height]`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 z-[2] flex h-[60px] items-center justify-between p-2 pl-[1.1rem]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group order-2 flex h-full cursor-pointer flex-col items-center justify-center gap-[6px] md:order-none`}
            onClick={handleToggleMenu}
            onKeyDown={handleToggleKeyDown}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
            style={{ color: menuColor }}
          >
            <div
              className={`hamburger-line h-[2px] w-[30px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line h-[2px] w-[30px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container order-1 flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:order-none">
            <img src={logo} alt={logoAlt} className="logo h-[28px]" />
          </div>

          <button
            type="button"
            className="card-nav-cta-button hidden h-full items-center rounded-[calc(0.75rem-0.2rem)] border-0 px-4 font-medium transition-colors duration-300 md:inline-flex"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            onClick={handleCtaClick}
            onKeyDown={handleCtaKeyDown}
            aria-label={ctaLabel}
            tabIndex={0}
          >
            {ctaLabel}
          </button>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 z-[1] flex flex-col items-stretch justify-start gap-2 p-2 ${
            isExpanded ? "visible pointer-events-auto" : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {resolvedItems.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="nav-card relative flex h-auto min-h-[60px] min-w-0 flex-[1_1_auto] select-none flex-col gap-2 rounded-[calc(0.75rem-0.2rem)] p-[12px_16px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(index)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label text-[18px] font-normal tracking-[-0.5px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {(item.links || []).map((linkItem, linkIndex) => (
                  <a
                    key={`${linkItem.label}-${linkIndex}`}
                    className="nav-card-link inline-flex cursor-pointer items-center gap-[6px] no-underline transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                    href={linkItem.href || "#"}
                    aria-label={linkItem.ariaLabel}
                    tabIndex={0}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                    {linkItem.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
