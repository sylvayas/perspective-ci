import { Suspense } from "react";
import HeaderPage from "./components/header-page";
import ListSpaceCard from "./components/list-space-card";

export default function ListeEspaces() {

  return (
    <div>
      <HeaderPage />
      <Suspense fallback={<div>Loading reservation...</div>}>
      <ListSpaceCard />
      </Suspense>
    </div>
  );
}
export const dynamic = 'force-dynamic';