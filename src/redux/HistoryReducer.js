const initialState = [];

const ALL_HISTORIES = "GellAllHistory";
const ADD_FASHION = "AddFashion";
const UPDATE_FASHION = "UpdateFashion";
const DELETE_FASHION = "DeleteFashion";

const HistoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let newHistories;
  switch (type) {
    case ALL_HISTORIES:
      return [...payload];
    default:
      return state;
  }
};

// ACTION
export const GetAllHistoriesAction = (histories) => async (dispatch) => {
  dispatch({ type: ALL_HISTORIES, payload: histories });
};

export default HistoryReducer;
