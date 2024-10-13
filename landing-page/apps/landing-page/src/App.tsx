import React, { useEffect } from 'react';
import {
  AppShell
} from '@mantine/core';
import { LandingHeader, HeroBanner, Welcome, Features, RegisterBanner, EmployeeBanner, Footer } from './containers';

function App() {

  // auto scrolling at loading fixed
  useEffect(() => {
    console.log("fix back")
    // window.scrollTo(0, 0);
    // document.querySelector('body')?.scrollIntoView({ behavior: 'smooth' });
    window.scroll(0, 0);
  }, []);

  return (
    <AppShell padding={0}>
      <LandingHeader />
      <HeroBanner />
      <Welcome />
      <Features />
      <RegisterBanner />
      <EmployeeBanner />
      <Footer />
    </AppShell>
  );
}

export default App;
