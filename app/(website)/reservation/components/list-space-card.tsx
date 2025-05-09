'use client';
import React, { useState, useRef, Suspense } from "react";
import { Calendar as CalendarIcon, Users, Bed, Loader2, Mail, Phone, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import { mainProperties, otherProperties } from "@/components/space/Description";

// Types simplifiés
interface IFormInput {
  name: string;
  email: string;
  phone: string;
  guests?: number; // Pour les appartements
  participants?: number; // Pour les salles de conférence
  roomType?: string; // Pour les appartements
  duration?: number; // Pour les salles de conférence
}

interface RoomType {
  id: string;
  title: string;
  pricePerNight: number;
}

const roomTypes: RoomType[] = [
  { id: "single", title: "Chambre simple", pricePerNight: 10000 },
  { id: "double", title: "Chambre double", pricePerNight: 15000 },
  { id: "suite", title: "Suite", pricePerNight: 25000 },
];

const apartmentDescriptions: { [key: string]: string } = {
  "Appartement B": "L'appartement B séduit par sa simplicité soignée et son atmosphère accueillante. Composé de 3 pièces, dont 2 chambres, il propose un cadre de vie équilibré, alliant confort et esthétique. Entièrement équipé et meublé, il offre un environnement convivial, idéal pour un séjour serein au cœur d'Abidjan.",
  "Appartement B23": "Perché au 8e étage de l'immeuble Oumou Sidibé, au cœur de Marcory Zone 4, l'appartement B23 allie confort et sophistication. Composé de 4 pièces dont 3 chambres raffinées, il séduit par son ambiance chaleureuse et sa décoration élégante et épurée. Entièrement équipé, il offre à ses résidents un cadre de vie haut de gamme avec un accès à une salle de sport, une piscine et un parking. Depuis ses larges ouvertures, une vue magnifique sur Abidjan vient sublimer cet espace pensé pour une clientèle exigeante.",
  "Appartement Pressing": "L'appartement Pressing se distingue par sa simplicité et son ambiance chaleureuse. De taille contenue, il offre un cadre pratique tout en étant doté d'une décoration élégante et sobre. Composé de 2 pièces, dont 1 chambre, il assure confort et fonctionnalité. Entièrement équipé, cet appartement est idéal pour des séjours courts. La qualité de ses équipements et son agencement optimisé vous garantissent une expérience à la fois pratique et élégante.",
  "Appartement Prima": "Alliant espace et élégance, l'appartement Prima se distingue par son ambiance chaleureuse et sa décoration raffinée. Composé de 2 pièces contenu, il offre un cadre de vie agréable, pensé pour le confort et la sérénité. Entièrement équipé et doté d'un accès à un parking, il bénéficie d'un emplacement stratégique, idéal pour saisir chaque opportunité et profiter d'une grande liberté de mouvement au quotidien.",
  "Appartement Soleil": "Niché au 1e étage de l'immeuble Soleil, cet appartement séduit par son volume généreux et son atmosphère raffinée. Ses larges baies vitrées laissent entrer une lumière naturelle abondante, mettant en valeur une décoration élégante et épurée. Avec ses 4 pièces, dont 3 chambres spacieuses et autonomes, il offre un cadre de vie harmonieux, propice à la sérénité. Entièrement équipé et bénéficiant d'un accès à un parking, il conjugue confort et praticité en plein cœur de Marcory Zone 4.",
  "Complexe Carré Massina": "Situés dans le magnifique complexe Carré Massina, nos appartements de 3 et 4 pièces allient simplicité et chaleur. Avec une décoration élégante et sobre, chaque espace est pensé pour offrir à ses occupants confort et fonctionnalité. Entièrement équipés et meublés, ces appartements vous garantissent efficacité et praticité, tout en vous offrant un cadre de vie à la fois beau et raffiné. Idéalement situés à proximité de l'Aéroport Félix Houphouët-Boigny, ils sont parfaits pour les voyages d'affaires ou les déplacements, offrant un environnement calme et élégant.",
  "Salles de conf": "Nos salles de conférence au Complexe Carré Massina sont idéales pour vos réunions professionnelles ou événements. Spacieuses et équipées, elles offrent un cadre élégant et fonctionnel, parfait pour des sessions productives.",
};

function ApartmentDetails({ formRef }: { formRef: React.RefObject<HTMLFormElement> }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const apartment = searchParams.get("apartment");
  const selectedApartmentImage = [...mainProperties, ...otherProperties].find(
    (prop) => prop.apartment === apartment
  );

  React.useEffect(() => {
    if (!apartment) {
      router.push("/");
    } else if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [apartment, formRef, router]);

  if (!apartment || !selectedApartmentImage) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <Image
            src={selectedApartmentImage.src}
            alt={selectedApartmentImage.alt}
            width={selectedApartmentImage.width}
            height={selectedApartmentImage.height}
            className="w-full h-[300px] object-cover rounded-lg shadow-md"
            quality={85}
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-amber-800 mb-4">{apartment}</h2>
          <p className="text-amber-600 leading-relaxed">
            {apartmentDescriptions[apartment] || "Découvrez cet espace moderne conçu pour offrir une expérience exceptionnelle."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RoomReservationForm({
  hotel = { id: "unknown", name: "Unknown Hotel" },
}: {
  hotel?: { id: string; name: string };
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<number>(1);
  const [participants, setParticipants] = useState<number>(1); // Pour les salles de conférence
  const [roomType, setRoomType] = useState<string>(roomTypes[0].id);
  const [duration, setDuration] = useState<number>(1); // Pour les salles de conférence
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ mode: "onChange" });

  const formData = watch();
  const searchParams = useSearchParams();
  const apartment = searchParams.get("apartment");
  const isConferenceRoom = apartment === "Salles de conf";

  const calculateAmount = (guestsOrParticipants: number, roomType: string, dates: Date[], duration?: number): number => {
    if (isConferenceRoom) {
      // Calcul simplifié pour les salles de conférence
      if (!guestsOrParticipants || !duration || duration <= 0) return 0;
      return 5000 * guestsOrParticipants * duration; // Exemple : 5000 FCFA par participant par heure
    } else {
      // Calcul pour les appartements
      if (!guestsOrParticipants || !roomType || !dates || dates.length === 0) return 0;
      const qty = guestsOrParticipants || 0;
      if (qty <= 0) return 0;
      const selectedRoom = roomTypes.find((room) => room.id === roomType);
      if (!selectedRoom) return 0;
      const nights = dates.length;
      if (nights <= 0) return 0;
      return selectedRoom.pricePerNight * qty * nights;
    }
  };

  React.useEffect(() => {
    const amount = isConferenceRoom
      ? calculateAmount(participants, "", [], duration)
      : calculateAmount(guests, roomType, selectedDates);
    setTotalAmount(amount);
  }, [guests, roomType, selectedDates, participants, duration, isConferenceRoom]);

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const params = new URLSearchParams({
        type: isConferenceRoom ? "conference" : "reservation",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        hotelId: hotel.id,
        dates: selectedDates.map((date) => dayjs(date).format("YYYY-MM-DD")).join(","),
        guests: isConferenceRoom ? participants.toString() : guests.toString(),
        roomType: isConferenceRoom ? "" : roomType,
        duration: isConferenceRoom ? duration.toString() : "",
        amount: totalAmount.toString(),
        apartment: apartment || "",
      }).toString();

      router.push(`/recap?${params}`);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      setErrorMessage("Une erreur s'est produite lors de la soumission. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalendarSelect = (dates: Date[] | undefined) => {
    setSelectedDates(dates || []);
  };

  const sortedDates = [...selectedDates].sort((a, b) => a.getTime() - b.getTime());
  const isValidForm = isValid && (isConferenceRoom ? duration >= 1 : selectedDates.length > 0 && guests >= 1);

  return (
    <section className="container min-h-[200px] py-14 bg-gradient-to-b from-amber-50 to-white">
      <Suspense fallback={<div>Chargement...</div>}>
        <ApartmentDetails formRef={formRef} />
      </Suspense>
      {errorMessage && (
        <div className="max-w-5xl mx-auto mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {errorMessage}
        </div>
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 md:gap-8 lg:grid-cols-2 mt-6 max-w-5xl mx-auto min-h-[200px]"
      >
        <div className="space-y-6">
          <Card className="shadow-lg border-amber-200">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-800 flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Informations du client
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-amber-700">Nom complet</Label>
                <Input
                  id="name"
                  type="text"
                  className="border-amber-300 focus:ring-amber-500"
                  {...register("name", { required: "Le nom est requis" })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-amber-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="border-amber-300 focus:ring-amber-500"
                    {...register("email", {
                      required: "L'email est requis",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Adresse email invalide",
                      },
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-amber-700">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="border-amber-300 focus:ring-amber-500"
                    {...register("phone", { required: "Le téléphone est requis" })}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-amber-200 min-h-[80px]">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-800 flex items-center">
                <Bed className="h-6 w-6 mr-2" />
                Détails de la {isConferenceRoom ? "réservation de salle" : "réservation"}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {isConferenceRoom ? (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="participants" className="text-amber-700">Nombre de participants</Label>
                    <Input
                      id="participants"
                      type="number"
                      min="1"
                      value={participants}
                      onChange={(e) => setParticipants(Math.max(1, parseInt(e.target.value)))}
                      className="border-amber-300 focus:ring-amber-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration" className="text-amber-700">Durée (en heures)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value)))}
                      className="border-amber-300 focus:ring-amber-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="guests" className="text-amber-700">Nombre de personnes</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value)))}
                      className="border-amber-300 focus:ring-amber-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="roomType" className="text-amber-700">Type de chambre</Label>
                    <select
                      id="roomType"
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="border-amber-300 focus:ring-amber-500 rounded-md p-2"
                    >
                      {roomTypes.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.title} ({room.pricePerNight} FCFA/nuit)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-amber-700 flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Dates de la réservation
                    </Label>
                    <Calendar
                      id="reservationDates"
                      mode="multiple"
                      selected={selectedDates}
                      onSelect={handleCalendarSelect}
                      showOutsideDays={true}
                      fromDate={new Date()}
                      className="rounded-md border border-amber-300"
                      aria-multiselectable="true"
                    />
                    {selectedDates.length > 0 ? (
                      <p className="text-sm text-amber-600">
                        Dates sélectionnées :{" "}
                        {sortedDates.map((date) => dayjs(date).format("YYYY-MM-DD")).join(" - ")}
                      </p>
                    ) : (
                      <p className="text-sm text-amber-600">Aucune date sélectionnée</p>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg border-amber-200 h-full">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-800 flex items-center">
              <Home className="h-6 w-6 mr-2" />
              Résumé de la {isConferenceRoom ? "réservation de salle" : "réservation"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Nom du client
              </p>
              <p className="text-amber-600">{formData.name || "Non fourni"}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email
              </p>
              <p className="text-amber-600">{formData.email || "Non fourni"}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Téléphone
              </p>
              <p className="text-amber-600">{formData.phone || "Non fourni"}</p>
            </div>
            {isConferenceRoom ? (
              <>
                <div className="grid gap-2">
                  <p className="text-amber-700 font-semibold flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Nombre de participants
                  </p>
                  <p className="text-amber-600">{participants}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-amber-700 font-semibold">Durée</p>
                  <p className="text-amber-600">{duration} heure{duration > 1 ? "s" : ""}</p>
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-2">
                  <p className="text-amber-700 font-semibold flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Dates sélectionnées
                  </p>
                  <p className="text-amber-600">
                    {sortedDates.length > 0
                      ? sortedDates.map((date) => dayjs(date).format("YYYY-MM-DD")).join(", ")
                      : "Aucune date sélectionnée"}
                  </p>
                </div>
                <div className="grid gap-2">
                  <p className="text-amber-700 font-semibold flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Nombre de clients
                  </p>
                  <p className="text-amber-600">{guests}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-amber-700 font-semibold flex items-center">
                    <Bed className="h-5 w-5 mr-2" />
                    Type de chambre
                  </p>
                  <p className="text-amber-600">
                    {roomTypes.find((r) => r.id === roomType)?.title || "Non fourni"}
                  </p>
                </div>
              </>
            )}
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold">Total du prix</p>
              <p className="text-lg font-bold text-amber-800">
                {totalAmount > 0
                  ? `${totalAmount} FCFA ${isConferenceRoom ? `(${duration} heure${duration > 1 ? "s" : ""})` : `(${sortedDates.length} nuit${sortedDates.length > 1 ? "s" : ""})`}`
                  : "Non calculé"}
              </p>
            </div>
            <Button
              type="submit"
              disabled={!isValidForm || isSubmitting}
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white gap-2 w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>En cours...</span>
                </>
              ) : (
                <span>Confirmer la {isConferenceRoom ? "demande" : "réservation"}</span>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}