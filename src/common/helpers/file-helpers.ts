import { stat } from 'fs/promises';
import { resolve, sep } from 'path';

const checkPath = async (path: string, checkName: string): Promise<boolean> => {
  try {
    const statInfo = await stat(path);

    const check = statInfo[checkName].bind(statInfo);

    return check();
  } catch (error) {
    return false;
  }
};

export const isDirectory = async (path: string): Promise<boolean> => {
  if (!path) return false;

  const pathToDirectory = resolve(path + sep);
  const pathIsDirectory = await checkPath(pathToDirectory, 'isDirectory');

  return pathIsDirectory;
};

export const isFile = async (path: string): Promise<boolean> => {
  if (!path) return false;

  const pathToFile = resolve(path);
  const pathIsFile = await checkPath(pathToFile, 'isFile');

  return pathIsFile;
};

export const isFileSizeOK = async (
  path: string,
  maxFileSize: number
): Promise<boolean> => {
  if (!path) return false;
  const pathToFile = resolve(path);

  try {
    const statInfo = await stat(pathToFile);

    return statInfo.size < maxFileSize * 1024;
  } catch (error) {
    return false;
  }
};
