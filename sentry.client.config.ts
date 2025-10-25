import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a915066ae384c2d2fdb7e5cdb3dda046@o4510056227340288.ingest.us.sentry.io/4510222765850624",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Enable logging experiments
  _experiments: {
    enableLogs: true,
  },
});
