import { addHours, differenceInSeconds } from 'date-fns';
import { useMemo, useState } from 'react';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'
import { useUiStore } from '../../hooks/';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

  const { isDateModalOpen } = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValue, setFormValue] = useState({
    title: 'Diego',
    notes: 'Toro',
    start: new Date(),
    end: addHours( new Date(), 2),
  })

  const titleClass = useMemo(() => {
    if(!formSubmitted ) return '';
    return (formValue.title.length > 0)
      ?''
      :'is-invalid'
  }, [formValue.title, formSubmitted])

  const onInputChange = ({target})=> {
    setFormValue({
      ...formValue,
      [target.name]: target.value
    })
  }

  const onDateChanged = (event, chaining) => {
    setFormValue({
      ...formValue,
      [chaining]: event
    })
  }

  const onCloseModal = () => {
    console.log('loading modal');
  }

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValue.end, formValue.start);
    console.log(difference);
    
    if (isNaN(difference)){
      Swal.fire('error dates', 'check dates');
      return;
    } else if (difference < 0){
      Swal.fire('range dates', 'check dates', 'error');
    }

    if(formValue.title.length <= 0 ) return;

    console.log(formValue);
    
    //TODO:
    //close model
    //remove errors screen
    
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className={"modal"}
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <label className=''>Fecha y hora inicio</label><br />
          <DatePicker 
            selected={formValue.start}
            onChange={(event) => onDateChanged(event,'start')}
            className='form-control'
            dateFormat={'Pp'}
            showTimeSelect
            locale="es"
            timeCaption='Hora'
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label><br />
          <DatePicker 
          minDate={formValue.start}
            selected={formValue.start}
            onChange={(event) => onDateChanged(event,'end')}
            className='form-control'
            dateFormat={'Pp'}
            showTimeSelect
            locale="es"
            timeCaption='Hora'
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValue.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValue.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
