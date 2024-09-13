import pkg from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const { user: User } = prisma;

export const login = async (req: any, res: any) => {
  if (req.body.email == null || req.body.password == null) {
    res.status(400).send({
      message: "Email, and Password are required !",
    });
  }

  const identity = await User.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (identity == null) {
    res.status(404).send({
      message: "User not found",
    });
  } else {
    if (await bcrypt.compare(req.body.password, identity.password)) {
      const { id, email } = identity;

      const salt = process.env.JWT || "secretKey";
      //generate jwt token with 4h expiration
      const token = jwt.sign({ email, id }, salt, {
        expiresIn: "4h",
      });

      res.status(200).send({
        token,
      });
    } else {
      res.status(401).send({
        message: "Invalid password or email",
      });
    }
  }
};

// Controller pour créer un utilisateur
export const register = async (req: any, res: any) => {
  try {
    const { email, password, role } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
        role: role || "CLIENT",
      },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
};
