
import { AppShellLayout } from '@/components/AppShell/AppShell';
import { DynamicThemeProvider } from '@/components/DynamicTheme/DynamicTheme';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { QueryClient } from '@tanstack/react-query';
import '../styles/globals.css';
import { ClientQueryProvider } from './lib/reactQueryProvider';
import StoreProvider from './lib/storeprovider';

export const metadata = {
  title: 'eLearning- manage your education organization',
  description: 'The eLearning aims to develop a comprehensive educational organization SaaS platform that enables them to efficiently manage administrative tasks and enhance communication with parents, teachers, and students through various modules.',
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: any }) {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <DynamicThemeProvider>
          <StoreProvider>
            <ClientQueryProvider >
              <ModalsProvider>
                <AppShellLayout>{children}</AppShellLayout>
                {/* <ReactQueryDevtools initialIsOpen={true} /> */}
              </ModalsProvider>
            </ClientQueryProvider>
          </StoreProvider>
          <Notifications />
        </DynamicThemeProvider>
      </body>
    </html>
  );
}
