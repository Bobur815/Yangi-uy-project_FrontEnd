import { Stack, Typography } from '@mui/material'
import React from 'react'

import { Link as RouterLink } from 'react-router-dom';
import logo from '/XMLID 1.png'

import roofIcon from '/icons8-roof-100.png'
const roofNode = <img src={roofIcon} alt="" />;

function MyBrand() {
    return (
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
    )
}

export default MyBrand