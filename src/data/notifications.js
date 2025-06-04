// This file contains the notifications data and a function to retrieve it.
// The notifications are stored in an array of objects, each containing a message in multiple languages and URLs for those messages.
const notificationsList = [
  {
    message: {
      en: 'Check out the release notes for ScalarDB 3.15.3',
      ja: 'ScalarDB 3.15.3 のリリースノートをご覧ください'
    },
    url: {
      en: 'releases/release-notes#v3153?utm_source=docs-site&utm_medium=notifications',
      ja: 'releases/release-notes#v3153?utm_source=docs-site&utm_medium=notifications'
    },
    unread: true
  },
  {
    message: {
      en: 'Discover how to implement vector search capabilities with ScalarDB Cluster',
      ja: 'ScalarDB Cluster でベクトル検索機能を実装する方法を学ぶ'
    },
    url: {
      en: 'scalardb-cluster/getting-started-with-vector-search?utm_source=docs-site&utm_medium=notifications',
      ja: 'scalardb-cluster/getting-started-with-vector-search?utm_source=docs-site&utm_medium=notifications'
    },
    unread: true
  },
  {
    message: {
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
    message: {
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


// Helper function to generate a simple hash for notification content.
const generateContentHash = (notification) => {
  // Create a string representing the notification content.
  const contentString = JSON.stringify({
    message: notification.message,
    url: notification.url
  });

  // Generate a simple hash.
  let hash = 0;
  for (let i = 0; i < contentString.length; i++) {
    const char = contentString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer.
  }

  return hash.toString();
};

// Update the getNotifications function to handle both single URL and language-specific URLs, and prepend the correct base URL for relative paths.
export const getNotifications = (language = 'en') => {
  const totalNotifications = notificationsList.length;

  // Define base URLs for different languages.
  const baseUrls = {
    en: '/docs/latest/',
    ja: '/ja-jp/docs/latest/'
  };

  const currentDomain = 'scalardb.scalar-labs.com';

  // Get stored content hashes, if any.
  let storedHashes = {};
  let storedVersions = {};

  if (typeof window !== 'undefined') {
    try {
      const hashesJson = localStorage.getItem('notificationContentHashes');
      if (hashesJson) {
        storedHashes = JSON.parse(hashesJson);
      }

      const versionsJson = localStorage.getItem('notificationVersions');
      if (versionsJson) {
        storedVersions = JSON.parse(versionsJson);
      }
    } catch (e) {
      console.error('Error retrieving notification metadata:', e);
    }
  }

  // Calculate current hashes and check for changes.
  const currentHashes = {};
  const currentVersions = {};

  notificationsList.forEach((notification, index) => {
    const id = totalNotifications - index;
    const contentHash = generateContentHash(notification);
    currentHashes[id] = contentHash;

    // This if is for if a stored hash is stored for this notification ID.
    if (id in storedHashes) {
      // If the content has changed, increment the version.
      if (storedHashes[id] !== contentHash) {
        currentVersions[id] = (storedVersions[id] || 1) + 1;
      } else {
        // Otherwise, if the content hasn't changed, keep the same version.
        currentVersions[id] = storedVersions[id] || 1;
      }
    } else {
      // If this is the first tirst time seeing this notification, use the default version 1.
      currentVersions[id] = 1;
    }
  });
  
  // Store the current hashes and versions for future comparison.
  if (typeof window !== 'undefined') {
    localStorage.setItem('notificationContentHashes', JSON.stringify(currentHashes));
    localStorage.setItem('notificationVersions', JSON.stringify(currentVersions));
  }

  return notificationsList
    .map((notification, index) => {
      const id = totalNotifications - index;

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
        id: id,
        message: notification.message[language] || notification.message.en,
        url: url,
        isExternal: isExternal,
        unread: notification.unread,
        // Use the dynamically determined version.
        version: currentVersions[id] || 1
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
