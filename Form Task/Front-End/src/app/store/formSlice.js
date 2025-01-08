import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  formData: {},
  status: "idle",
  error: null,
};

export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    updateFormData: (state, action) => {
      const { stepKey, data } = action.payload;
      state.formData[stepKey] = data;
    },
    deleteFormData: (state, action) => {
      const { stepKey } = action.payload;
      state.formData[stepKey] = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.status = "succeeded";
        console.log("Form submitted:", state.formData);
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { nextStep, prevStep, updateFormData, deleteFormData } =
  formSlice.actions;
export default formSlice.reducer;
