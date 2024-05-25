import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {private readonly tokenKey = 'auth-token';

constructor() { }

saveToken(token: string) {
  localStorage.setItem(this.tokenKey, token);
}

getToken(): string | null {
  return localStorage.getItem(this.tokenKey);
}

removeToken() {
  localStorage.removeItem(this.tokenKey);
}

// Add other token related methods here
}