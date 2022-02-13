import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import axios from 'axios'
import { BehaviorSubject, Subject } from 'rxjs';
import { LoggedInUser } from '../models/LoggedInUser';
import { Group } from '../models/Group';
import { Notification } from '../models/Notification';
import { Message } from '../models/Message';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  socketUrl: string = environment.socketUrl;
  apiUrl: string = environment.apiUrl
  socket: any;
  newReaction = new Subject();

  groups: Group[] = [];

  groupIds: string[] = [];

  allMessages: {
    _id: string,
    messages: Message[]
  }[] = [];
  allMessagesSubject = new BehaviorSubject(this.allMessages);
  allMessagesLoaded: boolean = false;

  lastMessages: {
    _id: string,
    message: Message
  }[] = [];

  notifications: string[] = [];
  loggedInUser!: LoggedInUser;
  token !: string;
  groupsLoaded: boolean = false;
  lastMesssagesLoaded: boolean = false;
  newComment = new BehaviorSubject({});
  newMessage = new BehaviorSubject({});
  lastMessagesSubject = new BehaviorSubject(this.lastMessages)
  groupSubject: BehaviorSubject<Group[]>;
  notificationSubject = new Subject<string[]>();
  notificationsLoaded: boolean = false;
  constructor(
    private router: Router
  ) {
    this.groupSubject = new BehaviorSubject<Group[]>([])
  }

  setupSocketConnection(user: LoggedInUser, token: string) {
    this.loggedInUser = user;
    this.token = token;

    this.socket = io(this.socketUrl);

    this.getAllgroups(this.loggedInUser.id).then(
      (res) => {

        this.groups = res.data.rooms;
        this.groupSubject.next(res.data.rooms)
        this.groupsLoaded = true;
        this.groups.forEach(
          async (group) => {
            this.getAllChats(group._id);
            this.joinRoom(group._id, this.loggedInUser.username);
            if (group.chats.length - 1 > -1) {
              let i = await this.getSingleChat(group.chats[group.chats.length - 1])
              this.lastMessages.push({
                _id: group._id,
                message: i.data.chat
              })
              this.lastMessagesSubject.next(this.lastMessages);
              this.lastMesssagesLoaded = true;
            }
          }
        );
        this.allMessagesLoaded = true;
        this.getNotifications()
      }
    )

    this.socket.on("newMessage", (data: any) => {
      this.allMessages.forEach(
        (group) => {
          if (data.roomId == group._id) {
            {
              group.messages.push(data);
              this.allMessagesSubject.next(this.allMessages)
            }
          }
        }
      )

      this.updateChat(data);
      this.getNotifications();
    })

    this.socket.on("newComment", (data: any) => {
      this.newComment.next(data);
      this.getNotifications();
    })
    this.socket.on("newLike", (data: any) => {
      this.newComment.next(data);
      this.getNotifications();
    })

    this.socket.on("newReaction", (data: any) => {
      this.newReaction.next(data)
    })
  }

  getAllgroups(userId: string) {
    return axios.get(`${this.apiUrl}/user/rooms`, {
      params: {
        userId: userId
      }
    })
  }

  getChat(roomId: string) {
    return axios.get(`${this.apiUrl}/room/chats`, {
      params: {
        roomId: roomId
      }
    })
  }

  joinRoom(roomId: string, username: string) {
    this.socket.emit('join', { roomId: roomId, username: username });
  }

  sendMessaage(message: string, roomId: string, type: string, username: string) {

    axios.post(`${this.apiUrl}/chat/add`, {
      roomId: roomId,
      username: username,
      message: message,
      type: type
    }).then((res) => {
      this.socket.emit('message',
        res.data.chat
      )
      this.updateChat(res.data.chat);
    });
  }

  sendImage(message: string, roomId: string, type: string, username: string, file: File) {
    if (message.length == 0)
      message = " "
    let form = new FormData();
    form.append('message', message);
    form.append('roomId', roomId);
    form.append('type', type);
    form.append('username', username);
    form.append('file', file);
    axios.post(`${this.apiUrl}/chat/add`, form).then(
      (res) => {
        this.socket.emit('message', res.data.chat);
        this.updateChat(res.data.chat);

      }
    );
  }

  likeMessage(id: string) {
    return axios.put(`${this.apiUrl}/chat/${id}/like`, {}, { headers: { "Authorization": `Bearer ${this.token}` } });
  }

  getSingleChat(id: string) {
    return axios.get(`${this.apiUrl}/chat/${id}`)
  }

  addComment(chatId: string, comment: string, roomId: string) {
    return axios.put(`${this.apiUrl}/chat/${chatId}/comment`, { comment: comment },
      { headers: { "Authorization": `Bearer ${this.token}` } }
    ).then(
      (res) => {
        this.socket.emit('comment', { comment: comment, chatId: chatId, username: this.loggedInUser.username, roomId: roomId }
        )
      }
    )
  }
  sendAudio(roomId: string, file: File) {
    let form = new FormData();
    form.append('message', " ");
    form.append('roomId', roomId);
    form.append('type', "audio");
    form.append('username', this.loggedInUser.username);
    form.append('file', file);
    axios.post(`${this.apiUrl}/chat/add`, form).then(
      (res) => {
        this.socket.emit('message', res.data.chat);
      }
    );
  }

  disconnect() {
    this.socket.disconnect();
  }

  updateChat(message: Message) {
    this.lastMessages.forEach(
      (last, i) => {
        if (last._id == message.roomId) {
          this.lastMessages[i].message = message;
          this.lastMessagesSubject.next(this.lastMessages);
        }
      }
    )
  }

  getGroupNameById(id: string) {
    let i = "";
    this.groups.forEach(
      (group) => {
        if (group._id == id)
          i = group.name;
      }
    )
    return i;
  }

  reportSpam(chatId: string, comment: string) {
    return axios.put(`${this.apiUrl}/chat/${chatId}/report`, { comment: comment }, { headers: { "Authorization": `Bearer ${this.token}` } })
  }

  getAllChats(roomId: string) {
    this.getChat(roomId).then(
      (res) => {
        this.allMessages.push({
          _id: roomId,
          messages: res.data.chats
        });
        this.allMessagesSubject.next(this.allMessages);
      }
    )
  }

  addRection(message: Message, reaction: string) {
    axios.put(`${this.apiUrl}/chat/${message._id}/reaction`, { reaction: reaction }, { headers: { "Authorization": `Bearer ${this.token}` } }).then(
      (res) => {

        this.socket.emit("reaction", { message: message, reaction: reaction });
      }
    );
  }

  getNotifications() {
    axios.get(`${this.apiUrl}/notification/all`, { headers: { "Authorization": `Bearer ${this.token}` } })
      .then(
        (res) => {
          this.notifications = res.data.notification.notifications
          this.notificationSubject.next(this.notifications);
          this.notificationsLoaded = true;
        }
      )
  }

  clearNotifications(){
  axios.post( `${this.apiUrl}/notification/clearAll`,{},  { headers: { "Authorization": `Bearer ${this.token}` } } ).then()
  }

}