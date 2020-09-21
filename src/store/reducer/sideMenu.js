import { IS_OPEN, IS_MOBILE, CLOSE_MENU } from '../constants/sideMenu'

const initialValues = {
  isOpen: true,
  isMobile: false,
}

export default (state = initialValues, action) => {
  switch (action.type) {
    case IS_OPEN:
      return {
        ...state,
        isOpen: !state.isOpen
      }

    case IS_MOBILE: {
      return {
        ...state,
        isMobile: true
      }
    }

    case CLOSE_MENU: {
      return {
        ...state,
        isOpen: false
      }
    }

    default: {
      return state
    }
  }
}