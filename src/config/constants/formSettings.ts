export const MODAL_STYLE = {
  p: 3,
  width: "100%",
  mt: 4,
  overflowY: "auto"
};

export const MENU_PROPS = {
  anchorOrigin: {
    vertical: "bottom" as const,
    horizontal: "left" as const,
  },
  transformOrigin: {
    vertical: "top" as const,
    horizontal: "left" as const,
  },
  getContentAnchorEl: null,
};

export const GRID_STYLE = {
  mt: 3,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 3,
  px: 4,
  py: 2,
};


export const SELECT_MENU_PROPS = {
  ...MENU_PROPS,
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
    },
  },
};