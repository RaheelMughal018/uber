const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicle_type,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !plate ||
    !capacity ||
    !vehicle_type ||
    !color
  ) {
    res.status(401).json({ message: "All fields are required" });
  }

  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      plate,
      capacity,
      vehicle_type,
      color,
    },
  });

  return captain;
};
