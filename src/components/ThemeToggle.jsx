// ThemeToggle.jsx
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useThemeMode } from '../theme/ThemeProvider';

export default function ThemeToggle() {
  const { mode, setMode } = useThemeMode();
  const next = mode === 'light' ? 'dark' : 'light';

  return (
    <Tooltip title={`Switch to ${next} mode`}>
      <IconButton onClick={() => setMode(next)} aria-label="toggle theme">
        {mode === 'light' ? <Brightness4Icon /> : <WbSunnyIcon />}
      </IconButton>
    </Tooltip>
  );
}
