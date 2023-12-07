 import _ from 'lodash'
 const customParamsSerializer =(params:any)=>{
  if(_.isEmpty(params)) return '';
  return _.map(Object.entries(params), ([key, value]:any)=>{
    if(_.isArray(value)){
      return value.map(v=>`${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
    }
    return `${encodeURIComponent(key)}=${value}`
  }).join('&')
 };

 export default customParamsSerializer