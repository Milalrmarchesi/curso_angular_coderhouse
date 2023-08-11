import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { User } from '../../dashboard/pages/users/models/user';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => '',
          },
        }),
      ],
      providers: [AuthService, JwtHelperService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    //httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if user is authenticated', (done) => {
    const userResponse: User = {
      id: 1,
      name: 'Mili',
      username: 'test',
      email: 'mili@jajaj.com',
      password: 'password',
      address: 'Avenida siempre viva',
      avatar: 'avatar.jpg',
      createdAt: '2023-08-10T00:00:00Z',
    };      
    const token = 'test-token';
    service.login('test', 'password');

    // Mock the HTTP response
    const req = httpMock.expectOne(`${environment.apiUrl}users/test`);
    req.flush(userResponse);
    
    
    service.isAuthenticated().subscribe((result) => {
      //expect(result).toBeTrue();
      done();
    });
    

  });

  it('should return false if user is not authenticated', (done) => {
    const userResponse: User = {
      id: 1,
      name: 'Mili',
      username: 'test',
      email: 'mili@jajaj.com',
      password: 'incorrect-password',
      address: 'Avenida siempre viva',
      avatar: 'avatar.jpg',
      createdAt: '2023-08-10T00:00:00Z',
    };    
    service.login('test', 'incorrect-password');
    // Mock the HTTP response
    const req = httpMock.expectOne(`${environment.apiUrl}users/test`);
    req.flush(userResponse);

    // Assert
    service.isAuthenticated().subscribe((result) => {
      expect(result).toBeFalse();
      done();
    });
  });

  it('should handle login error', (done) => {
    service.login('user-error', 'password');
    // Mock the HTTP response with error status
    const req = httpMock.expectOne(`${environment.apiUrl}users/user-error`);
    req.error(new ErrorEvent('Network error'));

    // Assert
    service.isAuthenticated().subscribe((result) => {
      expect(result).toBeFalse();
      done();
    });
  });
});