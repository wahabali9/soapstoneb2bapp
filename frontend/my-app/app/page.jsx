"use client";
import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/Heroslider';
import ProductShowroom from './components/Productshowroom';
import RFQForm from './components/RFQform';
import TrackOrderModal from './components/Trackorder';

export default function Home() {
  const [showTrackModal, setShowTrackModal] = useState(false);

  return (
    <div className='min-h-screen bg-slate-950 text-slate-300 font-sans'>
      <Navbar onOpenTrackModal={() => setShowTrackModal(true)} />
      <HeroSlider />
      <ProductShowroom />
      <RFQForm />
      <TrackOrderModal isOpen={showTrackModal} onClose={() => setShowTrackModal(false)} />
    </div>
  );
}