// import {
//   createPreviewSubscriptionHook,
//   createClient,
// } from 'next-sanity';

const { createClient, createPreviewSubscriptionHook } = require("next-sanity");

const config = {
  projectId: "wl52rum5",
  dataset: "production",
  useCdn: false, // `false` if you want to ensure fresh data
};

const usePreviewSubscription = createPreviewSubscriptionHook(config);

const sanityClient = createClient(config);
const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const getClient = (usePreview) => (usePreview ? previewClient : sanityClient);

module.exports = {
  config,
  usePreviewSubscription,
  sanityClient,
  previewClient,
  getClient,
};
