/* Generated by the Nim Compiler v1.4.2 */
var framePtr = null;
var excHandler = 0;
var lastJSError = null;
var NTI1188013 = {size: 0,kind: 28,base: null,node: null,finalizer: null};
function makeNimstrLit(c_1455062) {
      var ln = c_1455062.length;
  var result = new Array(ln);
  for (var i = 0; i < ln; ++i) {
    result[i] = c_1455062.charCodeAt(i);
  }
  return result;
  

  
}
function setConstr() {
        var result = {};
    for (var i = 0; i < arguments.length; ++i) {
      var x = arguments[i];
      if (typeof(x) == "object") {
        for (var j = x[0]; j <= x[1]; ++j) {
          result[j] = true;
        }
      } else {
        result[x] = true;
      }
    }
    return result;
  

  
}
var ConstSet1 = setConstr(17, 16, 4, 18, 27, 19, 23, 22, 21);
function nimCopy(dest_1470023, src_1470024, ti_1470025) {
  var result_1475219 = null;

    switch (ti_1470025.kind) {
    case 21:
    case 22:
    case 23:
    case 5:
      if (!(isFatPointer_1465401(ti_1470025))) {
      result_1475219 = src_1470024;
      }
      else {
        result_1475219 = [src_1470024[0], src_1470024[1]];
      }
      
      break;
    case 19:
            if (dest_1470023 === null || dest_1470023 === undefined) {
        dest_1470023 = {};
      }
      else {
        for (var key in dest_1470023) { delete dest_1470023[key]; }
      }
      for (var key in src_1470024) { dest_1470023[key] = src_1470024[key]; }
      result_1475219 = dest_1470023;
    
      break;
    case 18:
    case 17:
      if (!((ti_1470025.base == null))) {
      result_1475219 = nimCopy(dest_1470023, src_1470024, ti_1470025.base);
      }
      else {
      if ((ti_1470025.kind == 17)) {
      result_1475219 = (dest_1470023 === null || dest_1470023 === undefined) ? {m_type: ti_1470025} : dest_1470023;
      }
      else {
        result_1475219 = (dest_1470023 === null || dest_1470023 === undefined) ? {} : dest_1470023;
      }
      }
      nimCopyAux(result_1475219, src_1470024, ti_1470025.node);
      break;
    case 24:
    case 4:
    case 27:
    case 16:
            if (src_1470024 === null) {
        result_1475219 = null;
      }
      else {
        if (dest_1470023 === null || dest_1470023 === undefined) {
          dest_1470023 = new Array(src_1470024.length);
        }
        else {
          dest_1470023.length = src_1470024.length;
        }
        result_1475219 = dest_1470023;
        for (var i = 0; i < src_1470024.length; ++i) {
          result_1475219[i] = nimCopy(result_1475219[i], src_1470024[i], ti_1470025.base);
        }
      }
    
      break;
    case 28:
            if (src_1470024 !== null) {
        result_1475219 = src_1470024.slice(0);
      }
    
      break;
    default: 
      result_1475219 = src_1470024;
      break;
    }

  return result_1475219;

}
if (!Math.trunc) {
  Math.trunc = function(v) {
    v = +v;
    if (!isFinite(v)) return v;
    return (v - v % 1) || (v < 0 ? -0 : v === 0 ? v : 0);
  };
}

function isFatPointer_1465401(ti_1465403) {
  var result_1465404 = false;

  BeforeRet: do {
    result_1465404 = !((ConstSet1[ti_1465403.base.kind] != undefined));
    break BeforeRet;
  } while (false);

  return result_1465404;

}
function nimCopyAux(dest_1470028, src_1470029, n_1470031) {
    switch (n_1470031.kind) {
    case 0:
      break;
    case 1:
            dest_1470028[n_1470031.offset] = nimCopy(dest_1470028[n_1470031.offset], src_1470029[n_1470031.offset], n_1470031.typ);
    
      break;
    case 2:
          for (var i = 0; i < n_1470031.sons.length; i++) {
      nimCopyAux(dest_1470028, src_1470029, n_1470031.sons[i]);
    }
    
      break;
    case 3:
            dest_1470028[n_1470031.offset] = nimCopy(dest_1470028[n_1470031.offset], src_1470029[n_1470031.offset], n_1470031.typ);
      for (var i = 0; i < n_1470031.sons.length; ++i) {
        nimCopyAux(dest_1470028, src_1470029, n_1470031.sons[i][1]);
      }
    
      break;
    }

  
}
function sample() {
  var result_1852004 = [];

  var F={procname:"exportjs.sample",prev:framePtr,filename:"/Users/skash/leetcode/exportjs.nim",line:0};
  framePtr = F;
    F.line = 1;
    result_1852004 = nimCopy(null, makeNimstrLit("123"), NTI1188013);
  framePtr = F.prev;

  return result_1852004;

}
var F={procname:"module exportjs",prev:framePtr,filename:"/Users/skash/leetcode/exportjs.nim",line:0};
framePtr = F;
framePtr = F.prev;
var F={procname:"module exportjs",prev:framePtr,filename:"/Users/skash/leetcode/exportjs.nim",line:0};
framePtr = F;
framePtr = F.prev;
