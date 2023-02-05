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
