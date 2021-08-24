export const Types = {
  openModal: "[ui] open modal",
  closeModal: "[ui] close modal",

  eventAddNew: "[event] add new event",
  eventStartAddNew: "[event] add new event",
  eventStartLoaded: "[event] add start loaded",
  eventSetActive: "[event] set active event",

  eventRemoveActiveEvent: "[event] remove active event",
  eventUpdated: "[event] upate event",
  eventDeleted: "[event] upate deleted",
  eventLogout: "[event] log out",

  authStartLogin: "[auth] start login",
  authCheking: "[auth] cheking login state", //aca lo que hago es iniciar la checkeada delñ login o sea si el proceso esta cargando
  authChekingFinish: "[auth] cheking finish state", //proceso ya cargado
  authLogin: "[auth] login",
  authLogout: "[auth] logout",
  authStartRegister: "[auth] start register",
  authStartTokenRenew: "[auth] start token renew",
};
