import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.budget.management.MR',
  appName: 'ionic-budget-management',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    allowNavigation: [],
  },
};

export default config;
