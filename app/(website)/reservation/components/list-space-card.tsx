'use client';
import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { ArrowUpRight, Calendar as CalendarIcon, Users, Bed, Loader2, Mail, Phone, Home, Clock, Projector } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { usePay } from "@/hooks/usePay";
import { toast } from "sonner";
import { mainProperties, otherProperties } from "@/components/space/Description";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";

// Type definitions (inchangées)
interface CalendarProps {
  id?: string;
  mode?: "multiple" | "single";
  selected: Date[] | Date | undefined;
  onSelect: (dates: Date[] | Date | undefined) => void;
  showOutsideDays?: boolean;
  fromDate?: Date;
  className?: string;
}

interface IFormInput {
  name: string;
  email: string;
  phone: string;
}

interface IApartmentFormInput extends IFormInput {
  guests: number;
  roomType: string;
}

interface IConferenceFormInput extends IFormInput {
  participants: number;
  duration: number;
  equipment: string[];
}

interface RoomType {
  id: string;
  title: string;
  pricePerNight: number;
}

interface ConferenceRoomType {
  id: string;
  title: string;
  pricePerHour: number;
}

const roomTypes: RoomType[] = [
  { id: "single", title: "Chambre simple", pricePerNight: 10000 },
  { id: "double", title: "Chambre double", pricePerNight: 15000 },
  { id: "suite", title: "Suite", pricePerNight: 25000 },
];

const conferenceRoomTypes: ConferenceRoomType[] = [
  { id: "small", title: "Petite salle de réunion", pricePerHour: 5000 },
  { id: "large", title: "Grande salle de réunion", pricePerHour: 10000 },
];

const equipmentOptions = [
  { id: "projector", label: "Projecteur" },
  { id: "whiteboard", label: "Tableau blanc" },
  { id: "audio", label: "Système audio" },
];

// Apartment-specific descriptions (inchangées)
const apartmentDescriptions: { [key: string]: string } = {
  "Appartement B":
    "L'appartement B séduit par sa simplicité soignée et son atmosphère accueillante. Composé de 3 pièces, dont 2 chambres, il propose un cadre de vie équilibré, alliant confort et esthétique. Entièrement équipé et meublé, il offre un environnement convivial, idéal pour un séjour serein au cœur d'Abidjan.",
  "Appartement B23":
    "Perché au 8e étage de l'immeuble Oumou Sidibé, au cœur de Marcory Zone 4, l'appartement B23 allie confort et sophistication. Composé de 4 pièces dont 3 chambres raffinées, il séduit par son ambiance chaleureuse et sa décoration élégante et épurée. Entièrement équipé, il offre à ses résidents un cadre de vie haut de gamme avec un accès à une salle de sport, une piscine et un parking. Depuis ses larges ouvertures, une vue magnifique sur Abidjan vient sublimer cet espace pensé pour une clientèle exigeante.",
  "Appartement Pressing":
    "L'appartement Pressing se distingue par sa simplicité et son ambiance chaleureuse. De taille contenue, il offre un cadre pratique tout en étant doté d'une décoration élégante et sobre. Composé de 2 pièces, dont 1 chambre, il assure confort et fonctionnalité. Entièrement équipé, cet appartement est idéal pour des séjours courts. La qualité de ses équipements et son agencement optimisé vous garantissent une expérience à la fois pratique et élégante.",
  "Appartement Prima":
    "Alliant espace et élégance, l'appartement Prima se distingue par son ambiance chaleureuse et sa décoration raffinée. Composé de 2 pièces contenu, il offre un cadre de vie agréable, pensé pour le confort et la sérénité. Entièrement équipé et doté d'un accès à un parking, il bénéficie d'un emplacement stratégique, idéal pour saisir chaque opportunité et profiter d'une grande liberté de mouvement au quotidien.",
  "Appartement Soleil":
    "Niché au 1e étage de l'immeuble Soleil, cet appartement séduit par son volume généreux et son atmosphère raffinée. Ses larges baies vitrées laissent entrer une lumière naturelle abondante, mettant en valeur une décoration élégante et épurée. Avec ses 4 pièces, dont 3 chambres spacieuses et autonomes, il offre un cadre de vie harmonieux, propice à la sérénité. Entièrement équipé et bénéficiant d'un accès à un parking, il conjugue confort et praticité en plein cœur de Marcory Zone 4.",
  "Complexe Carré Massina":
    "Situés dans le magnifique complexe Carré Massina, nos appartements de 3 et 4 pièces allient simplicité et chaleur. Avec une décoration élégante et sobre, chaque espace est pensé pour offrir à ses occupants confort et fonctionnalité. Entièrement équipés et meublés, ces appartements vous garantissent efficacité et praticité, tout en vous offrant un cadre de vie à la fois beau et raffiné. Idéalement situés à proximité de l'Aéroport Félix Houphouët-Boigny, ils sont parfaits pour les voyages d'affaires ou les déplacements, offrant un environnement calme et élégant.",
};

// Composant pour les détails de l'appartement (inchangé)
function ApartmentDetails({ formRef }: { formRef: React.RefObject<HTMLFormElement> }) {
  const searchParams = useSearchParams();
  const apartment = searchParams.get("apartment");
  const selectedApartmentImage = [...mainProperties, ...otherProperties].find(
    (prop) => prop.apartment === apartment
  );

  useEffect(() => {
    if (apartment && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [apartment, formRef]);

  if (!apartment || !selectedApartmentImage) {
    return null;
  }

  if (apartment === "Salles de conf") {
    return (
      <div className="max-w-5xl mx-auto mt-6 mb-8">
        <Image
          src={selectedApartmentImage.src}
          alt={selectedApartmentImage.alt}
          width={selectedApartmentImage.width}
          height={selectedApartmentImage.height}
          className="w-full h-[300px] object-cover rounded-lg shadow-md"
          quality={85}
        />
      </div>
    );
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
            {apartmentDescriptions[apartment] ||
              "Découvrez le confort et l'élégance de cet espace moderne conçu pour offrir une expérience de vie exceptionnelle. Entièrement équipé, il garantit un séjour agréable et fonctionnel."}
          </p>
        </div>
      </div>
    </div>
  );
}

// Composant pour le formulaire des salles de conférence (inchangé)
function ConferenceReservationForm({
  hotel,
  apartment,
}: {
  hotel: { id: string; name: string };
  apartment: string | null;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [participants, setParticipants] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  const [roomType, setRoomType] = useState<string>(conferenceRoomTypes[0].id);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [data, setData] = useState<IConferenceFormInput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IConferenceFormInput>({
    mode: "onChange",
  });

  const calculateAmount = useCallback(
    (participants: number, roomType: string, duration: number): number => {
      if (!participants || !roomType || !duration) return 0;

      const qty = participants || 0;
      if (qty <= 0) return 0;

      const selectedRoom = conferenceRoomTypes.find((room) => room.id === roomType);
      if (!selectedRoom) return 0;

      return selectedRoom.pricePerHour * duration;
    },
    []
  );

  const { open, paymentStatus } = usePay();

  const isValidForm = isValid && selectedDate && participants >= 1 && duration >= 1;

  const onSubmit: SubmitHandler<IConferenceFormInput> = async (formData) => {
    setIsSubmitting(true);
    setData(formData);
    const amount = calculateAmount(participants, roomType, duration);
    try {
      if (amount > 0) {
        await open({
          amount,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        });
      } else {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: "Conference Room Reservation Request",
            to: [formData.email, "reservations@hotel.com"],
            emailData: {
              hotelName: hotel.name,
              roomType: conferenceRoomTypes.find((r) => r.id === roomType)?.title,
              clientName: formData.name,
              clientEmail: formData.email,
              clientPhone: formData.phone,
              date: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : "Not specified",
              participants,
              duration,
              equipment: equipment.join(", ") || "None",
              totalPrice: amount,
              apartment: apartment || "Salles de conf",
            },
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to send email");
        }
        router.push(
          `/recap?type=conference&name=${encodeURIComponent(
            formData.name
          )}&email=${encodeURIComponent(
            formData.email
          )}&phone=${encodeURIComponent(
            formData.phone
          )}&hotelId=${hotel.id}&date=${encodeURIComponent(
            selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""
          )}&participants=${participants}&roomType=${roomType}&duration=${duration}&equipment=${encodeURIComponent(
            equipment.join(",")
          )}&apartment=${encodeURIComponent(apartment || "Salles de conf")}`
        );
      }
    } catch (error) {
      toast("Error", {
        description: `An error occurred: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (participants && roomType && duration) {
      const amount = calculateAmount(participants, roomType, duration);
      setTotalAmount(amount);
    } else {
      setTotalAmount(0);
    }
  }, [participants, roomType, duration, calculateAmount]);

  useEffect(() => {
    if (paymentStatus === "success" && data) {
      setIsSubmitting(true);
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Conference Room Reservation Confirmation",
          to: [data.email, "reservations@hotel.com"],
          emailData: {
            hotelName: hotel.name,
            roomType: conferenceRoomTypes.find((r) => r.id === roomType)?.title,
            clientName: data.name,
            clientEmail: data.email,
            clientPhone: data.phone,
            date: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : "Not specified",
            participants,
            duration,
            equipment: equipment.join(", ") || "None",
            totalPrice: totalAmount,
            apartment: apartment || "Salles de conf",
          },
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send email");
          }
          router.push(
            `/recap?type=conference&name=${encodeURIComponent(
              data.name
            )}&email=${encodeURIComponent(
              data.email
            )}&phone=${encodeURIComponent(
              data.phone
            )}&hotelId=${hotel.id}&date=${encodeURIComponent(
              selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""
            )}&participants=${participants}&roomType=${roomType}&duration=${duration}&equipment=${encodeURIComponent(
              equipment.join(",")
            )}&amount=${totalAmount}&apartment=${encodeURIComponent(apartment || "Salles de conf")}`
          );
        })
        .catch((error) => {
          toast("Error", {
            description: `An error occurred while sending the confirmation: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else if (paymentStatus === "error") {
      toast("Payment Failed", {
        description: "An error occurred during payment. Please try again.",
      });
      setIsSubmitting(false);
    }
  }, [paymentStatus, data, totalAmount, hotel.id, hotel.name, selectedDate, participants, roomType, duration, equipment, router, apartment]);

  const handleEquipmentChange = (equipId: string) => {
    setEquipment((prev) =>
      prev.includes(equipId) ? prev.filter((id) => id !== equipId) : [...prev, equipId]
    );
  };

  return (
    <section className="container min-h-[200px] py-14 bg-gradient-to-b from-amber-50 to-white">
      <Suspense fallback={<div>Chargement de l&apos;image...</div>}>
        <ApartmentDetails formRef={formRef} />
      </Suspense>
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
                Information sur le client
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-amber-700">
                  Nom & prénom
                </Label>
                <Input
                  id="name"
                  type="text"
                  className="border-amber-300 focus:ring-amber-500"
                  {...register("name", { required: "Full name is required" })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-amber-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="border-amber-300 focus:ring-amber-500"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-amber-700">
                    Télephone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="border-amber-300 focus:ring-amber-500"
                    {...register("phone", { required: "Phone is required" })}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-amber-200 min-h-[80px]">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-800 flex items-center">
                <Projector className="h-6 w-6 mr-2" />
                Détails de la conférence
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="participants" className="text-amber-700">
                  Nombres de participants
                </Label>
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
                <Label htmlFor="duration" className="text-amber-700">
                  La durée (heures)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value)))}
                  className="border-amber-300 focus:ring-amber-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="roomType" className="text-amber-700">
                  Type de salle
                </Label>
                <select
                  id="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="border-amber-300 focus:ring-amber-500 rounded-md p-2"
                >
                  {conferenceRoomTypes.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.title} ({room.pricePerHour} FCFA/hour)
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label className="text-amber-700">Equipements</Label>
                <div className="grid gap-2">
                  {equipmentOptions.map((equip) => (
                    <label key={equip.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={equipment.includes(equip.id)}
                        onChange={() => handleEquipmentChange(equip.id)}
                        className="border-amber-300 focus:ring-amber-500"
                      />
                      <span className="text-amber-600">{equip.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-amber-700 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Date de réservation
                </Label>
                <Calendar
                  id="reservationDate"
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  showOutsideDays={true}
                  fromDate={new Date()}
                  className="rounded-md border border-amber-300"
                />
                {selectedDate ? (
                  <p className="text-sm text-amber-600">
                    Selectionné la date: {dayjs(selectedDate).format("YYYY-MM-DD")}
                  </p>
                ) : (
                  <p className="text-sm text-amber-600">Date non selectionné</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg border-amber-200 h-full">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-800 flex items-center">
              <Home className="h-6 w-6 mr-2" />
              Résumé de la réservation
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Nom du client
              </p>
              <p className="text-amber-600">{data?.name || "Non fourni"}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email
              </p>
              <p className="text-amber-600">{data?.email || "Non fourni"}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Télephone
              </p>
              <p className="text-amber-600">{data?.phone || "Non fourni"}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Date selectionnée
              </p>
              <p className="text-amber-600">
                {selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : "Date non fourni"}
              </p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Nombres de participants
              </p>
              <p className="text-amber-600">{participants}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Durée
              </p>
              <p className="text-amber-600">{duration} heure{duration > 1 ? "s" : ""}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <Projector className="h-5 w-5 mr-2" />
                Type de Salle
              </p>
              <p className="text-amber-600">
                {conferenceRoomTypes.find((r) => r.id === roomType)?.title || "Non fourni"}
              </p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <Projector className="h-5 w-5 mr-2" />
                Equipements
              </p>
              <p className="text-amber-600">{equipment.join(", ") || "Aucun"}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold">Total du prix</p>
              <p className="text-lg font-bold text-amber-800">
                {totalAmount > 0
                  ? `${totalAmount} FCFA (${duration} hour${duration > 1 ? "s" : ""})`
                  : "Not calculated"}
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
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{totalAmount > 0 ? "Proceed to Payment" : "Request Reservation"}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}

// Composant principal avec Suspense ajouté
export default function RoomReservationForm({
  hotel = { id: "unknown", name: "Unknown Hotel" },
}: {
  hotel?: { id: string; name: string };
}) {
  return (
    <Suspense fallback={<div>Chargement de la page de réservation...</div>}>
      <RoomReservationFormContent hotel={hotel} />
    </Suspense>
  );
}

// Composant interne renommé pour éviter la collision
function RoomReservationFormContent({
  hotel = { id: "unknown", name: "Unknown Hotel" },
}: {
  hotel?: { id: string; name: string };
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<number>(1);
  const [roomType, setRoomType] = useState<string>(roomTypes[0].id);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [data, setData] = useState<IApartmentFormInput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IApartmentFormInput>({
    mode: "onChange",
  });

  const formData = watch();
  const searchParams = useSearchParams();
  const apartment = searchParams.get("apartment");

  const calculateAmount = useCallback(
    (guests: number, roomType: string, dates: Date[]): number => {
      if (!guests || !roomType || !dates || dates.length === 0) return 0;

      const qty = guests || 0;
      if (qty <= 0) return 0;

      const selectedRoom = roomTypes.find((room) => room.id === roomType);
      if (!selectedRoom) return 0;

      const nights = dates.length;
      if (nights <= 0) return 0;

      return selectedRoom.pricePerNight * qty * nights;
    },
    []
  );

  const { open, paymentStatus } = usePay();

  const isValidForm = isValid && selectedDates.length > 0 && guests >= 1;

  const onSubmit: SubmitHandler<IApartmentFormInput> = async (formData) => {
    setIsSubmitting(true);
    setData(formData);
    const amount = calculateAmount(guests, roomType, selectedDates);
    try {
      if (amount > 0) {
        await open({
          amount,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        });
      } else {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: "Room Reservation Request",
            to: [formData.email, "reservations@hotel.com"],
            emailData: {
              hotelName: hotel.name,
              roomType: roomTypes.find((r) => r.id === roomType)?.title,
              clientName: formData.name,
              clientEmail: formData.email,
              clientPhone: formData.phone,
              dates: selectedDates.map((date) => dayjs(date).format("YYYY-MM-DD")),
              guests,
              totalPrice: amount,
              apartment: apartment || "Not specified",
            },
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to send email");
        }
        router.push(
          `/recap?type=reservation&name=${encodeURIComponent(
            formData.name
          )}&email=${encodeURIComponent(
            formData.email
          )}&phone=${encodeURIComponent(
            formData.phone
          )}&hotelId=${hotel.id}&dates=${encodeURIComponent(
            selectedDates
              .map((date) => dayjs(date).format("YYYY-MM-DD"))
              .join(",")
          )}&guests=${guests}&roomType=${roomType}&apartment=${encodeURIComponent(
            apartment || ""
          )}`
        );
      }
    } catch (error) {
      toast("Error", {
        description: `An error occurred: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (guests && roomType && selectedDates.length > 0) {
      const amount = calculateAmount(guests, roomType, selectedDates);
      setTotalAmount(amount);
    } else {
      setTotalAmount(0);
    }
  }, [guests, roomType, selectedDates, calculateAmount]);

  useEffect(() => {
    if (paymentStatus === "success" && data) {
      setIsSubmitting(true);
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Room Reservation Confirmation",
          to: [data.email, "reservations@hotel.com"],
          emailData: {
            hotelName: hotel.name,
            roomType: roomTypes.find((r) => r.id === roomType)?.title,
            clientName: data.name,
            clientEmail: data.email,
            clientPhone: data.phone,
            dates: selectedDates.map((date) => dayjs(date).format("YYYY-MM-DD")),
            guests,
            totalPrice: totalAmount,
            apartment: apartment || "Not specified",
          },
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send email");
          }
          router.push(
            `/recap?type=payment&name=${encodeURIComponent(
              data.name
            )}&email=${encodeURIComponent(
              data.email
            )}&phone=${encodeURIComponent(
              data.phone
            )}&hotelId=${hotel.id}&dates=${encodeURIComponent(
              selectedDates
                .map((date) => dayjs(date).format("YYYY-MM-DD"))
                .join(",")
            )}&guests=${guests}&roomType=${roomType}&amount=${totalAmount}&apartment=${encodeURIComponent(
              apartment || ""
            )}`
          );
        })
        .catch((error) => {
          toast("Error", {
            description: `An error occurred while sending the confirmation: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else if (paymentStatus === "error") {
      toast("Payment Failed", {
        description: "An error occurred during payment. Please try again.",
      });
      setIsSubmitting(false);
    }
  }, [paymentStatus, data, totalAmount, hotel.id, hotel.name, selectedDates, guests, roomType, router, apartment]);

  const handleCalendarSelect = (dates: Date[] | undefined) => {
    setSelectedDates(dates || []);
  };

  const sortedDates = [...selectedDates].sort((a, b) => a.getTime() - b.getTime());

  if (apartment === "Salles de conf") {
    return <ConferenceReservationForm hotel={hotel} apartment={apartment} />;
  }

  return (
    <section className="container min-h-[200px] py-14 bg-gradient-to-b from-amber-50 to-white">
      <Suspense fallback={<div>Chargement de l&apos;image...</div>}>
        <ApartmentDetails formRef={formRef} />
      </Suspense>
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
                Information du client
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-amber-700">
                  Nom complet
                </Label>
                <Input
                  id="name"
                  type="text"
                  className="border-amber-300 focus:ring-amber-500"
                  {...register("name", { required: "Full name is required" })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-amber-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="border-amber-300 focus:ring-amber-500"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-amber-700">
                    Télephone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="border-amber-300 focus:ring-amber-500"
                    {...register("phone", { required: "Phone is required" })}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-amber-200 min-h-[80px]">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-800 flex items-center">
                <Bed className="h-6 w-6 mr-2" />
                Détails de la réservation
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="guests" className="text-amber-700">
                  Nombres de personnes
                </Label>
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
                <Label htmlFor="roomType" className="text-amber-700">
                  Type de chambre
                </Label>
                <select
                  id="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="border-amber-300 focus:ring-amber-500 rounded-md p-2"
                >
                  {roomTypes.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.title} ({room.pricePerNight} FCFA/night)
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
                    Selectionnée la date:{" "}
                    {sortedDates
                      .map((date) => dayjs(date).format("YYYY-MM-DD"))
                      .join(" - ")}
                  </p>
                ) : (
                  <p className="text-sm text-amber-600">Date non selectionnée</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg border-amber-200 h-full">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-800 flex items-center">
              <Home className="h-6 w-6 mr-2" />
              Résumée de la réservation
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
                Télephone
              </p>
              <p className="text-amber-600">{formData.phone || "Non fourni"}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Date selectionnée
              </p>
              <p className="text-amber-600">
                {sortedDates.length > 0
                  ? sortedDates
                      .map((date) => dayjs(date).format("YYYY-MM-DD"))
                      .join(", ")
                  : "Dates non selectionnée"}
              </p>
            </div>
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Nombres de client
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
            <div className="grid gap-2">
              <p className="text-amber-700 font-semibold">Total du prix</p>
              <p className="text-lg font-bold text-amber-800">
                {totalAmount > 0
                  ? `${totalAmount} FCFA (${sortedDates.length} night${sortedDates.length > 1 ? "s" : ""})`
                  : "Non calculaté"}
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
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{totalAmount > 0 ? "Proceed to Payment" : "Request Reservation"}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}