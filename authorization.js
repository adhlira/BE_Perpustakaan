export const Role = {
  ADMINISTRATOR: "Admin",
  REGULAR_USER: "Petugas",
};

export const Permission = {
  BROWSE_PETUGAS: "browse_petugas",
  ADD_PETUGAS: "add_petugas",
  UPDATE_PETUGAS: "update_petugas",
  DELETE_PETUGAS: "delete_petugas",
};

export const PermissionAssignment = {
  [Role.ADMINISTRATOR]: [Permission.BROWSE_PETUGAS, Permission.ADD_PETUGAS, Permission.UPDATE_PETUGAS, Permission.DELETE_PETUGAS],
};
