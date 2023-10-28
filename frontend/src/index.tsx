import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';

import {router} from './Routing/Routes';
import './styles/_globals.scss';

const root = createRoot(document.getElementById('app'));

root.render(<RouterProvider router={router} />);
