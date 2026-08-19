CREATE TABLE public.products (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  original_price numeric,
  image_key text NOT NULL,
  rating numeric NOT NULL DEFAULT 0,
  reviews integer NOT NULL DEFAULT 0,
  short_description text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  stock_status text NOT NULL,
  stock_count integer NOT NULL DEFAULT 0,
  restock_date text,
  specs jsonb NOT NULL DEFAULT '[]'::jsonb,
  variant_label text,
  variants jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.orders (
  id text PRIMARY KEY,
  customer_name text NOT NULL,
  email text NOT NULL,
  placed_at text NOT NULL,
  status text NOT NULL,
  estimated_delivery text NOT NULL,
  carrier text NOT NULL,
  tracking_ref text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total numeric NOT NULL,
  delivery_method text NOT NULL,
  return_window_days integer NOT NULL DEFAULT 30,
  refund_status text NOT NULL DEFAULT 'Not requested',
  data_conflict text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
GRANT SELECT ON public.orders TO anon;
GRANT SELECT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly viewable" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Demo orders are publicly viewable" ON public.orders FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.products (id, slug, name, category, price, original_price, image_key, rating, reviews, short_description, description, tags, stock_status, stock_count, restock_date, specs, variant_label, variants, sort_order) VALUES
('p-001','aurora-anc-headphones','Aurora ANC Headphones','Audio',2499,2999,'headphones',4.8,412,'Adaptive noise cancelling over-ear headphones with 40-hour battery.','The Aurora ANC pairs adaptive noise cancelling with a warm, balanced signature tuned for long listening sessions. Memory-foam earcups, multipoint Bluetooth 5.3 and 40 hours of playback between charges.','["headphones","anc","bluetooth","audio"]','In Stock',64,NULL,'[{"label":"Battery life","value":"40 hours (ANC on)"},{"label":"Connectivity","value":"Bluetooth 5.3, USB-C, 3.5mm"},{"label":"Weight","value":"268 g"},{"label":"Warranty","value":"2 years"}]','Colour','[{"value":"Midnight Navy","stock":42},{"value":"Graphite","stock":22}]',1),
('p-002','meridian-commuter-backpack','Meridian Commuter Backpack','Bags & Travel',1299,NULL,'backpack',4.6,268,'22L water-resistant commuter pack with a padded 16" laptop sleeve.','Built for the daily commute: a structured 22L body, water-resistant recycled shell, luggage pass-through and a suspended laptop sleeve that fits most 16-inch machines.','["backpack","bag","commuter","laptop"]','In Stock',38,NULL,'[{"label":"Capacity","value":"22 litres"},{"label":"Laptop fit","value":"Up to 16\""},{"label":"Material","value":"Recycled 900D polyester"},{"label":"Warranty","value":"Lifetime hardware"}]',NULL,NULL,2),
('p-003','pulse-fitness-watch','Pulse Fitness Watch','Wearables',1899,2199,'watch',4.5,331,'AMOLED training watch with dual-band GPS and 12-day battery.','A training-first smartwatch: dual-band GPS, continuous heart rate, sleep and recovery scoring, and up to 12 days of battery in smartwatch mode.','["watch","fitness","wearable","gps"]','Low Stock',6,NULL,'[{"label":"Display","value":"1.4\" AMOLED"},{"label":"Battery","value":"Up to 12 days"},{"label":"Water rating","value":"5 ATM"},{"label":"Warranty","value":"2 years"}]','Band size','[{"value":"S/M","stock":2},{"value":"M/L","stock":4}]',3),
('p-004','atlas-desk-lamp','Atlas Desk Lamp','Home',899,NULL,'lamp',4.7,154,'Brass-accented LED task lamp with stepless dimming.','A weighted, matte-black task lamp with brass detailing, stepless dimming from 2700K to 5000K and a flicker-free driver for long evenings at the desk.','["lamp","desk","lighting","home"]','In Stock',27,NULL,'[{"label":"Colour temperature","value":"2700K – 5000K"},{"label":"Output","value":"480 lumens"},{"label":"Power","value":"9W LED"},{"label":"Warranty","value":"3 years"}]',NULL,NULL,4),
('p-005','everyday-sneakers','Everyday Sneakers','Footwear',1199,NULL,'sneakers',4.4,587,'All-day cushioned sneakers in a clean, minimal silhouette.','Knit uppers, a recycled-foam midsole and a stitched rubber outsole. Designed to be worn every day and resoled rather than replaced.','["sneakers","shoes","footwear","size"]','Low Stock',9,NULL,'[{"label":"Upper","value":"Recycled knit"},{"label":"Midsole","value":"Recycled EVA foam"},{"label":"Drop","value":"8 mm"},{"label":"Warranty","value":"1 year"}]','Size (EU)','[{"value":"40","stock":4},{"value":"41","stock":5},{"value":"42","stock":0},{"value":"43","stock":0}]',5),
('p-006','portable-bluetooth-speaker','Portable Bluetooth Speaker','Audio',799,NULL,'speaker',4.3,221,'Pocket-sized IP67 speaker with 18 hours of playback.','A rugged, IP67-rated speaker with passive radiators for real low end, 18 hours of playback and stereo pairing with a second unit.','["speaker","bluetooth","audio","portable"]','Out of Stock',0,'2026-09-02','[{"label":"Battery","value":"18 hours"},{"label":"Rating","value":"IP67 dust & water"},{"label":"Weight","value":"540 g"},{"label":"Warranty","value":"2 years"}]',NULL,NULL,6),
('p-007','summit-insulated-bottle','Summit Insulated Bottle','Home',449,NULL,'bottle',4.9,903,'750ml vacuum-insulated stainless bottle, 24h cold / 12h hot.','Double-wall 18/8 stainless steel with a leak-proof cap and powder-coated grip. Keeps drinks cold for 24 hours and hot for 12.','["bottle","water","insulated","home"]','In Stock',112,NULL,'[{"label":"Capacity","value":"750 ml"},{"label":"Material","value":"18/8 stainless steel"},{"label":"Insulation","value":"24h cold / 12h hot"},{"label":"Warranty","value":"Lifetime"}]',NULL,NULL,7),
('p-008','harbour-quilted-jacket','Harbour Quilted Jacket','Apparel',1699,2100,'jacket',4.5,176,'Wind-resistant quilted jacket with recycled insulation.','A clean quilted shell with recycled synthetic insulation, wind-resistant face fabric and a cut that layers over a hoodie without bulk.','["jacket","apparel","outerwear","size"]','Pre-order',0,'2026-08-25','[{"label":"Fill","value":"Recycled synthetic, 80 g"},{"label":"Shell","value":"Wind-resistant recycled nylon"},{"label":"Care","value":"Machine wash cold"},{"label":"Warranty","value":"2 years"}]','Size','[{"value":"S","stock":0},{"value":"M","stock":0},{"value":"L","stock":0}]',8);

INSERT INTO public.orders (id, customer_name, email, placed_at, status, estimated_delivery, carrier, tracking_ref, items, total, delivery_method, return_window_days, refund_status, data_conflict) VALUES
('NS-2026-10482','Alex Johnson','alex@example.com','2026-08-08','Out for Delivery','Today, before 18:00','Northstar Express','NSX448120933','[{"productId":"p-001","name":"Aurora ANC Headphones","qty":1,"price":2499}]',2499,'Express Delivery',30,'Not requested',NULL),
('NS-2026-10391','Alex Johnson','alex@example.com','2026-07-21','Delivered','Delivered 2026-07-24','Northstar Express','NSX441002871','[{"productId":"p-007","name":"Summit Insulated Bottle","qty":2,"price":449},{"productId":"p-004","name":"Atlas Desk Lamp","qty":1,"price":899}]',1797,'Standard Delivery',30,'Not requested',NULL),
('NS-2026-10233','Priya Naidoo','priya@example.com','2026-08-02','Shipped','2026-08-15','SwiftPost','SP9931200412','[{"productId":"p-002","name":"Meridian Commuter Backpack","qty":1,"price":1299}]',1299,'Standard Delivery',30,'Not requested','Carrier scan shows ''Delivered'' while the order management system still shows ''Shipped''.'),
('NS-2026-10190','Thabo Mokoena','thabo@example.com','2026-06-30','Delivered','Delivered 2026-07-03','Northstar Express','NSX432119004','[{"productId":"p-003","name":"Pulse Fitness Watch","qty":1,"price":1899}]',1899,'Standard Delivery',30,'Refund approved',NULL),
('NS-2026-10077','Lerato Dlamini','lerato@example.com','2026-08-10','Delayed','2026-08-18 (revised)','SwiftPost','SP9931455190','[{"productId":"p-008","name":"Harbour Quilted Jacket","qty":1,"price":1699}]',1699,'Standard Delivery',30,'Not requested',NULL);