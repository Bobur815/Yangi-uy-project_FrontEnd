import { AppBar, Toolbar, Typography, Button, Stack, Avatar } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import LangSwitcher from './LangSwitcher';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import logo from '/XMLID 1.png'
import roofIcon from '/icons8-roof-100.png'
const roofNode = <img src={roofIcon} alt="" />;

const navBtnSx = {
    position: 'relative',
    color: 'white',
    textTransform: 'none',
    px: 0.5,
    '&:hover': {
        backgroundColor: 'transparent',
        color: '#0E7C86',
    },

    // underline (animates left -> right)
    '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: -2,
        height: 2,
        width: 0,
        backgroundColor: 'currentColor',
        transition: 'width 240ms ease',
    },
    '&:hover::after': { width: '100%' },

    /* place the startIcon above text and hide by default */
    '& .MuiButton-startIcon': {
        position: 'absolute',
        left: '50%',
        top: -6,                      // sits above the text
        transform: 'translateX(-50%) translateY(6px)',
        opacity: 0,
        margin: 0,                     // remove MUI’s default gap
        transition: 'opacity 220ms ease, transform 220ms ease',
        '& > img, & > svg': { width: 50, height: 20, display: 'block' },
    },
    '&:hover .MuiButton-startIcon': {
        opacity: 1,
        transform: 'translateX(-50%) translateY(0)',
    },

    /* === ACTIVE STATE (NavLink adds .active) === */
    '&.active': {
        color: '#0E7C86',
    },                 // keep underline
    '&.active .MuiButton-startIcon': {
        opacity: 1,
        transform: 'translateX(-50%) translateY(0)',        // keep roof visible
    },
};

export default function Navbar() {
    const { t } = useTranslation();
    const { data: me } = useMe();
    const nav = useNavigate();

    return (
        <AppBar position="sticky" elevation={2} sx={{ paddingY: 2, backgroundColor: '#0B1020' }}>
            <Toolbar disableGutters className="container mx-auto flex justify-between">
                <Stack
                    component={RouterLink}
                    to="/"
                    direction="row"
                    spacing={2}
                    alignItems="flex-end"
                    sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                >
                    <img src={logo} alt="" className='w-[40px]' />
                    <Typography
                        variant="h6"
                        color="inherit"
                        sx={{ fontSize: 24, alignSelf: 'flex-end', lineHeight: 1 }}
                    >
                        Yangi
                        <span className="relative inline-block ml-2 rounded bg-[#0E7C86] text-white">

                            <span
                                aria-hidden
                                className="absolute -top-7 left-1/2 -translate-x-1/2 w-[35px] pointer-events-none"
                            >
                                {roofNode}
                            </span>

                            <span className="p-1 inline-block">Uy</span>
                        </span>
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={4}>
                    <Button
                        component={NavLink}
                        to="/"
                        end                      // home is only active on exact "/"
                        size="large"
                        disableRipple
                        startIcon={roofNode}
                        sx={navBtnSx}
                    >
                        {t('home')}
                    </Button>

                    <Button
                        component={NavLink}
                        to="/listings"
                        size="large"
                        disableRipple
                        startIcon={roofNode}
                        sx={navBtnSx}
                    >
                        {t('properties')}
                    </Button>

                    <Button
                        component={NavLink}
                        to="/contacts"
                        size="large"
                        disableRipple
                        startIcon={roofNode}
                        sx={navBtnSx}
                    >
                        {t('contacts')}
                    </Button>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    {me ? (
                        <>
                            <Button component={Link} to="/profile" size="small">{t('profile')}</Button>
                            <Avatar src={me.avatarUrl || undefined} sx={{ width: 28, height: 28 }} />
                            <Button size="small" onClick={() => { localStorage.clear(); nav('/auth'); }}>{t('logout')}</Button>
                        </>
                    ) : (
                        <Button component={Link} to="/auth" size="large" sx={{ '&:hover': { backgroundColor: '#4D5556' } }}>{t('login')}</Button>
                    )}
                    <LangSwitcher />
                </Stack>
            </Toolbar>
        </AppBar >
    );
}
