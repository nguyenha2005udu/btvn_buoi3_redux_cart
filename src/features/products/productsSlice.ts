import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import type { Product } from "../../types/product";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

// Gọi API lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products"
      );

      if (!response.ok) {
        return rejectWithValue(
          `Lỗi HTTP: ${response.status}`
        );
      }

      const data: Product[] = await response.json();

      return data;
    } catch {
      return rejectWithValue(
        "Không thể kết nối đến API sản phẩm."
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Đang tải dữ liệu
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      // Tải thành công
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })

      // Tải thất bại
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Có lỗi xảy ra.";
      });
  },
});

export default productsSlice.reducer;