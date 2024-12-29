import { productDatas } from '../productDatas';
export const getProductDatas = async (delay)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      // console.log('delay=',delay);
      resolve(productDatas);
    },delay);
  });
};