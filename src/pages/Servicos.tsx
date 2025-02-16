import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import {
  Search,
  Clock,
  Star,
  MapPin,
  Instagram,
  Phone,
  Calendar,
  CreditCard,
  Coffee,
} from "lucide-react";
import type { Service } from "@/types/database";
import type { Json } from "@/integrations/supabase/types";

interface BarbershopInfo {
  id: string;
  name: string;
  address: string;
  about: string | null;
  working_hours: Record<string, string>;
  amenities: string[];
  payment_methods: string[];
  social_media: {
    instagram?: string;
    whatsapp?: string;
  };
  created_at?: string;
  updated_at?: string;
}

interface BarbershopImage {
  id: string;
  image_url: string;
  order_index: number;
}

interface Professional {
  id: string;
  name: string;
  photo_url: string | null;
  experience_years: number;
  bio: string | null;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
}

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "cabelo", label: "Cabelo" },
  { id: "barba", label: "Barba" },
  { id: "outros", label: "Outros" },
];

const Servicos = () => {
  const [barbershopInfo, setBarbershopInfo] = useState<BarbershopInfo | null>(null);
  const [carouselImages, setCarouselImages] = useState<BarbershopImage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [
        barbershopResponse,
        imagesResponse,
        servicesResponse,
        professionalsResponse,
        productsResponse,
        reviewsResponse,
      ] = await Promise.all([
        supabase.from("barbershop_info").select("*").single(),
        supabase.from("barbershop_images").select("*").order("order_index"),
        supabase.from("services").select("*").order("name"),
        supabase.from("professionals").select("*"),
        supabase.from("products").select("*"),
        supabase.from("reviews").select("*").order("created_at.desc"),
      ]);

      if (barbershopResponse.data) {
        const info = barbershopResponse.data;
        setBarbershopInfo({
          ...info,
          working_hours: info.working_hours as Record<string, string>,
          amenities: info.amenities as string[],
          payment_methods: info.payment_methods as string[],
          social_media: info.social_media as { instagram?: string; whatsapp?: string },
        });
      }
      if (imagesResponse.data) setCarouselImages(imagesResponse.data);
      if (servicesResponse.data) setServices(servicesResponse.data);
      if (professionalsResponse.data) setProfessionals(professionalsResponse.data);
      if (productsResponse.data) setProducts(productsResponse.data);
      if (reviewsResponse.data) setReviews(reviewsResponse.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0
      ? `${hours}h${mins > 0 ? ` ${mins}min` : ""}`
      : `${mins}min`;
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {carouselImages.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="relative h-[400px] w-full">
                    <img
                      src={image.image_url}
                      alt="Barbearia"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="mt-4 text-center">
            <h1 className="text-3xl font-bold">{barbershopInfo?.name}</h1>
            <p className="flex items-center justify-center mt-2 text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              {barbershopInfo?.address}
            </p>
          </div>
        </div>

        <Tabs defaultValue="servicos" className="w-full">
          <TabsList className="w-full justify-start mb-8">
            <TabsTrigger value="servicos">Serviços</TabsTrigger>
            <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
            <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="servicos">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter(
                    (service) =>
                      selectedCategory === "todos" ||
                      service.category === selectedCategory
                  )
                  .map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>{service.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">{service.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(service.price)}
                            </span>
                            <Badge variant="secondary">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatDuration(service.duration)}
                            </Badge>
                          </div>
                          <Button className="w-full">Agendar</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="detalhes">
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold mb-4">Sobre</h3>
                <p className="text-gray-600">{barbershopInfo?.about}</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">Comodidades</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {barbershopInfo?.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Coffee className="w-4 h-4 mr-2 text-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">Horários de Atendimento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(barbershopInfo?.working_hours || {}).map(
                    ([day, hours]) => (
                      <div key={day} className="flex justify-between items-center">
                        <span className="font-medium">{day}</span>
                        <span className="text-gray-600">{hours}</span>
                      </div>
                    )
                  )}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">Formas de Pagamento</h3>
                <div className="flex flex-wrap gap-4">
                  {barbershopInfo?.payment_methods.map((method, index) => (
                    <div key={index} className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-primary" />
                      <span>{method}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                  {barbershopInfo?.social_media.instagram && (
                    <a
                      href={barbershopInfo.social_media.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      <Instagram className="w-5 h-5 mr-1" />
                      Instagram
                    </a>
                  )}
                  {barbershopInfo?.social_media.whatsapp && (
                    <a
                      href={`https://wa.me/${barbershopInfo.social_media.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      <Phone className="w-5 h-5 mr-1" />
                      WhatsApp
                    </a>
                  )}
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="profissionais">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionals.map((professional) => (
                <Card key={professional.id}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <img
                          src={professional.photo_url || "/placeholder.svg"}
                          alt={professional.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <h3 className="text-xl font-semibold">{professional.name}</h3>
                      <p className="text-gray-600 mt-1">
                        {professional.experience_years} anos de experiência
                      </p>
                      {professional.bio && (
                        <p className="text-sm text-gray-600 mt-4">{professional.bio}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="produtos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  {product.image_url && (
                    <div className="relative h-48 w-full">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                    <p className="text-xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="avaliacoes">
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                className={`w-4 h-4 ${
                                  index < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-gray-600">{review.comment}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Servicos;
