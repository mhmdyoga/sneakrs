import { useMutation } from "@tanstack/react-query";
import { useApi } from "../utils/GlobalApi";

interface CheckoutPayload {
  userId: number;
  gross_amount: number;
  products: {
    productId: string;
    size: number;
    quantity: number;
    price: number;
  }[];
}

export const useCreateTx = () => {
    const api = useApi();
    return useMutation({
        mutationFn: async(payload: CheckoutPayload) => {
            const { data } = await api.post('/transaction', payload);
            return data;
        }
    })
}