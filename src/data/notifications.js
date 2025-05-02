// This file contains the notifications data and a function to retrieve it.
// The notifications are stored in an array of objects, each containing a message in multiple languages and URLs for those messages.
const notificationsList = [
  {
    languages: {
      en: '<NOTIFICATION>',
      ja: '<通知>'
    url: {
      en: '<URL>',
      ja: '<URL>'
    },
    unread: true
  },
  {
    languages: {
      en: '<NOTIFICATION>',
      ja: '<通知>'
    url: {
      en: '<URL>',
      ja: '<URL>'
    },
    unread: true
  },
  {
    languages: {
      en: '<NOTIFICATION>',
      ja: '<通知>'
    url: {
      en: '<URL>',
      ja: '<URL>'
    },
    unread: true
  }
];

// Update the getNotifications function to handle both single URL and language-specific URLs.
export const getNotifications = (language = 'en') => {
  const totalNotifications = notificationsList.length;
  return notificationsList
    .map((notification, index) => ({
      id: totalNotifications - index,
      message: notification.languages[language] || notification.languages.en,
      // If URL is an object with language keys, use the appropriate one.
      url: typeof notification.url === 'object' 
        ? notification.url[language] || notification.url.en 
        : notification.url,
      unread: notification.unread
    }))
    .sort((a, b) => b.id - a.id);
};

// Utility function that detects the language from the URL path.
export const detectLanguage = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.includes('ja-jp') ? 'ja' : 'en';
  }
  return 'en'; // Default notifications to English if Japanese is not detected for some reason.
};
