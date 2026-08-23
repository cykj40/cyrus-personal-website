import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Analytics } from '@vercel/analytics/react';
import { MotionConfig } from 'framer-motion';
import '@/index.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      {/*
        No QueryClientProvider here on purpose: the chatbot is react-query's only
        consumer, so the provider lives inside the lazily-loaded chat chunk
        (src/components/chat/ChatConversation.tsx) and react-query stays off the
        critical path for every route.
      */}
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
        <Analytics />
      </MotionConfig>
    </StrictMode>
  );
}
