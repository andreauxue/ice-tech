import { QrCode as QrCodeIcon, Plus, Search } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
import { mockQRCodes } from '../data/mockData';
import { cn } from '../lib/utils';
import { Link } from 'react-router';
import { useState } from 'react';

const statusLabel = { assigned: 'Asociado', unassigned: 'Disponible', damaged: 'Dañado' };
const statusVariant: Record<string, 'success' | 'default' | 'error'> = {
  assigned: 'success',
  unassigned: 'default',
  damaged: 'error',
};

export function QRCodes() {
  const [filter, setFilter] = useState<'all' | 'assigned' | 'unassigned' | 'damaged'>('all');
  const [search, setSearch] = useState('');

  const visible = mockQRCodes.filter(qr => {
    const matchesFilter = filter === 'all' || qr.status === filter;
    const matchesSearch = qr.code.toLowerCase().includes(search.toLowerCase()) ||
      (qr.linkedSkater?.toLowerCase().includes(search.toLowerCase()) ?? false);
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: mockQRCodes.length,
    assigned: mockQRCodes.filter(q => q.status === 'assigned').length,
    unassigned: mockQRCodes.filter(q => q.status === 'unassigned').length,
    damaged: mockQRCodes.filter(q => q.status === 'damaged').length,
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-1">Códigos QR</h1>
          <p className="text-sm text-muted-foreground">{counts.all} etiquetas en total</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Generar códigos
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar código o patinador..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {(['all', 'assigned', 'unassigned', 'damaged'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm transition-colors',
                filter === tab
                  ? 'bg-white shadow-sm text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab === 'all' ? `Todos (${counts.all})` :
               tab === 'assigned' ? `Asociados (${counts.assigned})` :
               tab === 'unassigned' ? `Disponibles (${counts.unassigned})` :
               `Dañados (${counts.damaged})`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {visible.map((qr) => (
          <div
            key={qr.id}
            className={cn(
              'bg-white border rounded-xl p-5 transition-colors',
              qr.status === 'damaged' && 'border-red-200 bg-red-50/30',
              qr.status === 'unassigned' && 'border-dashed border-gray-300',
              qr.status === 'assigned' && 'border-border hover:border-gray-300'
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center',
                qr.status === 'damaged' && 'bg-red-100',
                qr.status === 'unassigned' && 'bg-gray-100',
                qr.status === 'assigned' && 'bg-primary/10'
              )}>
                <QrCodeIcon className={cn(
                  'w-5 h-5',
                  qr.status === 'damaged' && 'text-primary',
                  qr.status === 'unassigned' && 'text-muted-foreground',
                  qr.status === 'assigned' && 'text-primary'
                )} />
              </div>
              <Badge variant={statusVariant[qr.status]}>
                {statusLabel[qr.status]}
              </Badge>
            </div>

            <p className="font-mono text-sm font-medium mb-1">{qr.code}</p>
            {qr.linkedSkater && qr.linkedSkaterId ? (
              <Link
                to={`/skaters/${qr.linkedSkaterId}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {qr.linkedSkater}
              </Link>
            ) : (
              <p className="text-xs text-muted-foreground">
                {qr.status === 'damaged' ? 'Requiere reemplazo' : 'Sin asignar — disponible'}
              </p>
            )}
          </div>
        ))}
        {visible.length === 0 && (
          <div className="col-span-3 py-16 text-center text-sm text-muted-foreground">
            No se encontraron códigos con los filtros actuales
          </div>
        )}
      </div>
    </div>
  );
}
