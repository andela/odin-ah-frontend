import apiRequest from '../../../services/apiRequest';
import {
  ADD_REACTION,
} from '../../constants/articles';

const addReaction = ({ slug, newStatus, prevStatus }) => (dispatch) => {
  dispatch({ type: ADD_REACTION, slug, status: newStatus });
  apiRequest.addReaction({ slug, status: newStatus })
    .then()
    .catch(() => {
      dispatch({ type: ADD_REACTION, slug, status: prevStatus });
    });
};
export default addReaction;
