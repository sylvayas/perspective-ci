import { Suspense } from "react";
import HeaderPage from "./components/header-page";
import ListSpaceCard from "./components/list-space-card";

export default async function ListeEspaces() {
  return (
    <div>
      <HeaderPage />
    
      <Suspense fallback={<div>Chargement...</div>}>
      <ListSpaceCard />
    </Suspense>
    </div>
  );
}
