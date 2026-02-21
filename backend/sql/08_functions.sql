-- Functions (timestamps + business rules)

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Prevent assigning trip to driver with expired license
CREATE OR REPLACE FUNCTION check_driver_license_validity()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT license_expiry FROM drivers WHERE id = NEW.driver_id) < CURRENT_DATE THEN
    RAISE EXCEPTION 'Cannot assign trip to driver with expired license';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Validate cargo weight <= vehicle capacity
CREATE OR REPLACE FUNCTION check_vehicle_capacity()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.cargo_weight_ton > (SELECT capacity_ton FROM vehicles WHERE id = NEW.vehicle_id) THEN
    RAISE EXCEPTION 'Cargo weight exceeds vehicle max capacity';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Sync Trip/Driver/Vehicle statuses dynamically
CREATE OR REPLACE FUNCTION sync_trip_statuses()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'ON_WAY' AND OLD.status IS DISTINCT FROM 'ON_WAY' THEN
    UPDATE vehicles SET status = 'ON_TRIP' WHERE id = NEW.vehicle_id;
    UPDATE drivers SET status = 'ON_TRIP' WHERE id = NEW.driver_id;
  END IF;

  IF NEW.status IN ('COMPLETED', 'CANCELLED')
     AND OLD.status NOT IN ('COMPLETED', 'CANCELLED') THEN
    UPDATE vehicles SET status = 'AVAILABLE' WHERE id = NEW.vehicle_id;
    UPDATE drivers SET status = 'ON_DUTY' WHERE id = NEW.driver_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Sync Service/Vehicle statuses
CREATE OR REPLACE FUNCTION sync_service_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IN ('NEW', 'IN_PROGRESS') THEN
    UPDATE vehicles SET status = 'IN_SHOP' WHERE id = NEW.vehicle_id;
  ELSIF NEW.status = 'COMPLETED' AND OLD.status IS DISTINCT FROM 'COMPLETED' THEN
    UPDATE vehicles SET status = 'AVAILABLE' WHERE id = NEW.vehicle_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

