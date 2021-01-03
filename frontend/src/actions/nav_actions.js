export const OPEN_NAV_MODAL = "OPEN_NAV_MODAL";
export const CLOSE_NAV_MODAL = "CLOSE_NAV_MODAL";

export const openNavModal = (value) => ({
  type: OPEN_NAV_MODAL,
  value,
});

export const closeNavModal = (value) => ({
  type: CLOSE_NAV_MODAL,
  value,
});
