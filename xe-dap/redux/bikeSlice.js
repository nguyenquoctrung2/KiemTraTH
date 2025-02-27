// redux/bikeSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Slice để quản lý trạng thái bike
const bikeSlice = createSlice({
  name: 'bike',
  initialState: {
    bikes: [],
  },
  reducers: {
    addBike: (state, action) => {
      state.bikes.push(action.payload);
    },
    setBikes: (state, action) => {
      state.bikes = action.payload;
    },
  },
});

// Export các action creators
export const { addBike, setBikes } = bikeSlice.actions;

// Export reducer để đưa vào store
export default bikeSlice.reducer;
