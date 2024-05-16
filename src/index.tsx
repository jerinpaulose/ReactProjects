import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { createRoot } from 'react-dom/client';
import './services';
import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </Provider>
  );
  reportWebVitals((data) => {
    // Handle web vitals data
    console.log(data);
  });
}
