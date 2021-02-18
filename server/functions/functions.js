


 const getDate=()=>{
  const formatYmd = date => date.toISOString().slice(0, 10);
  return formatYmd
  }

   const getHash=(str)=> {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  module.exports ={getDate, getHash}
  