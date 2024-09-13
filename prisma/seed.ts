import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const { user: User } = prisma;

async function main() {
  const theoPassword = await bcrypt.hash("theo", 10);
  const enzoPassword = await bcrypt.hash("enzo", 10);
  const clementPassword = await bcrypt.hash("clement", 10);
  const maximePassword = await bcrypt.hash("maxime", 10);

  console.log("Début du seed...");

  console.log("Suppression des données existantes...");
  await prisma.user.deleteMany();

  console.log("Création des données...");
  // Création des utilisateurs
  const theo = await User.create({
    data: {
      email: "theo.mouisse@gmail.com",
      password: theoPassword,
      role: 'ADMIN',
    },
  });
  await User.create({
    data: {
      email: "clement.mabile@gmail.com",
      password: clementPassword,
      role: 'ADMIN',
    },
  });

  console.log("Seed terminé !");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
