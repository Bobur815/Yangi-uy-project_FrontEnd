import { AppBar, Toolbar, Typography, Button, Stack, Avatar } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import LangSwitcher from './LangSwitcher';
import { useTranslation } from 'react-i18next';
import MyBrand from './MyBrand';
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

    '& .MuiButton-startIcon': {
        position: 'absolute',
        left: '50%',
        top: -6,                     
        transform: 'translateX(-50%) translateY(6px)',
        opacity: 0,
        margin: 0,                     
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
    },                
    '&.active .MuiButton-startIcon': {
        opacity: 1,
        transform: 'translateX(-50%) translateY(0)',     
    },
};

export default function Navbar() {
    const { t } = useTranslation();
    const { data: me } = useMe();
    const nav = useNavigate();

    return (
        <AppBar position="sticky" elevation={2} sx={{ paddingY: 2, backgroundColor: '#0B1020' }}>
            <Toolbar disableGutters className="container mx-auto flex justify-between">
                <MyBrand />
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
