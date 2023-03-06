const AdminJSPrisma = require("@adminjs/prisma");
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const bcrypt = require("bcrypt");

const prismaClient = require("./modules/prismaClient");

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
});

const dmmf = prismaClient._baseDmmf;

const movieNavigation = {
  name: "Movies",
  icon: "Movie",
};

const authenticate = async (email, password) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
  if (user && user.role === "ADMIN") {
    const isValidPassword = await bcrypt.compare(password, user?.password);
    if (!isValidPassword) return null;
    return Promise.resolve({ email: user.email, role: user.role });
  }
  return null;
};

const admin = new AdminJS({
  resources: [
    {
      resource: { model: dmmf.modelMap.User, client: prismaClient },
    },
    {
      resource: { model: dmmf.modelMap.TitleAkas, client: prismaClient },
      options: {
        navigation: movieNavigation,
      },
    },
    {
      resource: { model: dmmf.modelMap.TitleBasic, client: prismaClient },
      options: {
        navigation: movieNavigation,
      },
    },
    {
      resource: { model: dmmf.modelMap.TitleEpisode, client: prismaClient },
      options: {
        navigation: movieNavigation,
      },
    },
    {
      resource: { model: dmmf.modelMap.TitleCrew, client: prismaClient },
      options: {
        navigation: movieNavigation,
      },
    },
    {
      resource: { model: dmmf.modelMap.NameBasic, client: prismaClient },
      options: {
        navigation: movieNavigation,
      },
    },
    {
      resource: { model: dmmf.modelMap.OrderItem, client: prismaClient },
    },
  ],
  branding: {
    companyName: "Movie Ecommerce",
    softwareBrothers: true,
  },
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: "adminPassword",
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
);

module.exports = { admin, adminRouter };
