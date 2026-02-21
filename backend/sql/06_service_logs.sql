-- 3) Operations: Service logs (Maintenance)

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'service_log_status') THEN
    CREATE TYPE service_log_status AS ENUM ('NEW', 'IN_PROGRESS', 'COMPLETED');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS service_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  service_type VARCHAR(100) NOT NULL,
  issue_description TEXT,
  service_date DATE NOT NULL DEFAULT CURRENT_DATE,
  cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  technician_name VARCHAR(255),
  status service_log_status DEFAULT 'NEW',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

