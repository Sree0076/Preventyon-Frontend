import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface notifications{
  title: string,
  message: string,
  priority: string,
  timeAgo: string,
  isRead:boolean
}

@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.scss'
})

export class NotificationModalComponent {

  allNotifications: notifications[] = [
    { title: 'New Incident Reported', message: 'New incident reported by John Doe', priority:'High', timeAgo: '12 min ago', isRead: false },
    { title: 'New Assigned Incident', message: 'New incident reported by John Doe',priority:'Medium', timeAgo: '10 sec ago', isRead: false },
    { title: 'New Incident Reported', message: 'New incident reported by Jane Doe',priority:'Medium', timeAgo: '5 hours ago', isRead: true },
    { title: 'New Incident Reported', message: 'New incident reported by John Doe', priority:'Low', timeAgo: '12 min ago', isRead: false },
    { title: 'New Assigned Incident', message: 'New incident reported by John Doe',priority:'Medium', timeAgo: '10 sec ago', isRead: true },
    { title: 'New Incident Reported', message: 'New incident reported by Jane Doe',priority:'Medium', timeAgo: '5 hours ago', isRead: true },
  ];

  isClearingAll = false;


  get unreadNotifications() {
    return this.allNotifications.filter(notification => !notification.isRead);
  }

  get allNotificationsWithoutUnread() {
    return this.allNotifications.filter(notification => notification.isRead);
  }

  clearAllUnread() {
    this.isClearingAll = true;
  }

  onAnimationEnd(notification: notifications, index: number) {
    if (this.isClearingAll) {
      this.unreadNotifications.forEach(notification => notification.isRead = true);
      if (index === this.unreadNotifications.length - 1) {
        this.isClearingAll = false;
      }
    }
  }

  markAsRead(notification: notifications) {
    notification.isRead = true;
  }

}
