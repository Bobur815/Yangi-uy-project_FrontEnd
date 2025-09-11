import React from 'react'
import Navbar from '../components/Navbar'
import AuthPage from './AuthPage'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import SimpleSlider from '../components/MainSlider'
import RecommendedSlider from '../components/Recommended'
import WhyChooseUse from '../components/WhyChooseUse'
import CategorySlider from '../components/CategorySlider'
import PopularHome from '../components/PopularHome'
import RecentRentSlider from '../components/RecentRents'
import Testimonials from '../components/Testimonials'

function Home() {
  return (
    <div>
        <SearchBar />
        <SimpleSlider />
        <RecommendedSlider />
        <WhyChooseUse />
        <CategorySlider/>
        <PopularHome />
        <RecentRentSlider/>
        <Testimonials />
    </div>
  )
}

export default Home