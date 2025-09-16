import { AppBar, Toolbar, Typography, Button, Stack, Avatar, useScrollTrigger } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useMe } from '../../hooks/useMe';
import LangSwitcher from '../LangSwitcher';
import { useTranslation } from 'react-i18next';
import MyBrand from './MyBrand';
import roofIcon from '/icons8-roof-100.png'
import { useQueryClient } from '@tanstack/react-query';
import { ACCESS, REFRESH } from '../../lib/tokens';
import { absUrl } from '../../lib/media';
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
        transition: 'opacity 200ms ease, transform 200ms ease',
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
    const nav = useNavigate();
    const qc = useQueryClient();
    const { data: me, isLoading, isFetching } = useMe();
    
    const scrolled = useScrollTrigger({
        disableHysteresis: true,
        threshold: 10,
    });

    const handleLogout = async () => {
        if (confirm(t('Are_you_Sure?'))) {
            localStorage.removeItem(ACCESS);
            localStorage.removeItem(REFRESH);

            try { await api.post('/auth/logout'); } catch { }
            qc.setQueryData(['me'], null);
            qc.removeQueries({ queryKey: ['me'], exact: true });
            qc.invalidateQueries({ queryKey: ['me'] });
            nav('/auth', { replace: true });
        }
    };

    const bg = scrolled ? "rgba(11,16,32,0.6)" : "#0B1020";
    const blur = scrolled ? "blur(10px)" : "none";

    return (
        <AppBar position='sticky' elevation={2}
            sx={{
                paddingY: 1,
                backgroundColor: bg,
                transition: "background-color 220ms ease-in-out, box-shadow 220ms ease",
                backdropFilter: blur,
                WebkitBackdropFilter: blur,
            }}>
            <Toolbar disableGutters className="container mx-auto flex justify-between">
                <MyBrand />
                <Stack direction="row" spacing={4}>
                    <Button
                        component={NavLink}
                        to="/"
                        end
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
                    {isLoading ? null : me ? (
                        <>
                            <Button component={Link} to="/profile" size="small">{t('profile')}</Button>
                            <Avatar src={absUrl(me.avatarUrl) || undefined} sx={{ width: 28, height: 28 }} />
                            <Button size="small" onClick={handleLogout}>{t('logout')}</Button>
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
