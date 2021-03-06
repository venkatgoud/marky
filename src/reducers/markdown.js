import wordcount from 'wordcount'
import * as types from '../constants/actionTypes'
import * as elements from '../constants/screenplayElements'

import fountain from '../fountain_parser.js'

const initialState = {
  markdown: '',
  isScrolling: true,
  filePath: null,
  fileName: null,
  showPreview: false,
  indian: true,
  html: null
}

export default function markdown(state = initialState, action) {

  switch (action.type) {
    case types.FILE_LOADED:
      return {
        ...state,
        fileName: action.payload.fileName,
        filePath: action.payload.filePath
      }
    case types.MARKDOWN_CHANGED:
      return Object.assign({}, state, {
        markdown: action.payload.markdown
      })
    case types.TOGGLE_SCROLLING:
      return Object.assign({}, state, {
        isScrolling: !state.isScrolling
      })
    case types.TOGGLE_PREVIEW:
      return Object.assign({}, state, {
        showPreview: !state.showPreview,
        html: !state.showPreview ? fountain.parse(state.markdown).html.script : null
      })
    case types.TOGGLE_SCRIPT_STYLE:
      return Object.assign({}, state, {
        indian: !state.indian
      })
    default:
      return state
  }
}
