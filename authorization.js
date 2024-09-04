export const Role = {
  ADMINISTRATOR: "Admin",
  REGULAR_USER: "Petugas",
};

export const Permission = {
  BROWSE_PETUGAS: "browse_petugas",
  ADD_PETUGAS: "add_petugas",
  UPDATE_PETUGAS: "update_petugas",
  DELETE_PETUGAS: "delete_petugas",

  BROWSE_ANGGOTA: "browse_anggota",
  ADD_ANGGOTA: "add_anggota",
  UPDATE_ANGGOTA: "update_anggota",
  DELETE_ANGGOTA: "delete_anggota",
};

export const PermissionAssignment = {
  [Role.ADMINISTRATOR]: [
    Permission.BROWSE_PETUGAS, 
    Permission.ADD_PETUGAS, 
    Permission.UPDATE_PETUGAS, 
    Permission.DELETE_PETUGAS, 

    Permission.BROWSE_ANGGOTA,    
    Permission.ADD_ANGGOTA, 
    Permission.UPDATE_ANGGOTA, 
    Permission.DELETE_ANGGOTA
  ],

  [Role.REGULAR_USER]: [Permission.BROWSE_ANGGOTA, Permission.ADD_ANGGOTA],
};
