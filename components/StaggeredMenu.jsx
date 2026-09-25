"use client";

// Adapted from React Bits' <StaggeredMenu /> (https://reactbits.dev).
// GSAP targets panel elements via data-sm="…" hooks since CSS Module class
// names are hashed.

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Icon from "./Icon";
import styles from "./StaggeredMenu.module.css";

export default function StaggeredMenu({
  position = "right",
  colors = ["var(--gray-warm)", "var(--ink)"],
  items = [],
  displayItemNumbering = true,
  logo = null,
  logoVisible = true,
  openLabel = "Reach out",
  closeLabel = "Close",
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  children,
  className = "",
  ...rest
}) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const bubbleRef = useRef(null);
  const textInnerRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const [textLines, setTextLines] = useState([openLabel, closeLabel]);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !preContainer || !icon || !textInner) return;

      const preLayers = Array.from(preContainer.querySelectorAll("[data-sm='prelayer']"));
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      // x: 0 clears the CSS pre-hydration translateX(100%), which GSAP would
      // otherwise parse as a px offset and keep on top of xPercent.
      gsap.set([panel, ...preLayers], { x: 0, xPercent: offscreen, opacity: 1 });
      gsap.set(preContainer, { opacity: 1 });
      gsap.set(plusHRef.current, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusVRef.current, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(bubbleRef.current, { rotate: 0, scale: 1, opacity: 1 });
      gsap.set(textInner, { yPercent: 0 });
    });
    return () => ctx.revert();
  }, [position]);

  const resetPanelContents = useCallback((panel) => {
    const labelEls = panel.querySelectorAll("[data-sm='label']");
    const numberEls = panel.querySelectorAll("[data-sm='item']");
    const extra = panel.querySelector("[data-sm='extra']");
    if (labelEls.length) gsap.set(labelEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
    if (extra) gsap.set(extra, { y: 25, opacity: 0 });
  }, []);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const labelEls = Array.from(panel.querySelectorAll("[data-sm='label']"));
    const numberEls = displayItemNumbering
      ? Array.from(panel.querySelectorAll("[data-sm='item']"))
      : [];
    const extra = panel.querySelector("[data-sm='extra']");
    resetPanelContents(panel);

    const offscreen = position === "left" ? -100 : 100;
    const tl = gsap.timeline({ paused: true });

    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07);
    });
    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    if (labelEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        labelEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: { each: 0.1, from: "start" } },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: "power2.out", "--sm-num-opacity": 1, stagger: { each: 0.08, from: "start" } },
          itemsStart + 0.1
        );
      }
    }

    if (extra) {
      tl.to(
        extra,
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
        panelInsertTime + panelDuration * 0.4 + 0.04
      );
    }

    openTlRef.current = tl;
    return tl;
  }, [position, displayItemNumbering, resetPanelContents]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;
    closeTweenRef.current = gsap.to([...preLayerElsRef.current, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        resetPanelContents(panel);
        busyRef.current = false;
      },
    });
  }, [position, resetPanelContents]);

  // Speech bubble swaps out for the plus lines, which spin into an X.
  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    const bubble = bubbleRef.current;
    if (!icon || !bubble) return;
    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap
        .timeline()
        .to(bubble, { opacity: 0, scale: 0.4, rotate: -90, duration: 0.25, ease: "power2.in" }, 0)
        .to(icon, { opacity: 1, rotate: 225, duration: 0.8, ease: "power4.out" }, 0.05);
    } else {
      spinTweenRef.current = gsap
        .timeline()
        .to(icon, { opacity: 0, rotate: 0, duration: 0.35, ease: "power3.inOut" }, 0)
        .to(bubble, { opacity: 1, scale: 1, rotate: 0, duration: 0.4, ease: "back.out(2)" }, 0.15);
    }
  }, []);

  const animateText = useCallback(
    (opening) => {
      const inner = textInnerRef.current;
      if (!inner) return;
      textCycleAnimRef.current?.kill();

      const currentLabel = opening ? openLabel : closeLabel;
      const targetLabel = opening ? closeLabel : openLabel;
      const seq = [currentLabel];
      let last = currentLabel;
      for (let i = 0; i < 3; i++) {
        last = last === openLabel ? closeLabel : openLabel;
        seq.push(last);
      }
      if (last !== targetLabel) seq.push(targetLabel);
      seq.push(targetLabel);
      setTextLines(seq);

      gsap.set(inner, { yPercent: 0 });
      const finalShift = ((seq.length - 1) / seq.length) * 100;
      textCycleAnimRef.current = gsap.to(inner, {
        yPercent: -finalShift,
        duration: 0.5 + seq.length * 0.07,
        ease: "power4.out",
      });
    },
    [openLabel, closeLabel]
  );

  const setMenuOpen = useCallback(
    (target) => {
      if (openRef.current === target) return;
      openRef.current = target;
      setOpen(target);
      if (target) {
        onMenuOpen?.();
        playOpen();
      } else {
        onMenuClose?.();
        playClose();
      }
      animateIcon(target);
      animateText(target);
    },
    [playOpen, playClose, animateIcon, animateText, onMenuOpen, onMenuClose]
  );

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (
        closeOnClickAway &&
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeOnClickAway, open, setMenuOpen]);

  const layerColors = (() => {
    const arr = colors && colors.length ? colors.slice(0, 4) : ["var(--gray-warm)", "var(--ink)"];
    if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1);
    return arr;
  })();

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      data-position={position}
      data-open={open || undefined}
      {...rest}
    >
      <div ref={preLayersRef} className={styles.prelayers} aria-hidden="true">
        {layerColors.map((c, i) => (
          <div key={i} data-sm="prelayer" className={styles.prelayer} style={{ background: c }} />
        ))}
      </div>

      <header className={styles.header}>
        <div className={`${styles.logo} ${logoVisible ? styles.logoVisible : ""}`} inert={!logoVisible}>
          {logo}
        </div>
        <button
          ref={toggleBtnRef}
          className={styles.toggle}
          aria-label={open ? closeLabel : openLabel}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={() => setMenuOpen(!openRef.current)}
          type="button"
        >
          <span className={styles.textWrap} aria-hidden="true">
            <span ref={textInnerRef} className={styles.textInner}>
              {textLines.map((l, i) => (
                <span className={styles.textLine} key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span className={styles.iconSlot} aria-hidden="true">
            <span ref={bubbleRef} className={styles.bubble}>
              <Icon name="speech-bubble" size={20} strokeWidth={2} style={{ color: "currentColor" }} />
            </span>
            <span ref={iconRef} className={styles.icon}>
              <span ref={plusHRef} className={styles.iconLine} />
              <span ref={plusVRef} className={styles.iconLine} />
            </span>
          </span>
        </button>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className={styles.panel}
        aria-hidden={!open}
        inert={!open}
      >
        <div className={styles.panelInner}>
          <ul className={styles.list} role="list" data-numbering={displayItemNumbering || undefined}>
            {items.map((it, idx) => (
              <li className={styles.itemWrap} key={it.label + idx}>
                <a
                  className={styles.item}
                  href={it.link}
                  aria-label={it.ariaLabel}
                  data-sm="item"
                  {...(it.newTab === false ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <span className={styles.itemLabel} data-sm="label">
                    {it.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {children && (
            <div className={styles.extra} data-sm="extra">
              {children}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
