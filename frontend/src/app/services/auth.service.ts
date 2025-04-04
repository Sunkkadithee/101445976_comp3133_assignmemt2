import {inject, Injectable} from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      token
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
      message
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private apollo = inject(Apollo);

  login(email: string, password: string) {
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password }
    }).pipe(
      map((result: any) => {
        const token = result?.data?.login?.token;
        if (token) {
          localStorage.setItem(this.tokenKey, token);
        }
        return result.data.login;
      })
    );
  }

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { username, email, password }
    }).pipe(
      map((result: any) => result.data.signup)
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
