import { createSupabaseClient } from "./supabase";

export type PropertyCard = {
  id: number;
  code: string;
  name: string;
  price: number;
  bathrooms: number | null;
  rooms: number | null;
  area: number | null;
  category: string | null;
  city: string | null;
  status: string | null;
  image: string | null;
};

type PropertyRow = {
  id: number;
  code: string;
  name: string;
  price: number;
  bathrooms: number | null;
  rooms: number | null;
  area: number | null;
  category: { name: string } | null;
  city: { name: string } | null;
  status: { name: string } | null;
};

export type Project = {
  id: number;
  name: string;
  slogan: string | null;
  description: string | null;
  information: string | null;
  contact: string | null;
  image: string | null;
  images: string[];
};

export type LookupOption = {
  id: number;
  name: string;
};

export type PropertyStats = {
  active: number;
  venta: number;
  arriendo: number;
  cities: number;
};

export async function getFeaturedProperties(limit = 6): Promise<PropertyCard[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("properties")
    .select(
      "id, code, name, price, bathrooms, rooms, area, category:category_id(name), city:city_id(name), status:status_id(name)",
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<PropertyRow[]>();

  if (error || !data) return [];

  const ids = data.map((property) => property.id);
  const { data: images } = await supabase
    .from("properties_images")
    .select("property_id, url_image")
    .in("property_id", ids)
    .eq("main", true);

  const imageByPropertyId = new Map(images?.map((img) => [img.property_id, img.url_image]));

  return data.map((property) => ({
    id: property.id,
    code: property.code,
    name: property.name,
    price: property.price,
    bathrooms: property.bathrooms,
    rooms: property.rooms,
    area: property.area,
    category: property.category?.name ?? null,
    city: property.city?.name ?? null,
    status: property.status?.name ?? null,
    image: imageByPropertyId.get(property.id) ?? null,
  }));
}

export async function getActiveProject(): Promise<Project | null> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, slogan, description, information, contact")
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;

  const { data: images } = await supabase
    .from("projects_images")
    .select("url_image, main")
    .eq("project_id", data.id)
    .order("main", { ascending: false });

  const urls = images?.map((img) => img.url_image) ?? [];

  return { ...data, image: urls[0] ?? null, images: urls };
}

export async function getStatuses(): Promise<LookupOption[]> {
  const supabase = createSupabaseClient();
  const { data } = await supabase.from("status").select("id, name").order("id");
  return data ?? [];
}

export async function getCategories(): Promise<LookupOption[]> {
  const supabase = createSupabaseClient();
  const { data } = await supabase.from("category").select("id, name").order("name");
  return data ?? [];
}

export async function getCities(): Promise<LookupOption[]> {
  const supabase = createSupabaseClient();
  const { data } = await supabase.from("city").select("id, name").order("name");
  return data ?? [];
}

export async function getPropertyStats(): Promise<PropertyStats> {
  const supabase = createSupabaseClient();

  const [active, venta, arriendo, cities] = await Promise.all([
    supabase.from("properties").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .eq("status_id", 2),
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .eq("status_id", 1),
    supabase.from("city").select("*", { count: "exact", head: true }),
  ]);

  return {
    active: active.count ?? 0,
    venta: venta.count ?? 0,
    arriendo: arriendo.count ?? 0,
    cities: cities.count ?? 0,
  };
}
