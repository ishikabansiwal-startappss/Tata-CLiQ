import ReactGA from "react-ga4";

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initializeAnalytics = () => {
  if (!measurementId) {
    console.warn("Google Analytics Measurement ID is missing.");
    return;
  }

  ReactGA.initialize(measurementId);
};

export const trackPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const trackEvent = ({
  category,
  action,
  label,
  value,
}) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};