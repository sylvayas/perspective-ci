"use client"
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function RecapContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Non fourni";
  const email = searchParams.get("email") || "Non fourni";
  const phone = searchParams.get("phone") || "Non fourni";
  const dates = searchParams.get("dates") || "Aucune date";
  const guests = searchParams.get("guests") || "0";
  const roomType = searchParams.get("roomType") || "Non spécifié";
  const duration = searchParams.get("duration") || "0";
  const amount = searchParams.get("amount") || "0";
  const apartment = searchParams.get("apartment") || "Non spécifié";
  const type = searchParams.get("type") || "reservation";

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-amber-800 mb-6 text-center">
        Récapitulatif de votre {type === "reservation" ? "réservation" : "demande"}
      </h1>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-amber-200">
        <h2 className="text-xl font-semibold text-amber-700 mb-4">Détails du client :</h2>
        <div className="space-y-2">
          <p><strong>Nom :</strong> {name}</p>
          <p><strong>Email :</strong> {email}</p>
          <p><strong>Téléphone :</strong> {phone}</p>
        </div>

        <h2 className="text-xl font-semibold text-amber-700 mt-6 mb-4">
          Détails de la {type === "reservation" ? "réservation" : "demande"} :
        </h2>
        <div className="space-y-2">
          <p><strong>Appartement/Salle :</strong> {apartment}</p>
          {type === "reservation" ? (
            <>
              <p><strong>Dates :</strong> {dates}</p>
              <p><strong>Nombre de personnes :</strong> {guests}</p>
              <p><strong>Type de chambre :</strong> {roomType}</p>
            </>
          ) : (
            <>
              <p><strong>Nombre de participants :</strong> {guests}</p>
              <p><strong>Durée :</strong> {duration} heure{duration !== "1" ? "s" : ""}</p>
            </>
          )}
          <p><strong>Montant total :</strong> {amount} FCFA</p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/liste-espaces"
            className="text-amber-600 hover:text-amber-800 underline transition-colors"
          >
            Retourner à la liste des espaces
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RecapPage() {
  return (
    <Suspense fallback={<div className="container mx-auto py-10 text-center">Chargement du récapitulatif...</div>}>
      <RecapContent />
    </Suspense>
  );
}