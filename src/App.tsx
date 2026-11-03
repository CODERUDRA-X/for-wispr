import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { PageTransition } from './motion/PageTransition';
import { SiteShell } from './components/SiteShell';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Thread = lazy(() => import('./pages/Thread').then(module => ({ default: module.Thread })));
const Builds = lazy(() => import('./pages/Builds').then(module => ({ default: module.Builds })));
const Community = lazy(() => import('./pages/Community').then(module => ({ default: module.Community })));
const Campaigns = lazy(() => import('./pages/Campaigns').then(module => ({ default: module.Campaigns })));
const Voice = lazy(() => import('./pages/Voice').then(module => ({ default: module.Voice })));
const Ask = lazy(() => import('./pages/Ask').then(module => ({ default: module.Ask })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));

function RouteContent() {
  const location = useLocation();
  return <SiteShell><AnimatePresence mode="wait"><PageTransition key={location.pathname}><Suspense fallback={<div className="app-loading">CRX / LOADING</div>}><Routes location={location}><Route path="/" element={<Home />} /><Route path="/thread" element={<Thread />} /><Route path="/builds" element={<Builds />} /><Route path="/community" element={<Community />} /><Route path="/campaigns" element={<Campaigns />} /><Route path="/voice" element={<Voice />} /><Route path="/ask" element={<Ask />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<Home />} /></Routes></Suspense></PageTransition></AnimatePresence></SiteShell>;
}

export default function App() {
  return <HashRouter><Suspense fallback={<div className="app-loading">CRX / LOADING</div>}><RouteContent /></Suspense></HashRouter>;
}
