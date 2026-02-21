-- 3) Operations: Trips

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'trip_status') THEN
    CREATE TYPE trip_status AS ENUM ('PREPARING', 'ON_WAY', 'COMPLETED', 'CANCELLED');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  driver_id UUID NOT NULL REFERENCES drivers(id),
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  distance_km NUMERIC(10, 2) NOT NULL,
  cargo_weight_ton NUMERIC(10, 2) NOT NULL,
  estimated_revenue NUMERIC(12, 2) DEFAULT 0.00,
  status trip_status DEFAULT 'PREPARING',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

