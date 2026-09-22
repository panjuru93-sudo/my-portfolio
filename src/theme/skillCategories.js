import CodeIcon from '@mui/icons-material/Code';
import PaletteIcon from '@mui/icons-material/Palette';
import StorageIcon from '@mui/icons-material/Storage';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import BrushIcon from '@mui/icons-material/Brush';

export const categoryColors = {
  Frontend: '#1455F5',
  Framework: '#06B6D4',
  Design: '#EC4899',
  Backend: '#22C55E',
  UI: '#7C3AED',
  Tool: '#F59E0B',
};

export const categoryIcons = {
  Frontend: CodeIcon,
  Framework: ViewInArIcon,
  Design: BrushIcon,
  Backend: StorageIcon,
  UI: PaletteIcon,
  Tool: BuildOutlinedIcon,
};

export const CATEGORY_ORDER = ['Frontend', 'Framework', 'Design', 'Backend', 'UI', 'Tool'];
