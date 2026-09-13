import Navbar from './Navbar';
import Sidebar, { BottomNav } from './Sidebar';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-20 lg:pb-0">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
