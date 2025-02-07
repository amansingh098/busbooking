import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-chat-user',
  standalone: true,
  imports: [NgFor, NgClass, CommonModule, DatePipe],
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {
  messages: any[] = [];

  user = localStorage.getItem('userId');
  userId = this.user? +this.user : 0;
  @ViewChild('messageInput') messageInput!: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadMessages();
     setInterval(() => {       //Auto reload
      this.loadMessages();
    }, 10); // Reload every 1 second (adjust as needed)
  }

  loadMessages() {
    this.http.get<any[]>('https://localhost:7219/api/All/messages')
      .subscribe(data => {
        this.messages = data;
      });
  }

  sendMessage(message: string) {
    if (message.trim() === "") return; // Prevent sending empty messages

    const messageData = {
      id: 0,
      sender: 'User',
      message: message,
      timestamp: new Date().toISOString()
    };

    this.http.post('https://localhost:7219/api/All/send', messageData, { responseType: 'text' })
      .subscribe(() => {
        this.messages.push(messageData);
        this.messageInput.nativeElement.value = ''; // Clear input field
        this.loadMessages(); // Reload messages to reflect changes from other users/admins
      });
  }
}
