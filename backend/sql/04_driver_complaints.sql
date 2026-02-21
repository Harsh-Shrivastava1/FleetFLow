-- Driver complaints (Safety Officer)

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'complaint_severity') THEN
    CREATE TYPE complaint_severity AS ENUM ('LOW', 'MEDIUM', 'HIGH');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS driver_complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT NOT NULL,
  severity complaint_severity NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

