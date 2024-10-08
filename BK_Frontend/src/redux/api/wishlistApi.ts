import { indexApi } from "./indexApi";

const wishlistApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET: Retrieve Wishlist for the user
    getWishlist: builder.query<
      Global.apiResponse<wishListTypes.VMGetCartItem[]>,
      void
    >({
      query: () => "wishlist",
      providesTags: ["Wishlist"],
    }),

    // POST: Add multiple items to the wishlist
    addMultipleToWishlist: builder.mutation<
      Global.apiResponse<string>,
      wishListTypes.VMWishlistItem[]
    >({
      query: (wishlistItems) => ({
        url: "wishlist/addMultiple",
        method: "POST",
        body: wishlistItems,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // DELETE: Remove a wishlist item
    removeWishlistItem: builder.mutation<Global.apiResponse<string>, number>({
      query: (id) => ({
        url: `wishlist/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // PUT: Update a wishlist item
    updateWishlistItem: builder.mutation<
      Global.apiResponse<string>,
      { id: number; quantity: number }
    >({
      query: ({ id, quantity }) => ({
        url: `wishlist/update/${id}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // DELETE: Clear the wishlist
    clearWishlist: builder.mutation<Global.apiResponse<string>, void>({
      query: () => ({
        url: "wishlist/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useAddMultipleToWishlistMutation,
  useClearWishlistMutation,
  useGetWishlistQuery,
  useRemoveWishlistItemMutation,
  useUpdateWishlistItemMutation,
} = wishlistApi;
