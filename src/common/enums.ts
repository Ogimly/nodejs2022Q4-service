export const enum DBMessages {
  UserNotFound = 'User not found',
  UserPasswordInvalid = 'Invalid user password',

  ArtistNotFound = 'Artist not found',
  ArtistAdded = 'Artist added successfully',
  ArtistRemoved = 'Artist removed successfully',
  ArtistNotInFavorites = 'Artist not in favorites',

  TrackNotFound = 'Track not found',
  TrackAdded = 'Track added successfully',
  TrackRemoved = 'Track removed successfully',
  TrackNotInFavorites = 'Track not in favorites',

  AlbumNotFound = 'Album not found',
  AlbumAdded = 'Album added successfully',
  AlbumRemoved = 'Album removed successfully',
  AlbumNotInFavorites = 'Album not in favorites',
}

export const enum UserApiText {
  tag = 'Users',

  Ok = 'Successful operation',
  Unauthorized = 'Access token is missing or invalid',
  NotFound = 'User not found',
  BadRequest = 'Bad request. userId is invalid (not uuid)',

  getSum = 'Get all users',
  getDesc = 'Get all users',

  createSum = 'Create user',
  createDesc = 'Creates a new user',
  createOk = 'The user has been created',
  createBadRequest = 'Bad request. Body does not contain required fields',

  getIdSum = 'Get single user by id',
  getIdDesc = 'Get single user by id',

  putSum = `Update a user's password`,
  putDesc = `Updates a user's password by ID`,
  putOk = 'The user has been updated',
  putForbidden = 'oldPassword is wrong',

  delSum = `Delete user`,
  delDesc = `Deletes user by ID`,
  delOk = 'The user has been deleted',
}

export const enum ArtistApiText {
  tag = 'Artists',

  Ok = 'Successful operation',
  Unauthorized = 'Access token is missing or invalid',
  NotFound = 'Artist not found',
  BadRequest = 'Bad request. ArtistId is invalid (not uuid)',

  getSum = 'Gets all artists',
  getDesc = 'Gets all artists',

  createSum = 'Add new artist',
  createDesc = 'Add new artist',
  createBadRequest = 'Bad request. Body does not contain required fields',

  getIdSum = 'Get single artist by id',
  getIdDesc = 'Get single artist by id',

  putSum = `Update artist information`,
  putDesc = `Update artist information by UUID`,
  putOk = 'The artist has been updated',

  delSum = `Delete artist`,
  delDesc = `Delete artist from library`,
  delOk = 'Deleted successfully',
}

export const enum TrackApiText {
  tag = 'Tracks',

  Ok = 'Successful operation',
  Unauthorized = 'Access token is missing or invalid',
  NotFound = 'Track not found',
  BadRequest = 'Bad request. TrackId is invalid (not uuid)',

  getSum = 'Get tracks list',
  getDesc = 'Gets all library tracks list',

  createSum = 'Add new track',
  createDesc = 'Add new track information',
  createBadRequest = 'Bad request. Body does not contain required fields',

  getIdSum = 'Get single track by id',
  getIdDesc = 'Get single track by id',

  putSum = `Update track information`,
  putDesc = `Update library track information by UUID`,
  putOk = 'The track has been updated',

  delSum = `Delete track`,
  delDesc = `Delete track from library`,
  delOk = 'Deleted successfully',
}

export const enum AlbumApiText {
  tag = 'Albums',

  Ok = 'Successful operation',
  Unauthorized = 'Access token is missing or invalid',
  NotFound = 'Album not found',
  BadRequest = 'Bad request. AlbumId is invalid (not uuid)',

  getSum = 'Get albums list',
  getDesc = 'Gets all library albums list',

  createSum = 'Add new album',
  createDesc = 'Add new album information',
  createBadRequest = 'Bad request. Body does not contain required fields',

  getIdSum = 'Get single album by id',
  getIdDesc = 'Get single album by id',

  putSum = `Update album information`,
  putDesc = `Update library album information by UUID`,
  putOk = 'The album has been updated',

  delSum = `Delete album`,
  delDesc = `Delete album from library`,
  delOk = 'Deleted successfully',
}
