import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export function show_alerta(mensaje,icono,foco){
    const MySwal =  withReactContent(Swal);
    MySwal.fire({
        title: mensaje,
        icon: icono,
        // focusConfirm: foco,
        // confirmButtonText: 'OK'
    })
}

function onfocus(foco){
    if(foco !== ''){
        document.getElementById(foco).focus();
    }
}