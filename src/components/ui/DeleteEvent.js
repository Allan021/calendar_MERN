import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startDeleteEvent } from "../../actions/event";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

const DeleteEvent = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleDelete = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Estas seguro que quieres eliminar este evento?",
        text: `${name} esta a punto de borrar este eventos`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borralo we",
        cancelButtonText: "No, no lo borres!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(startDeleteEvent());
          swalWithBootstrapButtons.fire(
            "Eliminado!",
            "Tu evento ha sido eliminado.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "Tu evento no ha sido eliminado",
            "error"
          );
        }
      });
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash"></i> Eliminar
    </button>
  );
};

export default DeleteEvent;
