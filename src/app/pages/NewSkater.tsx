import { useState } from 'react';
import {
  ChevronLeft,
  QrCode as QrCodeIcon,
  User,
  Mountain,
  Sliders,
  ClipboardCheck,
  ShieldCheck,
  Sparkles,
  Ruler,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';

type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'time'
  | 'select'
  | 'multiselect'
  | 'textarea';

type FieldConfig = {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  rows?: number;
};

function FormSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border bg-gray-50">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <h3>{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function FieldRenderer({ field }: { field: FieldConfig }) {
  if (field.type === 'select') {
    return (
      <Select label={field.label} id={field.id}>
        <option value="">Seleccionar...</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    );
  }

  if (field.type === 'multiselect') {
    return (
      <div>
        <label className="block text-sm font-medium mb-2">{field.label}</label>
        <div className="grid grid-cols-2 gap-2">
          {field.options?.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm bg-white"
            >
              <input type="checkbox" name={field.id} value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <Textarea
        label={field.label}
        id={field.id}
        rows={field.rows ?? 4}
        placeholder={field.placeholder}
      />
    );
  }

  return (
    <Input
      label={field.label}
      id={field.id}
      type={field.type}
      placeholder={field.placeholder}
    />
  );
}

function DynamicFields({ fields }: { fields: FieldConfig[] }) {
  return (
    <>
      {fields.map((field) => (
        <FieldRenderer key={field.id} field={field} />
      ))}
    </>
  );
}

const conditionOptions = ['Excellent', 'Good', 'Moderate', 'Poor', 'Deficient'];
const yesNoOptions = ['Yes', 'No'];
const yesNoSideOptions = ['Yes', 'No', 'R', 'L'];
const goodFairPoorOptions = ['Good', 'Fair', 'Poor'];
const skatingAnalysisOptions = [
  'Control OK',
  'Out of Control',
  'Push Off Slipping',
  'Unbalanced',
  'Falling',
];
const rohOptions = ['1/4"', '3/8"', '7/16"', '1/2"', '9/16"', '5/8"', '3/4"', '7/8"', '1"', 'Other'];

const serviceFields: FieldConfig[] = [
  { id: 'serviceDate', label: 'Fecha', type: 'date' },
  { id: 'deliveryTime', label: 'Hora de entrega', type: 'time' },
  { id: 'tagNumber', label: 'Número de etiqueta / QR', type: 'text', placeholder: 'Ej: IT-0042' },
  { id: 'height', label: 'Altura del patinador (m)', type: 'number', placeholder: 'Ej: 1.72' },
  { id: 'weight', label: 'Peso del patinador (kg)', type: 'number', placeholder: 'Ej: 68' },
  {
    id: 'skaterAbility',
    label: 'Skaters Ability / Nivel del patinador',
    type: 'select',
    options: ['Principiante', 'Intermedio', 'Avanzado', 'Élite / Profesional'],
  },
];

const skateTechnicalFields: FieldConfig[] = [
  { id: 'profile', label: 'Profile', type: 'text', placeholder: 'Número o configuración' },
  {
    id: 'radius',
    label: 'Radius / ROH',
    type: 'select',
    options: rohOptions,
  },
  {
    id: 'pitch',
    label: 'Pitch',
    type: 'select',
    options: ['Level', '1/64" F', '1/32" F', 'Other'],
  },
  {
    id: 'skateCondition',
    label: 'Estado del patín',
    type: 'select',
    options: ['Nuevo', 'Usado'],
  },
  {
    id: 'bootCondition',
    label: 'Estado de la bota',
    type: 'select',
    options: ['Good', 'Regular', 'Poor'],
  },
  {
    id: 'straightBlades',
    label: 'Cuchillas rectas',
    type: 'select',
    options: ['Sí', 'No'],
  },
  {
    id: 'looseBlades',
    label: 'Cuchillas flojas',
    type: 'select',
    options: ['Sí', 'No'],
  },
  {
    id: 'rivets',
    label: 'Remaches',
    type: 'select',
    options: ['Sí', 'No'],
  },
  {
    id: 'leftBladeAlignment',
    label: 'Alineación de cuchilla izquierda',
    type: 'multiselect',
    options: ['Front OK', 'Front Tipped', 'Front Inside', 'Front Outside', 'Rear OK', 'Rear Tipped', 'Rear Inside', 'Rear Outside'],
  },
  {
    id: 'rightBladeAlignment',
    label: 'Alineación de cuchilla derecha',
    type: 'multiselect',
    options: ['Front OK', 'Front Tipped', 'Front Inside', 'Front Outside', 'Rear OK', 'Rear Tipped', 'Rear Inside', 'Rear Outside'],
  },
  {
    id: 'repairDescription',
    label: 'Descripción de la reparación',
    type: 'textarea',
    placeholder: 'Notas técnicas adicionales y observaciones del técnico...',
  },
  {
    id: 'rinkCost',
    label: 'Rink / Costo total del servicio',
    type: 'number',
    placeholder: '$0.00',
  },
];

const teamProfileFields: FieldConfig[] = [
  { id: 'hc', label: 'HC', type: 'number', placeholder: 'Medición' },
  { id: 'pc', label: 'PC', type: 'number', placeholder: 'Medición' },
  { id: 'bfc', label: 'BFC', type: 'number', placeholder: 'Medición' },
  {
    id: 'position',
    label: 'Posición',
    type: 'select',
    options: ['Forward', 'Defense', 'Goalie', 'Other'],
  },
  { id: 'bladeRadiusTeam', label: 'Blade Radius', type: 'text', placeholder: 'Radio actual' },
  { id: 'bladeProfileTeam', label: 'Blade Profile', type: 'text', placeholder: 'Perfil actual' },
  { id: 'rightLegLength', label: 'Leg Length - Derecha', type: 'number', placeholder: 'Medición' },
  { id: 'leftLegLength', label: 'Leg Length - Izquierda', type: 'number', placeholder: 'Medición' },
  { id: 'present', label: 'Present', type: 'number', placeholder: 'Valor actual' },
  { id: 'lie', label: 'Lie', type: 'number', placeholder: 'Parámetro técnico' },
  { id: 'pitchTeam', label: 'Pitch', type: 'number', placeholder: 'Parámetro técnico' },
  {
    id: 'skatingCharacteristics',
    label: 'Características de patinaje',
    type: 'textarea',
    placeholder: 'Descripción de características observadas durante el patinaje...',
  },
  {
    id: 'playerComments',
    label: 'Comentarios del jugador',
    type: 'textarea',
    placeholder: 'Comentarios proporcionados por el patinador...',
  },
];

const bladeSurveyFields: FieldConfig[] = [
  { id: 'city', label: 'City', type: 'text', placeholder: 'Ciudad' },
  { id: 'age', label: 'Age', type: 'number', placeholder: 'Edad' },
  {
    id: 'gender',
    label: 'Gender',
    type: 'select',
    options: ['Male', 'Female', 'Other', 'Prefer not to say'],
  },
  {
    id: 'problem',
    label: 'Problem',
    type: 'select',
    options: yesNoOptions,
  },
  {
    id: 'problemDescription',
    label: 'Problem Description',
    type: 'textarea',
    placeholder: 'Descripción detallada del problema...',
  },
  { id: 'leftToeVariance', label: 'Left Toe Total Variance', type: 'number' },
  { id: 'leftHeelVariance', label: 'Left Heel Total Variance', type: 'number' },
  { id: 'rightToeVariance', label: 'Right Toe Total Variance', type: 'number' },
  { id: 'rightHeelVariance', label: 'Right Heel Total Variance', type: 'number' },
  {
    id: 'bladeRollLeft',
    label: 'Blade Roll - Left',
    type: 'select',
    options: yesNoOptions,
  },
  {
    id: 'bladeRollRight',
    label: 'Blade Roll - Right',
    type: 'select',
    options: yesNoOptions,
  },
  { id: 'problemLeft', label: 'Problem - Left', type: 'text', placeholder: 'Indicador visual' },
  { id: 'satisfactionLeft', label: 'Satisfaction - Left', type: 'text', placeholder: 'Indicador visual' },
  { id: 'problemRight', label: 'Problem - Right', type: 'text', placeholder: 'Indicador visual' },
  { id: 'satisfactionRight', label: 'Satisfaction - Right', type: 'text', placeholder: 'Indicador visual' },
  {
    id: 'pitchLeftApproximateProfile',
    label: 'Pitch - Left Approximate Profile',
    type: 'select',
    options: yesNoOptions,
  },
  {
    id: 'pitchRightApproximateProfile',
    label: 'Pitch - Right Approximate Profile',
    type: 'select',
    options: yesNoOptions,
  },
  { id: 'profileLeftApproximate', label: 'Profile - Left Approximate Profile', type: 'text' },
  { id: 'profileRightApproximate', label: 'Profile - Right Approximate Profile', type: 'text' },
  { id: 'bladeHeightLeftToe', label: 'Blade Height - Left Toe', type: 'number' },
  { id: 'bladeHeightLeftHeel', label: 'Blade Height - Left Heel', type: 'number' },
  { id: 'bladeHeightRightToe', label: 'Blade Height - Right Toe', type: 'number' },
  { id: 'bladeHeightRightHeel', label: 'Blade Height - Right Heel', type: 'number' },
  {
    id: 'bladeFinishedRadius',
    label: 'Blade Finished Radius',
    type: 'select',
    options: rohOptions,
  },
  {
    id: 'bladeStraight',
    label: 'Blade Straight',
    type: 'select',
    options: yesNoOptions,
  },
  {
    id: 'bladeEdgesSides',
    label: 'Blade Edges & Sides',
    type: 'select',
    options: goodFairPoorOptions,
  },
  {
    id: 'bladeMounting',
    label: 'Blade Mounting',
    type: 'select',
    options: goodFairPoorOptions,
  },
  {
    id: 'surveyComments',
    label: 'Survey Comments',
    type: 'textarea',
    placeholder: 'Comentarios y observaciones adicionales...',
  },
];

const skatingAnalysisFields: FieldConfig[] = [
  { id: 'rightStart', label: 'Right Start', type: 'select', options: skatingAnalysisOptions },
  { id: 'leftStart', label: 'Left Start', type: 'select', options: skatingAnalysisOptions },
  { id: 'rightTurn', label: 'Right Turn', type: 'select', options: skatingAnalysisOptions },
  { id: 'leftTurn', label: 'Left Turn', type: 'select', options: skatingAnalysisOptions },
  { id: 'rightStop', label: 'Right Stop', type: 'select', options: skatingAnalysisOptions },
  { id: 'leftStop', label: 'Left Stop', type: 'select', options: skatingAnalysisOptions },
  { id: 'rightCrossover', label: 'Right Crossover', type: 'select', options: skatingAnalysisOptions },
  { id: 'leftCrossover', label: 'Left Crossover', type: 'select', options: skatingAnalysisOptions },
  { id: 'insideEdgeRight', label: 'Inside Edge Right', type: 'select', options: skatingAnalysisOptions },
  { id: 'outsideEdgeRight', label: 'Outside Edge Right', type: 'select', options: skatingAnalysisOptions },
  { id: 'insideEdgeLeft', label: 'Inside Edge Left', type: 'select', options: skatingAnalysisOptions },
  { id: 'outsideEdgeLeft', label: 'Outside Edge Left', type: 'select', options: skatingAnalysisOptions },
  { id: 'transitionSkating', label: 'Transition Skating', type: 'select', options: skatingAnalysisOptions },
  { id: 'forwardToBackward', label: 'Forward to Backward', type: 'select', options: skatingAnalysisOptions },
  { id: 'backwardToForward', label: 'Backward to Forward', type: 'select', options: skatingAnalysisOptions },
  {
    id: 'problemFoot',
    label: 'Problem Foot',
    type: 'select',
    options: ['Right', 'Left', 'Both'],
  },
  {
    id: 'stopOnEdges',
    label: 'Stop on Edges',
    type: 'multiselect',
    options: ['Inside Right', 'Outside Right', 'Inside Left', 'Outside Left', 'Yes', 'No'],
  },
  {
    id: 'circleTest',
    label: 'Forward / Backward Circle Test',
    type: 'multiselect',
    options: ['Yes', 'No', 'Inside', 'Outside', 'Both'],
  },
  {
    id: 'runOnSkates',
    label: 'Run on Skates',
    type: 'select',
    options: ['Sí', 'No'],
  },
  {
    id: 'otherNotes',
    label: 'Other Notes',
    type: 'textarea',
    placeholder: 'Comentarios y observaciones adicionales del evaluador...',
  },
];

const skatesAndBladesFields: FieldConfig[] = [
  { id: 'factoryDefectsCheck', label: 'Factory Defects Check', type: 'select', options: yesNoOptions },
  { id: 'soleTippedOnBoot', label: 'Sole Tipped on Boot', type: 'select', options: yesNoSideOptions },
  { id: 'tippedFootBedInsideBoot', label: 'Tipped Foot-bed Inside Boot', type: 'select', options: yesNoSideOptions },
  { id: 'soleStraightOnBoot', label: 'Sole Straight on Boot from End to End', type: 'select', options: yesNoSideOptions },
  { id: 'bladeAlignmentOk', label: 'Blade Alignment OK', type: 'select', options: yesNoSideOptions },
  { id: 'bladeTippedInHolder', label: 'Blade Tipped in Holder', type: 'select', options: yesNoSideOptions },
  { id: 'bladeLooseInHolder', label: 'Blade Loose in Holder', type: 'select', options: yesNoSideOptions },
  { id: 'tonguePositionRight', label: 'Tongue Position Right', type: 'select', options: ['Left', 'Center', 'Right'] },
  { id: 'tonguePositionLeft', label: 'Tongue Position Left', type: 'select', options: ['Left', 'Center', 'Right'] },
  { id: 'pressurePointsDuringSkating', label: 'Pressure Points During Skating', type: 'select', options: ['Examine', 'Right OK', 'Left OK'] },
  { id: 'rivetsMissingOrLoose', label: 'Rivets Missing or Loose', type: 'select', options: yesNoSideOptions },
  { id: 'bladesCorrectLengthForBoot', label: 'Blades Correct Length for Boot', type: 'select', options: yesNoOptions },
  { id: 'bladeMountedTooFar', label: 'Blade Mounted Too Far', type: 'select', options: ['Forward', 'Back', 'OK', 'R', 'L'] },
  { id: 'standardInsoles', label: 'Standard Insoles', type: 'select', options: yesNoOptions },
  { id: 'customInsoles', label: 'Custom Insoles', type: 'select', options: yesNoOptions },
  { id: 'orthopedicAppliance', label: 'Orthopedic Appliance', type: 'select', options: yesNoOptions },
  { id: 'bladeLiftsUnderInsole', label: 'Blade Lifts Under Insole', type: 'select', options: yesNoOptions },
  { id: 'bladeLiftsUnderHolder', label: 'Blade Lifts Under Holder', type: 'select', options: yesNoOptions },
  { id: 'bladeRadiusChecklist', label: 'Blade Radius', type: 'text', placeholder: 'Radio actual' },
  { id: 'bladeProfileChecklist', label: 'Blade Profile', type: 'text', placeholder: 'Perfil actual' },
  { id: 'bladeEdgesSquare', label: 'Blade Edges Square', type: 'select', options: ['Yes', 'No', 'If No Difference'] },
  { id: 'bladePitch', label: 'Blade Pitch', type: 'select', options: ['Right Toe', 'Neutral Heel', 'Left Toe', 'Neutral Heel'] },
  { id: 'recordBladeHeightRightBoc', label: 'Record Blade Height - Right BOC', type: 'number' },
  { id: 'recordBladeHeightRightHc', label: 'Record Blade Height - Right HC', type: 'number' },
  { id: 'recordBladeHeightLeftBoc', label: 'Record Blade Height - Left BOC', type: 'number' },
  { id: 'recordBladeHeightLeftHc', label: 'Record Blade Height - Left HC', type: 'number' },
  { id: 'crushZonesOnBoots', label: 'Crush Zones on Boots', type: 'select', options: yesNoSideOptions },
  { id: 'skateSize', label: 'Skate Size', type: 'text', placeholder: 'Talla del patín' },
  { id: 'typeOfSkate', label: 'Type of Skate', type: 'select', options: ['Custom', 'Factory', 'Altered'] },
  { id: 'skateAlteredAtSkaterRequest', label: 'Skate Altered at Skater Request', type: 'select', options: yesNoOptions },
  { id: 'typeOfHolder', label: 'Type of Holder', type: 'text', placeholder: 'Modelo o tipo de holder' },
  { id: 'typeOfBladeChecklist', label: 'Type of Blade', type: 'select', options: ['Carbon', 'Stainless'] },
];

const hockeySafetyChecklistFields: FieldConfig[] = [
  { id: 'helmetCondition', label: 'Helmet - No cracks, age, padding', type: 'select', options: conditionOptions },
  { id: 'faceMaskCondition', label: 'Face Mask - Snaps, straps, chin guard, screws', type: 'select', options: conditionOptions },
  { id: 'shoulderPadsCondition', label: 'Shoulder Pads - Stitching, Velcro, cracks', type: 'select', options: conditionOptions },
  { id: 'elbowPadsCondition', label: 'Elbow Pads - Stitching, Velcro, cracks', type: 'select', options: conditionOptions },
  { id: 'shinGuardsCondition', label: 'Shin Guards - Stitching, Velcro, cracks', type: 'select', options: conditionOptions },
  { id: 'pantsCondition', label: 'Pants - Stitching, belt, thigh/tail bone plates', type: 'select', options: conditionOptions },
  { id: 'glovesCondition', label: 'Gloves - No holes, stitching, finger padding', type: 'select', options: conditionOptions },
  { id: 'throatGuardCondition', label: 'Throat Guard - Proper fit, Velcro, shape', type: 'select', options: conditionOptions },
  { id: 'hockeySocksCondition', label: 'Hockey Socks - No holes, snug fit', type: 'select', options: conditionOptions },
  { id: 'mouthGuardCondition', label: 'Mouth Guard - Condition and fit', type: 'select', options: conditionOptions },
  { id: 'protectiveCupCondition', label: 'Protective Cup - Condition and fit', type: 'select', options: conditionOptions },
  { id: 'hockeyBagCondition', label: 'Hockey Bag - Clean, no loose debris', type: 'select', options: conditionOptions },
  { id: 'hockeyStickCondition', label: 'Hockey Stick - No cracks/delamination, tape', type: 'select', options: conditionOptions },
  { id: 'stickButtEndCondition', label: 'Stick Butt End - Properly covered/plugged', type: 'select', options: conditionOptions },
  { id: 'skateHoldersToeCapsCondition', label: 'Skate Holders & Toe Caps - No cracks', type: 'select', options: conditionOptions },
  { id: 'skateBladesCondition', label: 'Skate Blades - Clean, sharp, correct profile', type: 'select', options: conditionOptions },
  { id: 'skateRivetsEyeletsCondition', label: 'Skate Rivets & Eyelets - Intact, no missing', type: 'select', options: conditionOptions },
  { id: 'skateLacesInsolesCondition', label: 'Skate Laces & Insoles - Condition and length', type: 'select', options: conditionOptions },
];

const artisticInspectionFields: FieldConfig[] = [
  {
    id: 'artisticDiscipline',
    label: 'Disciplina',
    type: 'select',
    options: ['Singles', 'Pairs', 'Ice Dance', 'Synchronized'],
  },
  {
    id: 'wellnessGauge',
    label: 'Wellness Gauge',
    type: 'select',
    options: ['NSZ', 'New', 'Degrading', 'Restore', 'Discard'],
  },
  {
    id: 'profilePrimaryRocker',
    label: 'Profile Primary Rocker',
    type: 'number',
    placeholder: 'En pulgadas',
  },
  {
    id: 'profileSecundaryRocker',
    label: 'Profile Secundary Rocker',
    type: 'number',
    placeholder: 'En pulgadas',
  },
  {
    id: 'bladeTypeArtistico',
    label: 'Blade Type Artístico',
    type: 'select',
    options: ['Parallel', 'Parabolic', 'Tapered', 'Otra'],
  },
  {
    id: 'typeOfBladeArtistico',
    label: 'Type of Blade',
    type: 'select',
    options: ['Carbon', 'Stainless', 'Coated', 'Uncoated', 'Composite'],
  },
  {
    id: 'bladeTypeArtisticoComment',
    label: 'Comentario de Blade Type Artístico',
    type: 'textarea',
    placeholder: 'Comentario adicional si aplica...',
  },
];

const artisticDiagramFields: FieldConfig[] = [
  { id: 'toeRake', label: 'Toe Rake', type: 'text', placeholder: 'Indicador visual' },
  { id: 'toePlate', label: 'Toe Plate', type: 'text', placeholder: 'Indicador visual' },
  { id: 'spinRockerCurve', label: 'Spin Rocker Curve', type: 'text', placeholder: 'Indicador visual' },
  { id: 'bladeLengthAsStamped', label: 'Blade Length as Stamped', type: 'text', placeholder: 'Indicador visual' },
  { id: 'stanchionHeightToe', label: 'Stanchion Height - Toe', type: 'text', placeholder: 'Indicador visual' },
  { id: 'runner', label: 'Runner', type: 'text', placeholder: 'Indicador visual' },
  { id: 'rockerCurve', label: 'Rocker Curve', type: 'text', placeholder: 'Indicador visual' },
  { id: 'heelPlate', label: 'Heel Plate', type: 'text', placeholder: 'Indicador visual' },
  { id: 'stanchionHeightHeel', label: 'Stanchion Height - Heel', type: 'text', placeholder: 'Indicador visual' },
  { id: 'tail', label: 'Tail', type: 'text', placeholder: 'Indicador visual' },
];

export function NewSkater() {
  const [skateType, setSkateType] = useState('');

  const isHockey = skateType === 'hockey' || skateType === 'hockey-goalie';
  const isArtistic = skateType === 'artistic';

  return (
    <div className="p-8 max-w-6xl">
      <Link
        to="/skaters"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Volver
      </Link>

      <div className="mb-8 rounded-2xl bg-neutral-900 text-white px-8 py-7 border border-neutral-800">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
          Maximum Edge® Standards
        </p>
        <h1 className="mb-2 text-white">Hockey Equipment Safety Inspection Checklist</h1>
        <p className="text-sm text-neutral-300 max-w-3xl">
          Complete los datos para registrar el patinador, asociar su código QR,
          documentar la inspección técnica inicial y evaluar el estado del equipo.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <FormSection icon={User} title="Datos personales">
          <Input label="Nombre completo" id="name" placeholder="Ej: Carlos García" />
          <Input label="Teléfono 1" id="phone1" type="tel" placeholder="+52 55 1234 5678" />
          <Input label="Teléfono 2" id="phone2" type="tel" placeholder="Opcional" />
          <Input label="Teléfono 3" id="phone3" type="tel" placeholder="Opcional" />
          <Input label="Correo electrónico" id="email" type="email" placeholder="correo@ejemplo.com" />
        </FormSection>

        <FormSection icon={Mountain} title="Datos del patín">
          <Input label="Marca" id="brand" placeholder="Ej: Bauer, CCM, True, Jackson" />
          <Input label="Modelo de patín" id="model" placeholder="Ej: Vapor 3X Pro" />
          <Input label="Medida de cuchilla / Blade Length" id="bladeSize" type="text" placeholder="Ej: 254 mm" />

          <Select
            label="Tipo de patín"
            id="skateType"
            value={skateType}
            onChange={(event) => setSkateType(event.target.value)}
          >
            <option value="">Seleccionar tipo...</option>
            <option value="hockey">Hockey</option>
            <option value="hockey-goalie">Hockey — Portero</option>
            <option value="artistic">Patinaje artístico</option>
          </Select>
        </FormSection>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <FormSection icon={QrCodeIcon} title="Código QR">
          <div className="border-2 border-dashed border-border rounded-lg py-8 flex flex-col items-center justify-center gap-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center shadow-sm">
              <QrCodeIcon className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Escanear etiqueta QR</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Apunta la cámara al código QR
              </p>
            </div>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">o ingresa manualmente</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Input id="qrCode" placeholder="Código QR (ej: IT-0042)" />
        </FormSection>

        <FormSection icon={Sliders} title="Servicio e inspección inicial">
          <DynamicFields fields={serviceFields} />
        </FormSection>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <FormSection icon={Ruler} title="Profile Worksheet">
          <DynamicFields fields={skateTechnicalFields} />
        </FormSection>

        <FormSection icon={ClipboardCheck} title="Team Profile Worksheet">
          <DynamicFields fields={teamProfileFields} />
        </FormSection>
      </div>

      {isArtistic && (
        <div className="grid grid-cols-2 gap-5 mb-5">
          <FormSection icon={Sparkles} title="Artístico - Inspección Técnica Inicial">
            <DynamicFields fields={artisticInspectionFields} />
          </FormSection>

          <FormSection icon={FileText} title="Diagrama artístico">
            <DynamicFields fields={artisticDiagramFields} />
          </FormSection>
        </div>
      )}

      <div className="grid grid-cols-2 gap-5 mb-5">
        <FormSection icon={Ruler} title="Blade Survey">
          <DynamicFields fields={bladeSurveyFields} />
        </FormSection>

        <FormSection icon={ClipboardCheck} title="Profiling Skating Analysis">
          <DynamicFields fields={skatingAnalysisFields} />
        </FormSection>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        <FormSection icon={ShieldCheck} title="Skates and Blades Checklist">
          <DynamicFields fields={skatesAndBladesFields} />
        </FormSection>

        {isHockey ? (
          <FormSection icon={ShieldCheck} title="Hockey Equipment Safety Checklist">
            <div className="rounded-lg bg-neutral-900 text-white p-4 mb-4">
              <h3 className="text-white mb-2">Maximum Edge® Standards</h3>
              <p className="text-xs text-neutral-300">
                Use este checklist para asegurar que el equipo de protección se encuentra
                seguro y en condiciones de trabajo. Si un elemento está marcado como
                Poor o Deficient, debe repararse o reemplazarse antes de evitar lesiones.
              </p>
            </div>

            <DynamicFields fields={hockeySafetyChecklistFields} />
          </FormSection>
        ) : (
          <FormSection icon={Sparkles} title="Notas finales">
            <Textarea
              label="Notas técnicas generales"
              id="generalTechnicalNotes"
              rows={8}
              placeholder="Observaciones especiales sobre afilado, perfil, alineación, historial, preferencias del cliente..."
            />
          </FormSection>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
        <Link to="/skaters">
          <Button variant="secondary">Cancelar</Button>
        </Link>
        <Button>Guardar registro</Button>
      </div>
    </div>
  );
}