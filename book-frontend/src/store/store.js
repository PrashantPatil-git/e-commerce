import { combineReducers, createStore } from "redux";
import userReducer from "./reducer/user.reducer";
import sellerReducer from "./reducer/seller.reducer";

const allReducer = combineReducers({
  user: userReducer,
  seller: sellerReducer,
});

const store = createStore(allReducer);

export default store;
