import { LayoutDashboard, Users, Sword, QrCode, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Patinadores', path: '/skaters' },
  { icon: Sword, label: 'Patines', path: '/skates' },
  { icon: QrCode, label: 'Códigos QR', path: '/qr-codes' },
  { icon: Settings, label: 'Configuración', path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 min-h-screen flex flex-col shrink-0 bg-white border-r border-gray-200">
      <nav className="flex-1 p-3 space-y-0.5 pt-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon
                className="shrink-0"
                style={{ width: '18px', height: '18px' }}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-400">IceTech v1.0</p>
      </div>
    </aside>
  );
}