import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChatService } from './chat.service';
import { LoggedInUser } from '../models/LoggedInUser';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  apiUrl: string = environment.apiUrl;
  id_token: string = "";

  loggedIn = false;
  isloggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedInUser!: LoggedInUser;
  userSubject = new BehaviorSubject({});

  constructor(
    // --------------------------------------------
    private http: HttpClient,
    // --------------------------------------------
    private jwtHelper: JwtHelperService,
    private chatService: ChatService
  ) {
    let token = localStorage.getItem('id_token');
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        this.setUser(token);
      }
    }
  }

    // ------------------------------------------------------
    Mapping()
    {
      return this.http.get(`${this.apiUrl}/mapping`);
    }

    Assessment(obj: any) {
      return this.http.post(`${this.apiUrl}/assessment`, obj);
    }

    A_result(obj: any) {
      return this.http.post(`${this.apiUrl}/a_result`, obj);
    }

    UserReg(obj: any) {
      return this.http.post(`${this.apiUrl}/usersignup`, obj);
    }

    AppBook(obj: any) {
      return this.http.post(`${this.apiUrl}/booking`, obj);
    }

    UserData(obj: any) {
      return this.http.post(`${this.apiUrl}/userdata`, obj);
    }

    BookingData(obj: any) {
      return this.http.post(`${this.apiUrl}/bookingData`, obj);
    }

    Bookdata(obj: any) {
      return this.http.post(`${this.apiUrl}/bookdata`, obj);
    }

    AppCancel(obj : any) {
      return this.http.post(`${this.apiUrl}/bookingCancel`, obj);
    }

    AppReschedule(obj : any) {
      return this.http.post(`${this.apiUrl}/bookingReschedule`, obj);
    }

    AppBookingStatus(obj : any) {
      return this.http.post(`${this.apiUrl}/bookingStatus`, obj);
    }

    Feedback(obj : any) {
      return this.http.post(`${this.apiUrl}/feedback`, obj);
    }

    FeedBackData(obj : any) {
      return this.http.post(`${this.apiUrl}/feedbackdata`, obj);
    }

    D_FeedBackData(obj : any) {
      return this.http.post(`${this.apiUrl}/D_feedbackdata`, obj);
    }

    Fav(obj : any)
  {
    return this.http.post(`${this.apiUrl}/fav_unfav`, obj);
  }

    AppDone(obj : any) {
      return this.http.post(`${this.apiUrl}/appointmentDone`, obj);
    }

    AppDataById(obj : any) {
      return this.http.post(`${this.apiUrl}/bookingDataById`, obj);
    }

    UserUpdate(frmdata : FormData) {
      return this.http.post(`${this.apiUrl}/patientupdate`, frmdata);
    }
 
    DoctorUpdate(frmdata : FormData) {
      return this.http.post(`${this.apiUrl}/doctorupdate`, frmdata);
    }

    AddNote(frmdata: FormData) {
      return this.http.post(`${this.apiUrl}/addnote`, frmdata);
    }
    
    DoctorPrice(obj : any) {
      return this.http.post(`${this.apiUrl}/doctorprice`, obj);
    }

    D_MeetStatus(obj : any) {
      return this.http.post(`${this.apiUrl}/doctorMeetStatus`, obj);
    }
    
    PriceData(obj : any) {
      return this.http.post(`${this.apiUrl}/pricedata`, obj);
    }
    
    DoctorUpdatePrice(obj : any) {
      return this.http.post(`${this.apiUrl}/doctorupdateprice`, obj);
    }

    SpecUpdate(obj: any) {
      return this.http.post(`${this.apiUrl}/specupdate`, obj);
    }
    
    PatientUpdate(obj : any){
      return this.http.post(`${this.apiUrl}/patientupdate`, obj);
    }
    
    DoctorsData(obj: any) {
      return this.http.post(`${this.apiUrl}/doctorsdata`, obj);
    }
    
    AboutmeUpdate(obj: any) {
      return this.http.post(`${this.apiUrl}/aboutmeupdate`, obj);
    }
    
    Task(obj : any)
    {
      return this.http.post(`${this.apiUrl}/task`, obj);
    }
    
    TaskData(obj : any)
    {
      return this.http.post(`${this.apiUrl}/taskdata`, obj);
    }
    
    UpdateTask(obj : any)
    {
      return this.http.post(`${this.apiUrl}/updatetask`, obj);
    }
    
    DeleteTask(obj : any)
    {
      return this.http.post(`${this.apiUrl}/deletetask`, obj);
    }
    
    TimePeriod(obj: any)
    {
      return this.http.post(`${this.apiUrl}/settimeperiod`, obj);
    }
    
    UpdateTimePeriod(obj: any)
    {
      return this.http.post(`${this.apiUrl}/updatetimeperiod`, obj);
    }
    
    ShiftData(obj : any)
    {
      return this.http.post(`${this.apiUrl}/shiftdata`, obj);
    }
    
    Blog(frmdata: FormData)
    {
      return this.http.post(`${this.apiUrl}/addblog`, frmdata);
    }
    
    BlogData(obj : any)
    {
      return this.http.post(`${this.apiUrl}/blogdata`, obj);
    }
    
    DeleteBlog(obj : any)
    {
      return this.http.post(`${this.apiUrl}/deleteblog`, obj);
    }
    // ------------------------------------------------------

  register(user: User) {
    return axios.post(`${this.apiUrl}/register`, user);
  }

  login(crendentials: { email: string, password: string }) {
    return axios.post(`${this.apiUrl}/login`, crendentials);
  }

  logout() {
    this.chatService.clearNotifications();
    return axios.post(`${this.apiUrl}/logout`, this.id_token, { headers: { "Authorization": `Bearer ${this.id_token}` } })
      .then(
        (res) => {
          this.id_token = "";
          localStorage.removeItem('id_token');
          this.loggedIn = false;
          this.isloggedIn.next(this.loggedIn);
          this.chatService.disconnect();
          return res;
        }, (err) => {
          return err;
        });
  }

  forgotPassword(email: string) {
    return axios.post(`${this.apiUrl}/forgot-password`, email);
  }

  verifyEmailToken(token: string) {
    return axios.get(`${this.apiUrl}/forgot-password/${token}`,)
  }

  resetPassword(data: { new_password: string, confirm_password: string, token: string }) {
    return axios.post(`${this.apiUrl}/reset-password`, data);
  }

  getLoginStatus(): Observable<boolean> {
    return this.isloggedIn.asObservable();
  }

  setUser(token: string) {
    this.id_token = token;
    this.loggedIn = true;
    this.isloggedIn.next(true);
    this.loggedInUser = this.jwtHelper.decodeToken(this.id_token);
    this.userSubject.next(this.loggedInUser);
    this.chatService.setupSocketConnection(this.loggedInUser, this.id_token);
  }

  resetUser() {
    this.id_token = "";
    localStorage.removeItem('id_token');
    this.loggedIn = false;
    this.isloggedIn.next(this.loggedIn);
    this.chatService.disconnect();
    
  }

  getLoggedInDetails = () => {
    return this.isloggedIn.asObservable();
  }
}
