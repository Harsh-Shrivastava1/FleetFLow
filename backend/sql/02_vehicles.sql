-- 2) Core: Vehicles

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'vehicle_status') THEN
    CREATE TYPE vehicle_status AS ENUM ('AVAILABLE', 'ON_TRIP', 'IN_SHOP', 'IDLE', 'OUT_OF_SERVICE');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plate VARCHAR(50) UNIQUE NOT NULL,
  model VARCHAR(255) NOT NULL,
  vehicle_type VARCHAR(100) NOT NULL,
  capacity_ton NUMERIC(10, 2) NOT NULL,
  odometer INT DEFAULT 0,
  acquisition_cost NUMERIC(12, 2) NOT NULL,
  status vehicle_status DEFAULT 'AVAILABLE',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

