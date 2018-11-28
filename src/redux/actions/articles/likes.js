import apiRequest from '../../../services/apiRequest';
import {
  ADD_REACTION,
} from '../../constants/articles';

const addReaction = ({ slug, newStatus, prevStatus }) => (dispatch) => {
  apiRequest.addReaction({ slug, status: newStatus })
    .then(() => {
      dispatch({ type: ADD_REACTION, slug, status: newStatus });
    })
    .catch(() => {
      dispatch({ type: ADD_REACTION, slug, status: prevStatus });
    });
};
export default addReaction;
