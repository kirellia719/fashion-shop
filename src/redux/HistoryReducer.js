const initialState = [];

const ALL_HISTORIES = "GellAllHistories";
const UPDATE_HISTORY = "UpdateHistory";

const HistoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let newHistories;
  switch (type) {
    case ALL_HISTORIES:
      return [...payload];
    case UPDATE_HISTORY:
      newHistories = [...state].map((f) => {
        if (f._id === payload._id) {
          return payload;
        } else {
          return f;
        }
      });
      return newHistories;
    default:
      return state;
  }
};

// ACTION
export const GetAllHistoriesAction = (histories) => async (dispatch) => {
  dispatch({ type: ALL_HISTORIES, payload: histories });
};

export const UpdateHistoryAction = (history) => async (dispatch) => {
  dispatch({ type: UPDATE_HISTORY, payload: history });
};

export default HistoryReducer;
