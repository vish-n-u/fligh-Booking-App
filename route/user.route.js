const userController = require("../controller/user.controller");
const {
  authJwt,
  userMiddleware,
  paramsValidator,
} = require("../middleware/index.middleware");
module.exports = (app) => {
  app.get(
    "/flightApp/api/v1/users",
    [authJwt.verifyJwt, authJwt.isAdmin],
    userController.getAllUsers
  ),
    app.get(
      "/flightApp/api/v1/users/:id",
      [authJwt.verifyJwt, userMiddleware.getSingleUserDetail],
      userController.getOneUserDetails
    );
  app.put(
    "/flightApp/api/v1/users/:id",
    [authJwt.verifyJwt, paramsValidator.validateParamId, userMiddleware.update],
    userController.update
  );
};
