const dataArrayRules = {
  reg_ex: /^(?=.*\d)(?=.*[a-z])[a-z0-9]{8}$/,
  arrLength: 2,
  idArgumentTypes: ['string'],
  dataArgumentTypes: ['string', 'object']
};

const testIdDataArray = (a, j) => {
  if (Array.isArray(a)) {
    if (a.length === dataArrayRules.arrLength) {
      if (
        dataArrayRules.idArgumentTypes.includes(typeof a[0]) &&
        dataArrayRules.reg_ex.test(a[0])
      ) {
        if (dataArrayRules.dataArgumentTypes.includes(typeof a[1]) && !Array.isArray(a[1])) {
          return true;
        } else {
          console.error(
            `The dataset in the array of index ${j} in the data array passed into keplerglDatasetBuilder needs to be either a string or an object.`
          );
        }
      } else {
        console.error(
          `The ID string '${a[0]}' in the array at index ${j} of the data array is not a string of alphanumeric, lowercase characters of length 8`
        );
        return false;
      }
    } else {
      console.error(
        `The [id,datafile] array at index ${j} of the data array does not have a length of 2, it's length is ${a.length}`
      );
      return false;
    }
  } else {
    console.error(
      `The 'data' argument that was passed to keplerglDatasetBuilder is not an array. It needs to be an array containing the following [ id (string), data (string or object)]`
    );
    return false;
  }
  return;
};

const keplerglDatasetBuilder = (data, processFunction) => {
  let response = [];
  if (Array.isArray(data)) {
    if (processFunction === undefined) {
      for (let i = 0; i < data.length; i++) {
        if (testIdDataArray(data[i], i)) {
          response.push({
            info: {id: data[i][0]},
            data: data[i][1]
          });
        }
      }
    } else if (typeof processFunction === 'function') {
      for (let i = 0; i < data.length; i++) {
        if (testIdDataArray(data[i], i)) {
          response.push({
            info: {id: data[i][0]},
            data: typeof data[i][1] === 'string' ? processFunction(data[i][1]) : data[i][1]
          });
        }
      }
    } else {
      console.error(
        'The argument for processFunction that was passed to keplerglDatasetBuilder() is not a function.'
      );
    }
  } else {
    console.error(`The argument for data that was passed to keplerglDatasetBuilder() is not an array.`);
  }
  return response;
};

export default keplerglDatasetBuilder;
