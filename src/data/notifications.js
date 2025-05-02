// This file contains the notifications data and a function to retrieve it.
// The notifications are stored in an array of objects, each containing a message in multiple languages and URLs for those messages.
const notificationsList = [
  {
    languages: {
      en: 'Discover how to implement vector search capabilities with ScalarDB Cluster',
      ja: 'ScalarDB Cluster でベクトル検索機能を実装する方法を学ぼう'
    },
    url: {
      en: 'scalardb-cluster/getting-started-with-vector-search?utm_source=docs-site&utm_medium=notifications',
      ja: 'scalardb-cluster/getting-started-with-vector-search?utm_source=docs-site&utm_medium=notifications'
    },
    unread: true
  },
  {
    languages: {
      en: 'Blog post: Explore the exciting new features in ScalarDB 3.15',
      ja: 'ブログ記事: データベースエンジニアリングの最新トレンドとベストプラクティスを学ぶ DBEM #6 のハイライト'
    },
    url: {
      en: 'https://medium.com/scalar-engineering/scalardb-3-15-has-been-released-b1982718fa46?utm_source=docs-site&utm_medium=notifications',
      ja: 'https://medium.com/scalar-engineering-ja/database-engineering-meetup-%E7%AC%AC6%E5%9B%9E-dbem-6-%E3%82%92%E9%96%8B%E5%82%AC%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F-fccde39d2926?utm_source=docs-site&utm_medium=notifications'
    },
    unread: true
  },
  {
    languages: {
      en: 'Support for ScalarDB 3.10 will end soon: Please consider upgrading for enhanced features and continued support',
      ja: 'ScalarDB 3.10 のサポートがまもなく終了します: 機能強化と継続的なサポートのため、アップグレードをご検討ください'
    },
    url: {
      en: 'scalar-kubernetes/HowToUpgradeScalarDB?utm_source=docs-site&utm_medium=notifications',
      ja: 'scalar-kubernetes/HowToUpgradeScalarDB?utm_source=docs-site&utm_medium=notifications'
    },
    unread: true
  }
];

// Update the getNotifications function to handle both single URL and language-specific URLs, and prepend the correct base URL for relative paths.
export const getNotifications = (language = 'en') => {
  const totalNotifications = notificationsList.length;

  // Define base URLs for different languages.
  const baseUrls = {
    en: '/docs/latest/',
    ja: '/ja-jp/docs/latest/'
  };
  
  const currentDomain = 'scalardb.scalar-labs.com';

  return notificationsList
    .map((notification, index) => {
      // Get the appropriate URL for the language.
      let url = typeof notification.url === 'object' 
        ? notification.url[language] || notification.url.en 
        : notification.url;

      // If the URL is relative (doesn't start with http), prepend the appropriate base URL.
      if (url && !url.startsWith('http')) {
        url = baseUrls[language] + url;
      }

      // Check if the link is external by checking the domain.
      const isExternal = url.startsWith('http') && !url.includes(currentDomain);

      return {
        id: totalNotifications - index,
        message: notification.languages[language] || notification.languages.en,
        url: url,
        isExternal: isExternal, // Add this flag for the component to use.
        unread: notification.unread
      };
    })
    .sort((a, b) => b.id - a.id);
};

// Utility function that detects the language from the URL path.
export const detectLanguage = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.includes('ja-jp') ? 'ja' : 'en';
  }
  return 'en'; // Default notifications to English if Japanese is not detected for some reason.
};
