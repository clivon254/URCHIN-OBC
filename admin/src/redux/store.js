

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/storage"
import userReducer from "./user/userSlice"
import themeReducer from "./theme/themeSlice"


const rootReducer = combineReducers({
    user:userReducer,
    theme:themeReducer
})


const persistConfig = {
    key:"root",
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig , rootReducer)


const store = configureStore({

    reducer:persistedReducer,

    middleware:(getDefaultMiddleware) => 

        getDefaultMiddleware({serializableCheck:false})

})


export const persistor = persistStore(store)