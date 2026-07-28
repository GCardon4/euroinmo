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

export type PropertyDetail = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  price: number;
  rooms: number | null;
  bathrooms: number | null;
  area: number | null;
  kitchen: number | null;
  hall: number | null;
  dining: number | null;
  closet: number | null;
  clothing: number | null;
  gas: number | null;
  dressing: number | null;
  category: string | null;
  status: string | null;
  city: string | null;
  zone: string | null;
  images: string[];
  amenities: string[];
};

type PropertyDetailRow = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  price: number;
  rooms: number | null;
  bathrooms: number | null;
  area: number | null;
  kitchen: number | null;
  hall: number | null;
  dining: number | null;
  closet: number | null;
  clothing: number | null;
  gas: number | null;
  dressing: number | null;
  category: { name: string } | null;
  status: { name: string } | null;
  city: { name: string } | null;
  zone: { name: string } | null;
};

async function attachImages(
  supabase: ReturnType<typeof createSupabaseClient>,
  data: PropertyRow[],
): Promise<PropertyCard[]> {
  if (data.length === 0) return [];

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

  return attachImages(supabase, data);
}

export type PropertyFilters = {
  statusId?: number;
  categoryId?: number;
  cityId?: number;
  code?: string;
  minPrice?: number;
  maxPrice?: number;
};

export async function getProperties(
  filters: PropertyFilters,
  { limit = 12, offset = 0 }: { limit?: number; offset?: number } = {},
): Promise<{ properties: PropertyCard[]; total: number }> {
  const supabase = createSupabaseClient();

  let query = supabase
    .from("properties")
    .select(
      "id, code, name, price, bathrooms, rooms, area, category:category_id(name), city:city_id(name), status:status_id(name)",
      { count: "exact" },
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (filters.statusId) query = query.eq("status_id", filters.statusId);
  if (filters.categoryId) query = query.eq("category_id", filters.categoryId);
  if (filters.cityId) query = query.eq("city_id", filters.cityId);
  if (filters.code) query = query.ilike("code", `%${filters.code.trim()}%`);
  if (filters.minPrice) query = query.gte("price", filters.minPrice);
  if (filters.maxPrice) query = query.lte("price", filters.maxPrice);

  const { data, error, count } = await query.returns<PropertyRow[]>();
  if (error || !data) return { properties: [], total: 0 };

  return { properties: await attachImages(supabase, data), total: count ?? 0 };
}

export async function getPropertyByCode(code: string): Promise<PropertyDetail | null> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("properties")
    .select(
      `id, code, name, description, price, rooms, bathrooms, area,
       kitchen, hall, dining, closet, clothing, gas, dressing,
       category:category_id(name), status:status_id(name),
       city:city_id(name), zone:zone_id(name)`,
    )
    .eq("code", code)
    .eq("is_active", true)
    .maybeSingle<PropertyDetailRow>();

  if (error || !data) return null;

  const [{ data: images }, { data: amenityRows }] = await Promise.all([
    supabase
      .from("properties_images")
      .select("url_image")
      .eq("property_id", data.id)
      .order("main", { ascending: false }),
    supabase
      .from("property_amenities")
      .select("amenities!inner(name)")
      .eq("property_id", data.id)
      .returns<{ amenities: { name: string } }[]>(),
  ]);

  return {
    id: data.id,
    code: data.code,
    name: data.name,
    description: data.description,
    price: data.price,
    rooms: data.rooms,
    bathrooms: data.bathrooms,
    area: data.area,
    kitchen: data.kitchen,
    hall: data.hall,
    dining: data.dining,
    closet: data.closet,
    clothing: data.clothing,
    gas: data.gas,
    dressing: data.dressing,
    category: data.category?.name ?? null,
    status: data.status?.name ?? null,
    city: data.city?.name ?? null,
    zone: data.zone?.name ?? null,
    images: images?.map((img) => img.url_image) ?? [],
    amenities: amenityRows?.map((row) => row.amenities.name) ?? [],
  };
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
