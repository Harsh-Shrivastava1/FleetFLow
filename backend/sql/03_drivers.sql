-- 2) Core: Drivers

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'driver_status') THEN
    CREATE TYPE driver_status AS ENUM ('ON_DUTY', 'OFF_DUTY', 'ON_TRIP', 'SUSPENDED');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  license_number VARCHAR(100) UNIQUE NOT NULL,
  license_expiry DATE NOT NULL,
  phone VARCHAR(50) NOT NULL,
  status driver_status DEFAULT 'OFF_DUTY',
  base_safety_score NUMERIC(5, 2) DEFAULT 100.00,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

