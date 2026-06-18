import { Users, Mountain, Clock, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Badge } from '../components/Badge';
import { mockSkaters, mockActivities } from '../data/mockData';
import { Link } from 'react-router';

export function Dashboard() {
  const totalSkaters = mockSkaters.length;
  const totalSkates = mockSkaters.reduce((acc, skater) => acc + skater.skates.length, 0);
  const pendingToday = mockActivities.filter(a => a.status === 'pending').length;

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="mb-1">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Resumen operativo de IceTech</p>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +3 este mes
            </span>
          </div>
          <p className="text-3xl font-semibold text-foreground">{totalSkaters}</p>
          <p className="text-sm text-muted-foreground mt-1">Patinadores registrados</p>
        </div>

        <div className="bg-white border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Mountain className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +5 este mes
            </span>
          </div>
          <p className="text-3xl font-semibold text-foreground">{totalSkates}</p>
          <p className="text-sm text-muted-foreground mt-1">Patines registrados</p>
        </div>

        <div className="bg-white border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <Badge variant={pendingToday > 0 ? 'error' : 'success'}>
              {pendingToday > 0 ? 'Atención requerida' : 'Al día'}
            </Badge>
          </div>
          <p className="text-3xl font-semibold text-foreground">{pendingToday}</p>
          <p className="text-sm text-muted-foreground mt-1">Pendientes hoy</p>
        </div>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2>Actividad reciente</h2>
          <Link to="/skaters" className="text-sm text-primary hover:underline flex items-center gap-1">
            Ver todos <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wide">Patinador</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wide">Patines</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wide">Fecha</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wide">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium">{activity.skaterName}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{activity.skateCount} {activity.skateCount === 1 ? 'par' : 'pares'}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">
                    {new Date(activity.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3.5">
                    {activity.status === 'ready' && <Badge variant="success">Listo</Badge>}
                    {activity.status === 'in-progress' && <Badge variant="warning">En proceso</Badge>}
                    {activity.status === 'pending' && <Badge variant="error">Pendiente</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
