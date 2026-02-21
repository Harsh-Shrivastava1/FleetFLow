-- Triggers (updated_at + business rules)

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_users_updated_at') THEN
    CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_vehicles_updated_at') THEN
    CREATE TRIGGER trg_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_drivers_updated_at') THEN
    CREATE TRIGGER trg_drivers_updated_at
    BEFORE UPDATE ON drivers
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_trips_updated_at') THEN
    CREATE TRIGGER trg_trips_updated_at
    BEFORE UPDATE ON trips
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_service_logs_updated_at') THEN
    CREATE TRIGGER trg_service_logs_updated_at
    BEFORE UPDATE ON service_logs
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_trip_expenses_updated_at') THEN
    CREATE TRIGGER trg_trip_expenses_updated_at
    BEFORE UPDATE ON trip_expenses
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_check_license') THEN
    CREATE TRIGGER trg_check_license
    BEFORE INSERT OR UPDATE ON trips
    FOR EACH ROW EXECUTE FUNCTION check_driver_license_validity();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_check_capacity') THEN
    CREATE TRIGGER trg_check_capacity
    BEFORE INSERT OR UPDATE ON trips
    FOR EACH ROW EXECUTE FUNCTION check_vehicle_capacity();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_sync_trip_statuses') THEN
    CREATE TRIGGER trg_sync_trip_statuses
    AFTER UPDATE OF status ON trips
    FOR EACH ROW EXECUTE FUNCTION sync_trip_statuses();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_sync_service_status') THEN
    CREATE TRIGGER trg_sync_service_status
    AFTER INSERT OR UPDATE OF status ON service_logs
    FOR EACH ROW EXECUTE FUNCTION sync_service_status();
  END IF;
END
$$;

