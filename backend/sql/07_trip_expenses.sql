-- 3) Operations: Trip expenses (Fuel + misc)

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'expense_status') THEN
    CREATE TYPE expense_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS trip_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  fuel_liters NUMERIC(10, 2) DEFAULT 0.00,
  fuel_cost NUMERIC(12, 2) DEFAULT 0.00,
  misc_expense NUMERIC(12, 2) DEFAULT 0.00,
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  status expense_status DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

