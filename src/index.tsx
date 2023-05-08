import { createRoot } from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/providers/router/config/routeConfig';

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
