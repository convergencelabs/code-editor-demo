export default class IdentityCache {
  constructor(identityService) {
    this._identityService = identityService;
    this._cache = {};
  }

  user(username) {
    if (this._cache[username]) {
      return Promise.resolve(this._cache[username]);
    } else {
      return this._identityService.user(username).then(user => {
        this._cache[username] = user;
        return user;
      });
    }
  }

  users(usernames) {
    const needed = usernames.filter(username => this._cache[username] === undefined);
    const have = usernames.filter(username => this._cache[username] !== undefined);
    const result = {};
    have.forEach(username => result[username] = this._cache[username]);

    if (needed.length === 0) {
      return Promise.resolve(result);
    } else {
      return this._identityService.users(needed).then(users => {
        needed.forEach(username => {
          if (users[username] !== undefined) {
            this._cache[username] = users[username];
            result[username] = users[username];
          }
        });
        return result;
      });
    }
  }
}
