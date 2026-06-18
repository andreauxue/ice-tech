import { ChevronLeft, Mountain, Plus, Phone, Mail, Calendar, QrCode } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { mockSkaters } from '../data/mockData';

export function SkaterProfile() {
  const { id } = useParams();
  const skater = mockSkaters.find(s => s.id === id);

  if (!skater) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-64 gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <Mountain className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-muted-foreground text-sm">Patinador no encontrado</p>
        <Link to="/skaters"><Button variant="secondary" size="sm">Volver al listado</Button></Link>
      </div>
    );
  }

  const initials = skater.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="p-8 max-w-4xl">
      <Link to="/skaters" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Volver a lista
      </Link>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-white border border-border rounded-xl p-6">
          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shrink-0" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h2>{skater.name}</h2>
                {skater.active && <Badge variant="success">Activo</Badge>}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>{skater.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>{skater.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-border pt-5">
            <div>
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Último servicio</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium">
                  {skater.lastService
                    ? new Date(skater.lastService).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })
                    : 'Sin registro'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Total servicios</p>
              <p className="text-sm font-medium">{skater.totalServices} servicios</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-xl p-6 flex flex-col gap-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Acciones</p>
          <div className="space-y-2">
            <Button className="w-full justify-start">
              <Plus className="w-4 h-4" />
              Agregar patín
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              Editar perfil
            </Button>
          </div>
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <QrCode className="w-4 h-4" />
              <span>{skater.skates.filter((s: { qrStatus: string }) => s.qrStatus === 'linked').length} QR asociados</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3>Patines registrados</h3>
          <Badge variant="default">{skater.skates.length} pares</Badge>
        </div>
        <div className="divide-y divide-border">
          {skater.skates.map((skate: { id: string; brand: string; model: string; bladeSize: string; qrStatus: string; qrCode?: string }) => (
            <div key={skate.id} className="p-5 flex items-center justify-between hover:bg-gray-50/60 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <Mountain className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">{skate.brand} {skate.model}</p>
                  <p className="text-xs text-muted-foreground">Cuchilla: {skate.bladeSize} mm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {skate.qrStatus === 'linked' && skate.qrCode && (
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-mono">{skate.qrCode}</span>
                    <Badge variant="success">Vinculado</Badge>
                  </div>
                )}
                {skate.qrStatus === 'none' && (
                  <Badge variant="warning">Sin QR</Badge>
                )}
              </div>
            </div>
          ))}
          {skater.skates.length === 0 && (
            <div className="p-10 text-center text-sm text-muted-foreground">
              No hay patines registrados
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
