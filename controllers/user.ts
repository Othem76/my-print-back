import pkg from "@prisma/client";
import { decodeUserId } from "../utils/decodeJwt";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Controller pour obtenir un utilisateur par son ID
export const getUser = async (req: any, res: any) => {
  const userId = decodeUserId(req.headers.authorization);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'utilisateur" });
  }
};
