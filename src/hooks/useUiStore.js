import { useSelector } from "react-redux"

export const useUiStore = () => {

   const {
      isDateModalOpen
   } = useSelector( state => state.ui );

   return {
      //Properties
      isDateModalOpen
      //Methods
   }
}