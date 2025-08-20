import db from "../db.js";
import { validationResult } from "express-validator";

// ---- helpers for distance ----
const toRadians = (deg) => (deg * Math.PI) / 180;
const haversineKm = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // km
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
};

/**
 * POST /addSchool
 */
export const addSchool = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  }

  const { name, address, latitude, longitude } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)"
    );
    const result = stmt.run(name.trim(), address.trim(), Number(latitude), Number(longitude));

    return res.status(201).json({
      status: true,
      message: "School added successfully",
      data: {
        id: result.lastInsertRowid,
        name,
        address,
        latitude: Number(latitude),
        longitude: Number(longitude)
      }
    });
  } catch (err) {
    console.error("addSchool error:", err);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

/**
 * GET /listSchools?lat=..&lng=..&limit=..
 */
export const listSchools = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  }

  const userLat = Number(req.query.lat);
  const userLng = Number(req.query.lng);
  const limitInt = Math.min(Math.max(parseInt(req.query.limit ?? "100", 10) || 100, 1), 1000);

  try {
    const rows = db.prepare("SELECT id, name, address, latitude, longitude FROM schools").all();

    const withDistance = rows.map((r) => {
      const distance_km = haversineKm(userLat, userLng, Number(r.latitude), Number(r.longitude));
      return {
        id: r.id,
        name: r.name,
        address: r.address,
        latitude: Number(r.latitude),
        longitude: Number(r.longitude),
        distance_km: Number.isFinite(distance_km) ? distance_km : null
      };
    });

    withDistance.sort((a, b) => {
      if (a.distance_km == null) return 1;
      if (b.distance_km == null) return -1;
      return a.distance_km - b.distance_km;
    });

    const data = withDistance.slice(0, limitInt);
    return res.json({ status: true, count: data.length, data });
  } catch (err) {
    console.error("listSchools error:", err);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};
