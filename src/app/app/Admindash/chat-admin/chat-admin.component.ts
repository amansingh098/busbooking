import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-chat-admin',
  standalone: true,
  imports: [NgFor, NgClass, CommonModule, DatePipe],
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent implements OnInit {
  messages: any[] = [];
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
      sender: 'Admin',
      message: message,
      timestamp: new Date().toISOString()
    };

    this.http.post('https://localhost:7219/api/All/send', messageData, { responseType: 'text' })
      .subscribe(() => {
        this.messages.push(messageData);
        this.messageInput.nativeElement.value = ''; // Clear input field
        this.loadMessages(); // Reload messages
      });
  }
}
