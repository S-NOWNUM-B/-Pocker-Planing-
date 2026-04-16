import { AppProviders } from './app/providers';
import { AppRoutes } from './app/router';
import { Footer, Header } from './widgets';
import './app/styles/index.css';

function App() {
  return (
    <AppProviders>
      <Header showAuthButtons />
      <AppRoutes />
      <Footer />
    </AppProviders>
  );
}

export default App;
