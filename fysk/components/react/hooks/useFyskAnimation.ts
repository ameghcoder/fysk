"use client";
import {
  useFyskConfig,
  defaultAnimationConfig,
  type FyskAnimationConfig,
} from "@/components/fysk-provider";
import React from "react";

/**
 * Hook to access animation configuration and utilities.
 * Provides pre-computed transition objects for consistent animations across components.
 */
export function useFyskAnimation() {
  const { animations } = useFyskConfig();

  // Merge user config with defaults
  const config: FyskAnimationConfig = React.useMemo(
    () => ({
      ...defaultAnimationConfig,
      ...animations,
      durations: {
        ...defaultAnimationConfig.durations,
        ...animations?.durations,
      },
      easings: { ...defaultAnimationConfig.easings, ...animations?.easings },
      effects: { ...defaultAnimationConfig.effects, ...animations?.effects },
    }),
    [animations]
  );

  // Check if animations are enabled and motion is available
  const isEnabled = config.enabled && !!config.motion;

  // Pre-computed transition objects based on config
  const transitions = React.useMemo(() => {
    if (!isEnabled) return null;

    const { durations, easings, effects } = config;

    return {
      /**
       * For layout/size changes (morphing elements)
       * Uses easeInOut for natural acceleration/deceleration
       */
      layout: {
        duration: durations.layout,
        ease: easings.layout,
      },

      /**
       * For elements entering the screen
       * Uses easeOut for responsive feel
       */
      enter: {
        duration: durations.normal,
        ease: easings.enter,
      },

      /**
       * For elements exiting the screen
       * Uses easeOut for clean exit
       */
      exit: {
        duration: durations.fast,
        ease: easings.exit,
      },

      /**
       * For hover/focus micro-interactions
       * Quick and responsive
       */
      hover: {
        duration: durations.instant,
        ease: easings.hover,
      },

      /**
       * For content swapping (state changes)
       * Slightly slower for emphasis
       */
      content: {
        duration: durations.normal,
        ease: easings.enter,
        layout: {
          duration: durations.slow,
          ease: easings.layout,
        },
      },

      /**
       * For constant/linear animations (spinners, progress)
       */
      linear: {
        duration: durations.normal,
        ease: easings.linear,
        repeat: Infinity,
      },

      /**
       * Combined layout + enter transition
       */
      layoutEnter: {
        layout: { duration: durations.layout, ease: easings.layout },
        opacity: { duration: durations.normal, ease: easings.enter },
      },
    };
  }, [isEnabled, config]);

  // Pre-computed animation variants based on config
  const variants = React.useMemo(() => {
    if (!isEnabled) return null;

    const { effects, durations, easings } = config;

    // Build initial/exit state based on enabled effects
    const buildHiddenState = () => {
      const state: Record<string, any> = { opacity: 0 };
      if (effects.blur) state.filter = `blur(${effects.blurAmount}px)`;
      if (effects.scale) state.scale = effects.scaleAmount;
      if (effects.slide) state.y = effects.slideDistance;
      return state;
    };

    const buildVisibleState = () => {
      const state: Record<string, any> = { opacity: 1 };
      if (effects.blur) state.filter = "blur(0px)";
      if (effects.scale) state.scale = 1;
      if (effects.slide) state.y = 0;
      return state;
    };

    const buildExitState = () => {
      const state: Record<string, any> = { opacity: 0 };
      if (effects.blur) state.filter = `blur(${effects.blurAmount}px)`;
      if (effects.scale) state.scale = effects.scaleAmount;
      if (effects.slide) state.y = -effects.slideDistance;
      return state;
    };

    return {
      /**
       * Fade + optional blur/scale/slide
       */
      fadeSlide: {
        initial: buildHiddenState(),
        animate: buildVisibleState(),
        exit: buildExitState(),
        transition: { duration: durations.normal, ease: easings.enter },
      },

      /**
       * Simple fade only
       */
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: durations.fast, ease: easings.enter },
      },

      /**
       * Scale pop effect for icons
       */
      iconPop: {
        initial: { scale: 0.5, rotate: -10 },
        animate: { scale: 1, rotate: 0 },
        transition: { duration: durations.normal, ease: easings.enter },
      },

      /**
       * Overlay fade in/out
       */
      overlay: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: durations.fast, ease: easings.enter },
      },

      /**
       * Slide up from bottom (toasts, notifications)
       */
      slideUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 },
        transition: { duration: durations.normal, ease: easings.enter },
      },

      /**
       * Scale in/out (modals, popovers)
       */
      scaleIn: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: durations.normal, ease: easings.enter },
      },
    };
  }, [isEnabled, config]);

  // Fallback motion components when animations are disabled
  const fallbackMotion = {
    div: "div",
    span: "span",
    button: "button",
    li: "li",
    ul: "ul",
    p: "p",
    a: "a",
  };

  return {
    /** Whether animations are enabled and motion is available */
    isEnabled,

    /** The motion object (or fallback HTML elements) */
    motion: isEnabled ? config.motion : fallbackMotion,

    /** AnimatePresence component (or React.Fragment fallback) */
    AnimatePresence: config.AnimatePresence || React.Fragment,

    /** The full animation configuration */
    config,

    /** Pre-computed transition objects */
    transitions,

    /** Pre-computed animation variants */
    variants,

    /** Duration presets (direct access) */
    durations: config.durations,

    /** Easing presets (direct access) */
    easings: config.easings,

    /** Effect settings (direct access) */
    effects: config.effects,
  };
}
