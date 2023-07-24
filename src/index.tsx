import { createRoot } from 'react-dom/client';
import '@/app/styles/index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/providers/router';
import '@/shared/config/i18n/i18n';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
