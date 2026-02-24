import { GET_Home_Details, LOCALHOST } from "./api-urls";
import  { get } from "./apiService";

export const getHomePageDetails = async () => {
    
  try {
      const res = await get(
          GET_Home_Details
      );  
      if (res && res.statusCode == 200){
        console.log(res.statusCode,'ress')
         return res.data
      } 
      console.log(res,'ress')
    
   
  } catch (error) {
    console.error('getHomePageDetails  error:', error);
    return [];
  }
};
