import * as Sentry from "@sentry/react";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary";
import { ToastProvider } from "./components/common/Toast/Toast";
import AppRouter from "./routes/AppRouter";


Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || "",
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enabled: import.meta.env.PROD,
});

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default Sentry.withProfiler(App);
