-- Analytics views (dashboards)

CREATE OR REPLACE VIEW view_fuel_efficiency AS
SELECT
  v.id AS vehicle_id,
  v.plate,
  v.model,
  SUM(te.fuel_liters) AS total_fuel_liters,
  SUM(t.distance_km) AS total_distance,
  CASE
    WHEN SUM(te.fuel_liters) > 0 THEN SUM(t.distance_km) / SUM(te.fuel_liters)
    ELSE 0
  END AS km_per_liter
FROM vehicles v
LEFT JOIN trips t ON t.vehicle_id = v.id AND t.status = 'COMPLETED'
LEFT JOIN trip_expenses te ON te.trip_id = t.id
GROUP BY v.id, v.plate, v.model;

CREATE OR REPLACE VIEW view_vehicle_roi AS
SELECT
  v.id AS vehicle_id,
  v.plate,
  v.acquisition_cost,
  COALESCE(SUM(t.estimated_revenue), 0) AS total_revenue,
  COALESCE(SUM(te.fuel_cost + te.misc_expense), 0) AS total_trip_costs,
  (SELECT COALESCE(SUM(cost), 0) FROM service_logs WHERE vehicle_id = v.id) AS total_maintenance_costs,
  (COALESCE(SUM(t.estimated_revenue), 0) -
   COALESCE(SUM(te.fuel_cost + te.misc_expense), 0) -
   (SELECT COALESCE(SUM(cost), 0) FROM service_logs WHERE vehicle_id = v.id)) AS net_profit,
  CASE
    WHEN v.acquisition_cost > 0 THEN
      ((COALESCE(SUM(t.estimated_revenue), 0) -
        COALESCE(SUM(te.fuel_cost + te.misc_expense), 0) -
        (SELECT COALESCE(SUM(cost), 0) FROM service_logs WHERE vehicle_id = v.id)) / v.acquisition_cost) * 100
    ELSE 0
  END AS roi_percentage
FROM vehicles v
LEFT JOIN trips t ON t.vehicle_id = v.id
LEFT JOIN trip_expenses te ON te.vehicle_id = v.id
GROUP BY v.id, v.plate, v.acquisition_cost;

CREATE OR REPLACE VIEW view_driver_performance AS
SELECT
  d.id AS driver_id,
  d.name,
  COUNT(t.id) AS total_trips,
  SUM(CASE WHEN t.status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_trips,
  CASE
    WHEN COUNT(t.id) > 0 THEN (SUM(CASE WHEN t.status = 'COMPLETED' THEN 1 ELSE 0 END)::FLOAT / COUNT(t.id)) * 100
    ELSE 0
  END AS completion_rate,
  d.base_safety_score - (SELECT COUNT(*) * 5 FROM driver_complaints WHERE driver_id = d.id) AS final_safety_score
FROM drivers d
LEFT JOIN trips t ON t.driver_id = d.id
GROUP BY d.id, d.name, d.base_safety_score;

