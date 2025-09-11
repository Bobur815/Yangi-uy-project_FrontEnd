import React from 'react'
import { useTranslation } from 'react-i18next'
import WideRange from '/Vector (2).png'
import MapIcon from '/maps.png'
import TrustIcon from '/discord.png'
import CalcIcon from '/calculator.png'

function WhyChooseUse() {
    const {t} = useTranslation()

    return (
    <div className='bg-gray-200 my-3.5 py-6 gap-8 flex w-full flex-col items-center justify-center'>
        <h1 className='text-[50px] font-bold'>{t('Why Choose Us')}?</h1>
        <h3 className='text-slate-500 text-2xl'>{t('ChoiceReason')}</h3>
        <div className='container grid grid-cols-1 sm:grid-cols-2 mt-4 lg:grid-cols-4 gap-[60px] items-stretch'>
            <Reasons icon={TrustIcon} title={t('TrustTitle') || 'Trusted By Thousands'} body={'With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home.'}/>
            <Reasons icon={WideRange} title={t('WideRangeTitle') || 'Wide Renge Of Properties'} body={'With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home.'}/>
            <Reasons icon={CalcIcon} title={t('FinanceTitle') || 'Financing Made Easy'} body={'With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home.'}/>
            <Reasons icon={MapIcon} title={t('MapTitle') || 'See Neighborhoods'} body={'With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home.'}/>
        </div>
    </div>
  )
}

function Reasons({icon, title, body}){
    return (
    <div className='flex flex-col gap-5 items-center justify-center text-center'>
        <img src={icon} alt="" />
        <h1 className='text-2xl'>{title}</h1>
        <p className='text-xl text-slate-500'>{body}</p>
    </div>
)
}

export default WhyChooseUse