import { ViewContainerRef } from '@angular/core';
import { NotificationSettings } from '@progress/kendo-angular-notification';

export const createNotif = (
  style: 'none' | 'success' | 'warning' | 'info' | 'error',
  content: string | unknown,
  appendTo?: ViewContainerRef
): NotificationSettings => {
  // notifications are global with z-index > dialog
  // appendTo can be omitted for most cases
  let msg: string = '';
  if (typeof content !== 'string') {
    msg = 'An unknown application error has occurred';
  } else {
    msg = content;
  }
  return {
    content: msg,
    hideAfter: 3000,
    position: { horizontal: 'right', vertical: 'top' },
    animation: { type: 'fade', duration: 500 },
    type: { style, icon: true },
    appendTo,
  };
};
