-- Ensure user_role enum exists and contains required values.
-- Must be executed separately before schema.sql to avoid "unsafe use of new value" errors.

DO $$
DECLARE
  label TEXT;
  required_labels TEXT[] := ARRAY[
    'ADMIN',
    'MANAGER',
    'DISPATCHER',
    'SAFETY_OFFICER',
    'FINANCIAL_ANALYST'
  ];
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM (
      'ADMIN',
      'MANAGER',
      'DISPATCHER',
      'SAFETY_OFFICER',
      'FINANCIAL_ANALYST'
    );
  ELSE
    FOREACH label IN ARRAY required_labels LOOP
      IF NOT EXISTS (
        SELECT 1
        FROM pg_enum e
        JOIN pg_type t ON t.oid = e.enumtypid
        WHERE t.typname = 'user_role' AND e.enumlabel = label
      ) THEN
        EXECUTE format('ALTER TYPE user_role ADD VALUE %L', label);
      END IF;
    END LOOP;
  END IF;
END
$$;

