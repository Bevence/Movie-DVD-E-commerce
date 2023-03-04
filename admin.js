const AdminJSPrisma = require("@adminjs/prisma");
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");

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

const admin = new AdminJS({
  resources: [
    {
      resource: { model: dmmf.modelMap.User, client: prismaClient },
      options: {
        id: "users",
        navigation: {
          name: "Users",
          icon: "User",
        },
      },
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
  ],
  branding: {
    companyName: "Movie Ecommerce",
    softwareBrothers: true,
  },
});

const adminRouter = AdminJSExpress.buildRouter(admin);

module.exports = { admin, adminRouter };
