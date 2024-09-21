/* eslint-disable semi */
import createPlugin from 'tailwindcss/plugin.js';
import theme from './theme.js';

/** @type {import('tailwindcss/types/config').PluginCreator} */
const pluginCreator = (api) => {
  const { theme, matchUtilities, addUtilities, prefix } = api;

  // Función para manejar timelines
  const singleTimeline = value => {
    return value.startsWith('var(') ? value.slice(4, -1) : value;
  };

  const dynamicUtils = {
    'animate-delay': { css: 'animation-delay', values: theme('animationDelay') },
    'animate-duration': { css: 'animation-duration', values: theme('animationDuration') },
    'animate-iteration-count': { css: 'animation-iteration-count', values: theme('animationIterationCount') },
    'animate-fill-mode': { css: 'animation-fill-mode', values: theme('animationFillMode') },
    'animate-bezier': { css: 'animation-timing-function', values: theme('animationCubicBezier') },
    'animate-steps': { css: 'animation-timing-function', values: theme('animationSteps'), generateValue: value => `steps(${value})` },
    'animate-range': { css: 'animation-range', values: theme('animationRange'), generateValue: value => value },
    timeline: { css: 'animation-timeline', values: theme('timeline'), generateValue: value => singleTimeline(value) },
    'scroll-timeline': { css: 'scroll-timeline-name', values: theme('scrollTimeline'), generateValue: value => singleTimeline(value) },
    'view-timeline': { css: 'view-timeline-name', values: theme('viewTimeline'), generateValue: value => singleTimeline(value) },
    'scroll-timeline-axis': { css: 'scroll-timeline-axis', values: theme('scrollTimelineAxis') },
    'view-timeline-axis': { css: 'view-timeline-axis', values: theme('viewTimelineAxis') },
    'scroll-animate': { css: 'scroll-timeline-name', values: theme('scrollTimeline'), generateValue: value => `${singleTimeline(value)};\n  animation-timeline: ${singleTimeline(value)}` },
    'view-animate': { css: 'view-timeline-name', values: theme('viewTimeline'), generateValue: value => `${singleTimeline(value)};\n  animation-timeline: ${singleTimeline(value)}` }
  };

  // Generar utilidades dinámicas con prefijo
  Object.entries(dynamicUtils).forEach(([name, { css, values, generateValue }]) => {
    matchUtilities({
      [`${prefix}${name}`]: value => ({
        [css]: generateValue ? generateValue(value) : value
      })
    }, {
      values
    });
  });

  // Agregar utilidades estáticas con prefijo
  addUtilities({
    [`.${prefix}animate-ease`]: { 'animation-timing-function': 'ease' },
    [`.${prefix}animate-ease-in`]: { 'animation-timing-function': 'ease-in' },
    [`.${prefix}animate-ease-out`]: { 'animation-timing-function': 'ease-out' },
    [`.${prefix}animate-ease-in-out`]: { 'animation-timing-function': 'ease-in-out' },
    [`.${prefix}animate-linear`]: { 'animation-timing-function': 'linear' },
    [`.${prefix}animate-direction-normal`]: { 'animation-direction': 'normal' },
    [`.${prefix}animate-direction-reverse`]: { 'animation-direction': 'reverse' },
    [`.${prefix}animate-direction-alternate`]: { 'animation-direction': 'alternate' },
    [`.${prefix}animate-direction-alternate-reverse`]: { 'animation-direction': 'alternate-reverse' },
    [`.${prefix}animate-play-running`]: { 'animation-play-state': 'running' },
    [`.${prefix}animate-play-paused`]: { 'animation-play-state': 'paused' }
  });
};

/** @type {import('tailwindcss/types/config').Config} */
const pluginConfig = { theme, prefix: '' };

export default createPlugin(pluginCreator, pluginConfig);
