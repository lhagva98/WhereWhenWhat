import {getUserToken} from '../utils/store';

export default (headers = (authorization = false, contentType = null) => {
  let properties = {
    'Content-Type': 'application/json',
  };

  if (contentType != null) {
    properties['Content-Type'] = contentType;
  }
  if (contentType === 'multipart/form-data') {
    delete properties['Content-Type'];
  }
  if (authorization) {
    console.log(getUserToken());
    return {
      ...properties,
      Authorization: 'Bearer ' + getUserToken(),
    };
  } else {
    return {
      ...properties,
    };
  }
});
