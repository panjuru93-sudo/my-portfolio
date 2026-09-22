import DiamondIcon from '@mui/icons-material/Diamond';
import PaletteIcon from '@mui/icons-material/Palette';
import BoltIcon from '@mui/icons-material/Bolt';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import AdjustIcon from '@mui/icons-material/Adjust';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import ExtensionIcon from '@mui/icons-material/Extension';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HubIcon from '@mui/icons-material/Hub';
import TerminalIcon from '@mui/icons-material/Terminal';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LayersIcon from '@mui/icons-material/Layers';

// 스킬 데이터의 icon 문자열 키 → MUI 아이콘 컴포넌트
export const skillIconMap = {
  'orange-diamond': DiamondIcon,
  palette: PaletteIcon,
  zap: BoltIcon,
  atom: BlurCircularIcon,
  target: AdjustIcon,
  code: CodeIcon,
  storage: StorageIcon,
  extension: ExtensionIcon,
  git: AccountTreeIcon,
  hub: HubIcon,
  terminal: TerminalIcon,
  coffee: LocalCafeIcon,
  phone: PhoneIphoneIcon,
  layers: LayersIcon,
};

// "스킬 추가" 폼에서 고를 수 있는 아이콘 팔레트
export const SKILL_ICON_OPTIONS = [
  { key: 'orange-diamond', label: 'HTML' },
  { key: 'palette', label: 'CSS/디자인' },
  { key: 'zap', label: 'JS' },
  { key: 'atom', label: 'React 계열' },
  { key: 'target', label: 'Figma/기획' },
  { key: 'layers', label: 'Vue' },
  { key: 'extension', label: 'Angular' },
  { key: 'hub', label: 'Node.js' },
  { key: 'terminal', label: 'Python' },
  { key: 'coffee', label: 'Java' },
  { key: 'git', label: 'Git' },
  { key: 'phone', label: 'React Native' },
  { key: 'storage', label: 'DB' },
  { key: 'code', label: '기타' },
];
