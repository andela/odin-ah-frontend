import {
  ADD_REACTION,
} from '../../constants/articles';


const initialState = {
  articleLiked: false,
  articleDisliked: false,
};

export function updateCount(reaction, newStatus) {
  const { status } = reaction;
  let { likeCount, dislikeCount } = reaction;
  if (newStatus === 'like' && status === 'dislike') {
    likeCount += 1;
    dislikeCount -= 1;
  } else if (newStatus === 'dislike' && status === 'like') {
    likeCount -= 1;
    dislikeCount += 1;
  } else if (newStatus === 'neutral' && status === 'like') {
    likeCount -= 1;
  } else if (newStatus === 'neutral' && status === 'dislike') {
    dislikeCount -= 1;
  } else if (newStatus === 'like' && status === 'neutral') {
    likeCount += 1;
  } else if (newStatus === 'dislike' && status === 'neutral') {
    dislikeCount += 1;
  }

  return { likeCount, dislikeCount, };
}

const likeReducer = (state = initialState, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case ADD_REACTION: {
      const { reaction } = state;
      let {
        likeCount, dislikeCount, hasReacted, status
      } = reaction;

      if (hasReacted) {
        ({ likeCount, dislikeCount } = updateCount(reaction, payload.status));
      } else {
        hasReacted = true;
        if (status === 'like') {
          likeCount += 1;
        } else if (status === 'dislike') {
          dislikeCount += 1;
        }
      }
      ({ status } = payload);
      return {
        ...state,
        reaction: {
          likeCount, dislikeCount, hasReacted, status
        }
      };
    }
    default:
      return state;
  }
};


export default likeReducer;
