// app/(website)/reservation/page.tsx
'use client';
import { Suspense } from 'react';
import ListSpaceCard from './components/list-space-card';
import { useSearchParams } from 'next/navigation';
import HeaderPage from './components/header-page';

// Sous-composant client pour gérer useSearchParams
function ReservationContent() {
  const searchParams = useSearchParams();
  const apartment = searchParams.get('apartment') || '';
  const src = searchParams.get('src') || '';

  return <ListSpaceCard  />;
}

export default function ReservationPage() {
  return (
 <>
  <HeaderPage/>
    <Suspense fallback={<div>Chargement de la réservation...</div>}>
      <ReservationContent />
    </Suspense>
 </>
  );
}