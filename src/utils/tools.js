function extractFilenameFromUrl(url) {
  const parsedUrl = new URL(url);
  const pathParts = parsedUrl.pathname.split('/');
  return pathParts[pathParts.length - 1];
}

function hasObjectChanged(obj1, obj2) {
  // Check if both arguments are objects
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  // Check if the number of keys is different
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return getAllChangedValues(obj1, obj2);
  }

  // Compare the values of each key
  const changedValues = {};
  for (let key in obj1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const nestedChanges = hasObjectChanged(obj1[key], obj2[key]);
      if (nestedChanges !== false) {
        changedValues[key] = nestedChanges;
      }
    } else if (obj1[key] !== obj2[key]) {
      changedValues[key] = obj2[key];
    }
  }

  if (Object.keys(changedValues).length === 0) {
    return false;
  }

  return changedValues;
}
function getAllChangedValues(obj1, obj2) {
  const changedValues = {};

  for (let key in obj1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const nestedChanges = hasObjectChanged(obj1[key], obj2[key]);
      if (nestedChanges !== false) {
        changedValues[key] = nestedChanges;
      }
    } else if (obj1[key] !== obj2[key]) {
      changedValues[key] = obj2[key];
    }
  }

  for (let key in obj2) {
    if (!obj1.hasOwnProperty(key)) {
      changedValues[key] = obj2[key];
    }
  }

  if (Object.keys(changedValues).length === 0) {
    return false;
  }

  return changedValues;
}
function convertToUpdateObject(mainKey,obj) {
  const updateObj = {};
  for (const [key, value] of Object.entries(obj)) {
    updateObj[`${mainKey}.$.${key}`] = value;
  }
  return updateObj;
}


const fs = require("fs");

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

module.exports = {
  extractFilenameFromUrl,
  hasObjectChanged,
  convertToUpdateObject,
  deleteFolderRecursive,
  createFolder
}