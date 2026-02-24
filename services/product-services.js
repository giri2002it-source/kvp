import { GET_ALL_PRODUCTS, LOCALHOST } from "./api-urls";
import  { get } from "./apiService";

export const getAllProducts = async () => {
    
  try {
      const res = await get(
          GET_ALL_PRODUCTS
      );  
      if (res && res.statusCode == 200){
         return res.data
      } 
      console.log(res,'ress')
    
   
  } catch (error) {
    console.error('getProductsByCategory error:', error);
    return [];
  }
};
