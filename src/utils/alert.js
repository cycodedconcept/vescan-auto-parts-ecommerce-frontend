import Swal from "sweetalert2";

const modalBase = {
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
};

export const alertSuccess = (title) =>
  Swal.fire({ ...modalBase, icon: "success", title });

export const alertError = (title) =>
  Swal.fire({ ...modalBase, icon: "error", title });
