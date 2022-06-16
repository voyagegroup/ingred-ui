import App from './App';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
// MEMO: https://blog.logrocket.com/how-to-use-typescript-with-react-18-alpha/
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(<App />);
