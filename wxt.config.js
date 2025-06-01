import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  // srcDir: 'src',
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],
  manifest: {
    name: "QR Code Generator",
    description: "Create QR Code to sharing everywhere",
    permissions: [
      "activeTab",
    ],
  },
});
