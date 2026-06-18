import { Eye, Plus, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Badge } from '../components/Badge';
import { mockSkaters } from '../data/mockData';
import { useState } from 'react';

export function Skaters() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkaters = mockSkaters.filter(skater =>
    skater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skater.phone.includes(searchTerm) ||
    skater.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-1">Patinadores</h1>
          <p className="text-sm text-muted-foreground">{mockSkaters.length} registros en total</p>
        </div>
        <Link to="/skaters/new">
          <Button>
            <Plus className="w-4 h-4" />
            Nuevo patinador
          </Button>
        </Link>
      </div>

      <div className="mb-5 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre, teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-border">
              <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wide">Patinador</th>
              <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wide">Teléfono</th>
              <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wide">Patines</th>
              <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wide">Estado</th>
              <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wide"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredSkaters.map((skater) => {
              const initials = skater.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
              return (
                <tr key={skater.id} className="hover:bg-gray-50/60 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-medium text-primary">{initials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{skater.name}</p>
                        <p className="text-xs text-muted-foreground">{skater.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{skater.phone}</td>
                  <td className="px-5 py-3.5 text-sm">
                    <span className="inline-flex items-center gap-1">
                      <span className="font-medium">{skater.skates.length}</span>
                      <span className="text-muted-foreground">pares</span>
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {skater.active
                      ? <Badge variant="success">Activo</Badge>
                      : <Badge variant="default">Inactivo</Badge>
                    }
                  </td>
                  <td className="px-5 py-3.5">
                    <Link to={`/skaters/${skater.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
            {filteredSkaters.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  No se encontraron resultados para "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
