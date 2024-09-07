export const Role = {
  ADMINISTRATOR: "Admin",
  REGULAR_USER: "Petugas",
};

export const Permission = {
  BROWSE_PETUGAS: "browse_petugas",
  ADD_PETUGAS: "add_petugas",
  EDIT_PETUGAS: "edit_petugas",
  DELETE_PETUGAS: "delete_petugas",

  BROWSE_ANGGOTA: "browse_anggota",
  ADD_ANGGOTA: "add_anggota",
  EDIT_ANGGOTA: "edit_anggota",
  DELETE_ANGGOTA: "delete_anggota",
  BORROWING_HISTORY: "borrowing_history",

  BROWSE_BUKU: "browse_buku",
  ADD_BUKU: "add_buku",
  EDIT_BUKU: "edit_buku",
  DELETE_BUKU: "delete_buku",

  BROWSE_PENGARANG: "browse_pengarang",
  ADD_PENGARANG: "add_pengarang",
  EDIT_PENGARANG: "edit_pengarang",
  DELETE_PENGARANG: "delete_pengarang",
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
    Permission.DELETE_ANGGOTA,
    Permission.BORROWING_HISTORY,

    Permission.BROWSE_BUKU,
    Permission.ADD_BUKU,
    Permission.EDIT_BUKU,
    Permission.DELETE_BUKU,
  ],

  [Role.REGULAR_USER]: [Permission.BROWSE_ANGGOTA, Permission.ADD_ANGGOTA, Permission.BORROWING_HISTORY, Permission.BROWSE_BUKU, Permission.ADD_BUKU],
};
