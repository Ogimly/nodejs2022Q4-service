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

export const enum ApiText {
  ok = 'Successful operation',
  unauthorized = 'Access token is missing or invalid',
}

export const enum UserApiText {
  tag = 'Users',
  NotFound = 'User not found',
  BadRequest = 'Bad request. userId is invalid (not uuid)',

  getS = 'Get all users',
  getD = 'Get all users',

  createS = 'Create user',
  createD = 'Creates a new user',
  createOk = 'The user has been created',
  createBadReq = 'Bad request. Body does not contain required fields',

  getIdS = 'Get single user by id',
  getIdD = 'Get single user by id',

  putS = `Update a user's password`,
  putD = `Updates a user's password by ID`,
  putOk = 'The user has been updated',
  putForbidden = 'oldPassword is wrong',

  delS = `Delete user`,
  delD = `Deletes user by ID`,
  delOk = 'The user has been deleted',
}
