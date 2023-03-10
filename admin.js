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
      options: {
        actions: {
          processed: {
            actionType: ["record"],
            label: "Publish",
            icon: "fas fa-eye",
            isVisible: true,
            handler: async (req, res, data) => {
              const { record } = data;

              await record.update({
                status: "PROCESSED",
              });
              return {
                record: data.record.toJSON(data.currentAdmin),
                redirectUrl: data.h.resourceActionUrl({
                  resourceId: data.resource.id(),
                  actionName: "list",
                }),
                notice: {
                  message: "Successfully update given order to processed",
                  type: "success",
                },
              };
            },
          },
          shipped: {
            actionType: ["record"],
            label: "Publish",
            icon: "fas fa-eye",
            isVisible: true,
            handler: async (req, res, data) => {
              const { record } = data;

              await record.update({
                status: "SHIPPED",
              });
              return {
                record: data.record.toJSON(data.currentAdmin),
                redirectUrl: "/admin/resources/OrderItem",
                notice: {
                  message: "Successfully update given order to shipped",
                  type: "success",
                },
              };
            },
          },
        },
      },
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
