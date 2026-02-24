import { GET_ALL_CATEGORIES, GET_PROD_BY_CAT_ID } from "./api-urls";
import { get } from "./apiService";

export const getAllCategories = async () => {
    
  try {
      const res = await get(
          `${GET_ALL_CATEGORIES}`
      );  
      console.log(GET_ALL_CATEGORIES,'gg')
     
         return res.data

    
   
  } catch (error) {
    console.error('getProductsByCategory error:', error);
    return [];
  }
};


export const getProductsByCategory = async (categoryId) => {
    
  try {
      const res = await get(
          `${GET_PROD_BY_CAT_ID}?catergoryId=${categoryId}`
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

