import { AuthInterceptor } from './api.interceptor';

describe('Api.Interceptor', () => {
  it('should create an instance', () => {
    expect(new AuthInterceptor()).toBeTruthy();
  });
});
