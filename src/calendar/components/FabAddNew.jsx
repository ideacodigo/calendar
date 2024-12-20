import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {

   const { openDateModal } = useUiStore();
   const { setActiveEvent } = useCalendarStore();

   const handleClickNew = () => {
      setActiveEvent({
         // _id: new Date().getTime(),
         title: '',
         notes: '',
         start: new Date(),
         end: addHours(new Date(), 2),
         bgColor: '#fafafa',
         user: {
            _id: 'adm',
            name: 'admin'
         }
      })
      openDateModal();
   };

   return (
      <button className="btn btn-primary fab" onClick={handleClickNew}>
         <i className="fas fa-plus"></i>
      </button>
   );
};
