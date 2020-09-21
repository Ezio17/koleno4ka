import * as type from '../constants/photo';

const initialValues = {
  photo: []
};

export default (state = initialValues, action) => {
  switch(action.type) {
    case type.SET_PHOTO: {
      return {
        ...state,
        photo: action.photo
      }
    }

    default: {
      return state
    }
  }
}