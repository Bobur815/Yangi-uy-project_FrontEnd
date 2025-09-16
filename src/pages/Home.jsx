import React from 'react'
import SearchBar from '../components/home/SearchBar'
import SimpleSlider from '../components/home/MainSlider'
import RecommendedSlider from '../components/home/Recommended'
import WhyChooseUse from '../components/home/WhyChooseUse'
import CategorySlider from '../components/home/CategorySlider'
import PopularHome from '../components/home/PopularHome'
import RecentRentSlider from '../components/home/RecentRents'
import Testimonials from '../components/home/Testimonials'

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