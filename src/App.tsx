import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './shared/components/Header';
import { Sidebar } from './shared/components/Sidebar';
import { CampaignsPage } from './pages/campaigns/campaign';
import './App.css';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');

  useEffect(() => {
    if (!page) {
      setSearchParams({ page: '/campaigns' }, { replace: true });
    }
  }, [page, setSearchParams]);

  const renderPage = () => {
    switch (page) {
      case '/campaigns':
        return <CampaignsPage />;
      default:
        return <CampaignsPage />;
    }
  };

  return (
    <div className="appShell">
      <Header />
      <div className="appBody">
        <div className="sidebarCard">
          <Sidebar />
        </div>
        <main className="contentCard">{renderPage()}</main>
      </div>
    </div>
  );
}

export default App;
