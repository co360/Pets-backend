const { Router } = require("express");
const auth = require("../auth/middleware");
const Address = require("../models").address;
const User = require("../models").user;
const Service = require("../models").service;
const router = new Router();

router.post("/address", auth, async (req, res) => {
  const userLogged = req.user.dataValues;

  const { house_number, street, city, postcode, country } = req.body;

  if (!house_number || !street || !city || !postcode || !country) {
    return res.status(400).send("Please fill out all the fields");
  }

  try {
    const userAddress = await Address.create({
      house_number,
      street,
      city,
      postcode,
      country,
      userId: userLogged.id,
    });

    res.status(201).json(userAddress);
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/phone", auth, async (req, res) => {
  const userLogged = req.user.dataValues;
  console.log("post", req.body);
  const { phone, image } = req.body;

  if (!phone || !image) {
    return res.status(400).send("Please fill out all the fields");
  }

  try {
    const user = await User.update(
      {
        phone: phone,
        image: image,
      },
      { where: { id: userLogged.id } }
    );

    res.status(201).json(user);
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/services", auth, async (req, res) => {
  const userLogged = req.user.dataValues;
  console.log("user",userLogged)
  console.log("services", req.body);

  const {
    boarding,
    houseSitting,
    dropInVisits,
    doggyDayCare,
    dogWalking,
    boardingRate,
    houseSittingRate,
    dropInVisitsRate,
    doggyDayCareRate,
    dogWalkingRate,
    small,
    medium,
    large,
    gaint,
    cat,
  } = req.body;

  try {
    const userServices = await Service.create({
      boarding,
      houseSitting,
      dropInVisits,
      doggyDayCare,
      dogWalking,
      boardingRate,
      houseSittingRate,
      dropInVisitsRate,
      doggyDayCareRate,
      dogWalkingRate,
      small,
      medium,
      large,
      gaint,
      cat,
      userId:userLogged.id,
    });

    res.status(201).json(userServices);
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});
module.exports = router;